import Head from "next/head"
import Login from "../login"
import { useSelector } from "react-redux"
import styles from "./direct.module.scss"
import Image from "next/image"
import io from "socket.io-client"
import api from "@/api"
import { useEffect, useRef, useState } from "react"
import Friend from "./Cpns/Friend"
import axios from "axios"
import Chat from "./Cpns/Chat"

type messModel = {
  room: string
  author: string
  message: string
  time: string
}
type UserModel = {
  _id: string
  username: string
  profilePic: string
}

const socket = io(api)

export default function Direct() {
  const userCur = useSelector((state: any) => state.user)
  const [room, setRoom] = useState<Array<string>>([])
  const [users, setUsers] = useState<Array<UserModel>>([])

  const joinRoom = async (room: string, chat: string) => {
    await socket.emit("join", room)
    setRoom([room, chat])
  }

  const getUsers = async () => {
    axios
      .get(`${api}/user`)
      .then((data) => {
        setUsers(data.data.data.users)
      })
      .catch((err) => err)
  }

  useEffect(() => {
    getUsers()
  }, [socket])

  if (!userCur) {
    return (
      <>
        <Login />
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Message</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.friendList}>
          <div className={styles.header}>
            <span>{userCur.username}</span>
          </div>
          <div className={styles.body}>
            {users &&
              users.map((e, i) => (
                <Friend
                  key={i}
                  friend={e}
                  setRoom={(room: string, chat: string) => joinRoom(room, chat)}
                />
              ))}
          </div>
        </div>
        <div className={styles.chatBox}>
          <div className={styles.header}>
            <span>{room && room[1]}</span>
          </div>
          <Chat room={room && room} socket={socket} />
        </div>
      </div>
    </>
  )
}
