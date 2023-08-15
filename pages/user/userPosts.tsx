import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Post from "@/components/Post/Post"
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

interface PostsProps {
  userId: string
}

function UserPost({ userId }: PostsProps) {
  const [userPosts, setUserPosts] = useState<Array<PostModel>>()
  const token = useSelector((state: any) => state.token)

  const getProfile = async () => {
    axios
      .get(`${api}/post/${userId}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setUserPosts(data.data)
      })
      .catch((err) => err)
  }

  useEffect(() => {
    getProfile()
  }, [token])

  return (
    <>
      <div>
        {Array.isArray(userPosts)
          ? userPosts.map((element: any, index: any) => {
              return (
                <div key={index}>
                  <Post post={element} />
                </div>
              )
            })
          : null}
      </div>
    </>
  )
}

export default UserPost
