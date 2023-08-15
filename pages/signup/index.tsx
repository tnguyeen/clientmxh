import styles from "./Signup.module.scss"
import { FormEventHandler, useRef, useState } from "react"
import axios from "axios"
import Link from "next/link"
import Head from "next/head"
import api from '@/api'

export default function Login() {
  const [usernameValue, setUsernameValue] = useState<string>("")
  const [passwordValue, setPasswordValue] = useState<string>("")
  const [profilePic, setProfilePic] = useState<any>()
  const inputUsername = useRef<HTMLInputElement>(null)
  const inputPassword = useRef<HTMLInputElement>(null)
  const inputPic = useRef<HTMLInputElement>(null)

  const changeHandler = () => {
    setUsernameValue(inputUsername.current?.value!)
    setPasswordValue(inputPassword.current?.value!)
    setProfilePic(inputPic.current?.files![0])
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formURL = `${api}/auth/register`

    const fd = new FormData()
    fd.append("username", usernameValue)
    fd.append("password", passwordValue)
    fd.append("profilepic", profilePic)

    axios
      .post(formURL, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => window.alert("dang ki thanh cong, yeah"))
      .catch((err) => window.alert("dang ki that bai, oh no"))
  }

  return (
    <>
    <Head>
          <title>Sign Up</title>
        </Head>
      <div className={styles.wrapper}>
        <h1>Sign Up</h1>
        <form onSubmit={submitForm} encType="multipart/form-data" method="POST">
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              ref={inputUsername}
              onChange={changeHandler}
              value={usernameValue}
              className={styles.inputgiday}
              required
              minLength={4}
              maxLength={20}
              pattern="[A-Za-z0-9]+"
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              ref={inputPassword}
              onChange={changeHandler}
              value={passwordValue}
              className={styles.inputgiday}
              required
              minLength={4}
              maxLength={10}
              pattern="[A-Za-z0-9]+"
            />
          </div>
          <div>
            <label>Profile Picture</label>
            <br />
            <span>
              Chọn đc 1 lần thôi, chọn r là k đổi đc (Nhưng mà phải chọn)
            </span>
            <br></br>
            <span>
            Cắt thành hình vuông nựa thì đẹp. T lười.
            </span>
            <br />
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={inputPic}
              onChange={changeHandler}
              name="profilepic"
              style={{ display: "none" }}
            />
          </div>

          <button className={styles.signupBtn}>Sign Up</button>
        </form>
        <button
          onClick={() => {
            inputPic.current?.click()
          }}
          className={styles.uploadBtn}
        >
          Upload
        </button>

        <Link href="/" >Log in</Link>
      </div>
    </>
  )
}
