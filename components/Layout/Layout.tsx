import Sidebar from "../SideBar/Sidebar"
import { ReactNode } from "react"
import styles from "./Layout.module.scss"

interface Props {
  children?: ReactNode
  // any props that come into the component
}

function Layout({ children }: Props) {
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
