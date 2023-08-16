import Head from "next/head"
import Login from "../login"
import { useSelector } from "react-redux"

export default function Direct() {
  const user = Boolean(useSelector((state: any) => state.token))

  if (!user) {
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
      <div>Chua lam duoc.</div>
    </>
  )
}
