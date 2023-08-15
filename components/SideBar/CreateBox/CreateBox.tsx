import { useSelector } from "react-redux"
import styles from "./CreateBox.module.scss"
import { ChangeEvent, useRef, useState } from "react"
import axios from "axios"
import api from "@/api"
import Router from "next/router"

function CreateBox() {
  const [postPhoto, setPostPhoto] = useState<any>()
  const inputPic = useRef<HTMLInputElement>(null)
  const submitBtn = useRef<HTMLButtonElement>(null)
  const inputCaption = useRef<HTMLInputElement>(null)
  const [inputCaptionValue, setInputCaptionValue] = useState<string>("")

  const { _id } = useSelector((state: any) => state.user)
  const token = useSelector((state: any) => state.token)

  const changePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPostPhoto(inputPic.current?.files![0])
  }
  const changeCaptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputCaptionValue(inputCaption.current?.value!)
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formURL = `${api}/post/create`

    const fd = new FormData()
    fd.append("userId", _id)
    fd.append("caption", inputCaptionValue)
    fd.append("postPhoto", postPhoto)

    axios
      .post(formURL, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => window.alert("dang bai thanh cong, yeah"))
      .catch((err) => window.alert("dang bai that bai, oh no"))
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p>Create new post</p>
          {/* <button>Share</button> */}
          {postPhoto && inputCaptionValue && (
            <button
              onClick={() => {
                submitBtn.current?.click()
                Router.push("/")
              }}
            >
              Share
            </button>
          )}
        </div>
        <div className={styles.body}>
          <div>
            {!postPhoto && <p>Pick photo here</p>}
            <form
              onSubmit={submitForm}
              encType="multipart/form-data"
              method="POST"
            >
              <input
                type="file"
                accept="image/*"
                ref={inputPic}
                style={{ display: "none" }}
                onChange={changePhotoHandler}
                name="postPhoto"
              />
              <button style={{ display: "none" }} ref={submitBtn}>
                Submit
              </button>
            </form>
            <button
              onClick={() => {
                inputPic.current?.click()
              }}
            >
              Select from computer
            </button>
          </div>

          <div className={styles.writeSt}>
            {postPhoto && <p>Write something</p>}
            {postPhoto && (
              <input
                type="text"
                className={styles.caption}
                ref={inputCaption}
                onChange={changeCaptionHandler}
                value={inputCaptionValue}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateBox
