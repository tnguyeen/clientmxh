import Sidebar from "../SideBar/Sidebar"
import { ReactNode } from "react"
import styles from "./Layout.module.scss"
import Login from "@/pages/login"
import Signup from "@/pages/signup"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

interface Props {
  children?: ReactNode
  // any props that come into the component
}

function Layout({ children }: Props) {
  const user = Boolean(useSelector((state: any) => state.token))
  const router = useRouter()

  if (router.pathname === "/signup") {
    return (
      <>
        <Signup />
      </>
    )
  }

  if (!user) {
    return (
      <>
        <Login />
      </>
    )
  }
  return (
    <>
      <div className={styles.wrapper}>
        <Sidebar />
        <div className={styles.children}>{children}</div>
      </div>
    </>
  )
}

export default Layout
