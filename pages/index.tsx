import Head from "next/head"
import Post from "../components/Post/Post"
import { useDispatch, useSelector } from "react-redux"
import Login from "./login"
import { useEffect } from "react"
import axios from "axios"
import { setPosts } from "@/state"
import api from "@/api"

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

export default function Home() {
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()
  const posts = useSelector((state: any) => state.posts)
  const token = useSelector((state: any) => state.token)

  const getPost = async () => {
    axios
      .get(`${api}/post`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        const sortPosts = data.data.sort(function (a: PostModel, b: PostModel) {
          return Date.parse(b.createdAt) - Date.parse(a.createdAt)
        })
        dispatch(setPosts({ posts: sortPosts }))
      })
      .catch((err) => err)
  }

  useEffect(() => {
    getPost()
  }, [user])

  if (!user) {
    return <Login />
  }
  return (
    posts && (
      <>
        <Head>
          <title>Mxh</title>
        </Head>
        {Array.isArray(posts)
          ? posts.map((element: any, index: any) => {
              return (
                <div key={index}>
                  <Post post={element} />
                </div>
              )
            })
          : null}
      </>
    )
  )
}
