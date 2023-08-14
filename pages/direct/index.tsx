import Head from "next/head"

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

export default function Direct() {

  return (
    <>
      <Head>
        <title>Message</title>
      </Head>
    </>
  )
}
