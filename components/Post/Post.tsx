import React, { useEffect, useRef, useState } from "react"
import Image, { StaticImageData } from "next/image"

import styles from "./Post.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setPost } from "@/state"
import api from "@/api"

type CmtModel = {
  username: string
  comment: string
}
type PostModel = {
  _id: string
  userId: string
  username: string
  profilePic: string
  caption: string
  image: string
  likes: Array<Object>
  comments: Array<CmtModel>
  createdAt: string
}

interface PostProps {
  post: PostModel
}

function Post({ post }: PostProps) {
  const { _id } = useSelector((state: any) => state.user) || "0"
  const token = useSelector((state: any) => state.token)
  const dispatch = useDispatch()

  const [cmtValue, setCmtValue] = useState<string>("")
  const input = useRef<HTMLInputElement>(null)
  const cmtButton = useRef<HTMLButtonElement>(null)
  const date = new Date(post.createdAt).toDateString()

  const changeHandler = () => {
    setCmtValue(input.current?.value!)
  }
  useEffect(() => {
    input.current?.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        // event.preventDefault()
        cmtButton.current?.click()
      }
    })
  })

  const likeBtn = async () => {
    const formURL = `${api}/post/${post._id}/like`

    const fd = new FormData()
    fd.append("userId", _id)

    axios
      .patch(formURL, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((upd) => {
        dispatch(setPost({ post: upd.data }))
      })
      .catch((err) => err)
  }

  const cmtBtn = async () => {
    const formURL = `${api}/post/${post._id}/cmt`

    const fd = new FormData()
    fd.append("userId", _id)
    fd.append("comment", cmtValue)

    axios
      .patch(formURL, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((upd) => dispatch(setPost({ post: upd.data })))
      .catch((err) => err)
    setCmtValue("")
  }

  return (
    <>
      <div className={styles.post}>
        <div className={styles.postHeader}>
          <Image
            className={styles.postAvatar}
            src={`https://firebasestorage.googleapis.com/v0/b/winged-ray-395216.appspot.com/o/${post.profilePic}?alt=media&token=c08a1c39-fc6f-47c5-bb71-3fbede5ba081`}
            alt="UserAva"
            width={30}
            height={30}
          />
          <Link href={`/user/${post.username}`}>
            <h3 className={styles.postUsername}>{post.username}</h3>
          </Link>
        </div>
        <div className={styles.postImage}>
          <Image
            className={styles.postImageCon}
            src={`https://firebasestorage.googleapis.com/v0/b/winged-ray-395216.appspot.com/o/${post.image}?alt=media&token=059f309e-8a80-4117-a427-4a32b4f67431`}
            alt="Post"
            width={470}
            height={200}
          />
        </div>
        <div className={styles.postActions}>
          <div className={styles.postLeftActions}>
            <button
              className={styles.postAction}
              onClick={likeBtn}
              style={
                Array.isArray(post.likes) && post.likes.includes(_id)
                  ? { color: "red" }
                  : {}
              }
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={styles.postActionIcon}
              />
            </button>
          </div>
          {useCountdown(post.createdAt)}
        </div>
        <p className={styles.postLikes}>
          {post.likes.length}{" "}
          {post.likes.length == 1 || post.likes.length == 0 ? "like" : "likes"}
        </p>
        <p className={styles.postCaption}>
          <strong>{post.username}</strong> {post.caption}
        </p>
        {post.comments.map((e, i) => {
          return (
            <p key={i} className={styles.postComment}>
              <strong>{e.username}</strong> {e.comment}
            </p>
          )
        })}
        <div className={styles.cmtSec}>
          <input
            type="text"
            placeholder="Comment something"
            ref={input}
            value={cmtValue}
            onChange={changeHandler}
          />
          <button
            className={styles.postAction}
            onClick={cmtBtn}
            disabled={cmtValue == "" ? true : false}
            ref={cmtButton}
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className={styles.postActionIcon}
            />
          </button>
        </div>
      </div>
    </>
  )
}

const useCountdown = (targetDate: string) => {
  const countDownDate = new Date(targetDate).getTime()

  const [countDown, setCountDown] = useState(
    new Date().getTime() - countDownDate
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(new Date().getTime() - countDownDate)
    }, 1000)

    return () => clearInterval(interval)
  }, [countDownDate])

  return getReturnValues(countDown)
}

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  )
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000)
  if (days > 0) return days + " ngày trước"
  if (hours > 0) return hours + " giờ trước"
  if (minutes > 0) return minutes + " phút trước"
  return "vài giây trước"
}

export default Post
