import { useSelector } from "react-redux"
import styles from "./Chat.module.scss"
import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io-client"
import axios from "axios"
import api from "@/api"

type messModel = {
  room: string
  senderId: string
  message: string
}
interface ChatProps {
  room: Array<string>
  socket: Socket
}
export default function Chat({ room, socket }: ChatProps) {
  const userCur = useSelector((state: any) => state.user)
  const token = useSelector((state: any) => state.token)

  const [messageList, setMessageList] = useState<Array<messModel>>([])
  const [mess, setMess] = useState("")

  const input = useRef<HTMLInputElement>(null)
  const sendButton = useRef<HTMLButtonElement>(null)
  const scroll = useRef<HTMLDivElement>(null)

  const sendMessage = async () => {
    const messageData: messModel = {
      room: room[0],
      senderId: userCur._id,
      message: mess,
    }

    axios
      .post(`${api}/chat/send`, messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        socket.emit("send_message", messageData)
      })
      .catch((err) => console.log(err))
    setMessageList((list: Array<messModel>) => [...list, messageData])
    setMess("")
  }

  const getChat = async () => {
    axios
      .get(`${api}/chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        params: {
          room: room[0],
        },
      })
      .then((data) => {
        setMessageList(data.data.data.chat)
      })
      .catch((err) => err)
  }

  useEffect(() => {
    getChat()
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data])
    })
    input.current?.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        sendButton.current?.click()
      }
    })
    return () => {
      socket.off("receive_message")
    }
  }, [room])
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [messageList])

  return (
    <>
      <div className={styles.body}>
        <div className={styles.messages}>
          {messageList &&
            messageList.map((e, i) => {
              return (
                e.message && (
                  <div
                    className={styles.message}
                    style={
                      e.senderId === userCur._id
                        ? { justifyContent: "end" }
                        : {}
                    }
                  >
                    <span
                      style={
                        e.senderId === userCur._id
                          ? {
                              color: "white",
                              backgroundColor: "rgb(55, 151, 240)",
                            }
                          : {}
                      }
                      key={i}
                    >
                      {e.message}
                    </span>
                  </div>
                )
              )
            })}
          <div ref={scroll}></div>
        </div>
        <div className={styles.sendSec}>
          <input
            type="text"
            className={styles.inputMess}
            placeholder="Message..."
            value={mess}
            onChange={(e) => {
              setMess(e.target.value)
            }}
            ref={input}
          />
          <button
            className={styles.sendBtn}
            onClick={sendMessage}
            ref={sendButton}
          >
            Send
          </button>
        </div>
      </div>
    </>
  )
}
