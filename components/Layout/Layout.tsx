import Sidebar from "../SideBar/Sidebar"
import { ReactNode } from "react"
import styles from "./Layout.module.scss"
import Login from "@/pages/login"
import { useSelector } from "react-redux"

interface Props {
  children?: ReactNode
  // any props that come into the component
}

function Layout({ children }: Props) {
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
      <div className={styles.wrapper}>
        <Sidebar />
        <div className={styles.children}>{children}</div>
      </div>
    </>
  )
}

export default Layout
