import axios from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useSelector } from "react-redux"
import UserPost from "./userPosts"
import api from "@/api"

import styles from "./User.module.scss"

type UserModel = {
  _id: string
  username: string
  password: string
  followers: Array<Object>
  following: Array<Object>
  profilePic: string
  posts: Array<Object>
}
type PostModel = {
  _id: string
  userId: string
  username: string
  profilePic: string
  caption: string
  image: string
  likes: Array<Object>
  comments: Array<Object>
  createdAt: string
}

function User() {
  const router = useRouter()
  const [user, setUser] = useState<UserModel>()
  const userCur = useSelector((state: any) => state.user)
  const token = useSelector((state: any) => state.token)

  const getProfile = async () => {
    axios
      .get(`${api}/user/${router.query.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setUser(data.data.data.user)
      })
      .catch((err) => err)
  }
  const followBtnClick = async () => {
    if (!userCur) return
    const fd = new FormData()
    fd.append("kobiet", userCur.username)
    fd.append("target", user?.username!)

    axios
      .post(`${api}/user/follow`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        getProfile()
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getProfile()
  }, [token])
  if (!user) return null

  return (
    <>
      <Head>
        <title>{router.query.username}</title>
      </Head>

      <div className={styles.wrapper}>
        <Image
          src={`https://firebasestorage.googleapis.com/v0/b/winged-ray-395216.appspot.com/o/${user.profilePic}?alt=media&token=c08a1c39-fc6f-47c5-bb71-3fbede5ba081`}
          alt="ava"
          width={200}
          height={200}
        />
        <div className={styles.idk}>
          <div className={styles.info}>
            <h2>{user.username}</h2>
            <p>Followers : {user.followers.length}</p>
            <p>Following : {user.following.length}</p>
          </div>
          <div className={styles.action}>
            {userCur && !(user.username === userCur.username) ? (
              <button onClick={followBtnClick}>
                {user?.followers.includes(userCur._id) ? "Unfollow" : "Follow"}
              </button>
            ) : null}
            {userCur && !(user.username === userCur.username) ? (
              <button
                onClick={() => {
                  alert("Chua biet lam :))")
                }}
              >
                Message
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {user && <UserPost userId={user._id} />}
    </>
  )
}

export default User
