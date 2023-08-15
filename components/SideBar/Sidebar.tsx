import Image from "next/image"
import Link from "next/link"
import { useOnClickOutside, useToggle, useWindowSize } from "usehooks-ts"
import { useEffect, useRef, useState } from "react"

import Datten, { DatTenProps } from "./datten/Datten"
import SearchBox from "./SearchBox/SearchBox"
import BigLogo from "./datten/Instagram_Logo_2016.svg"
import MiniLogo from "./datten/instagram-seeklogo.com.svg"
import {
  faSearch,
  faHome,
  faMessage,
  faPlus,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons"
// import { IconProp } from "@fortawesome/fontawesome-svg-core"

import styles from "./Sidebar.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { setLogout } from "@/state"
import CreateBox from "./CreateBox/CreateBox"

function Sidebar() {
  const user = Boolean(useSelector((state: any) => state.token))
  const [activeSearch, toggleActiveSearch, setActiveSearch] = useToggle(false)
  const [activeCreate, toggleActiveCreate, setActiveCreate] = useToggle(false)
  const [activeOption, toggleActiveOption, setActiveOption] = useToggle()
  const { width } = useWindowSize()
  const [bigSidebar, setBigSidebar] = useState(!activeSearch && width > 1260)
  const sidebar = useRef(null)
  const optionsbox = useRef(null)
  const createBox = useRef(null)
  const userCur = useSelector((state: any) => state.user)

  const dispatch = useDispatch()

  const arr1: Array<DatTenProps> = [
    { icon: faHome, name: "Home", to: "/" },
    { icon: faSearch, name: "Search", button: handleSearchClick },
    { icon: faPlus, name: "Create", button: handleCreateClick },
    { icon: faMessage, name: "Messages", to: "/direct" },
    {
      icon: faUser,
      name: "Profile",
      to: userCur && `/user/${userCur.username}`,
    },
  ]

  function handleClickButton(): void {
    setActiveSearch(false)
  }
  function handleSearchClick(): void {
    toggleActiveSearch()
  }
  function handleCreateClick(): void {
    toggleActiveCreate()
  }
  function handleOptionsClick(): void {
    toggleActiveOption()
  }
  function handleResize(): void {
    setBigSidebar(!activeSearch && width > 1260)
  }
  function handleClickOutsideExpand(): void {
    setActiveSearch(false)
  }
  function handleClickOutsideCreateBox(): void {
    setActiveCreate(false)
  }
  function handleClickOutsideOptionBox(): void {
    setActiveOption(false)
  }
  function logOut(): void {
    dispatch(setLogout())
  }

  useEffect(() => {
    handleResize()
  }, [width, activeSearch])

  useOnClickOutside(sidebar, handleClickOutsideExpand)
  useOnClickOutside(optionsbox, handleClickOutsideOptionBox)
  useOnClickOutside(createBox, handleClickOutsideCreateBox)
  if (!user) {
    return <></>
  }

  return (
    <>
      <div ref={sidebar} className={styles.hello}>
        {/* Main Sidebar */}
        <div
          className={styles.wrapper.concat(
            " ",
            bigSidebar ? styles.bigSidebar : styles.smallSidebar
          )}
        >
          <div className={styles.logoWrapper}>
            <Link href="/" className={styles.logoLink}>
              {bigSidebar ? (
                <Image
                  src={BigLogo}
                  alt="instagram logo"
                  className={styles.image}
                  priority
                />
              ) : (
                <Image
                  src={MiniLogo}
                  alt="instagram logo"
                  className={styles.image}
                />
              )}
            </Link>
          </div>
          <div className={styles.pages}>
            {arr1.map((e, index) => {
              return (
                <Datten
                  icon={e.icon}
                  name={e.name}
                  bigSize={bigSidebar}
                  to={e.to}
                  key={index}
                  button={e.button || handleClickButton}
                />
              )
            })}
          </div>
          <div className={styles.options} ref={optionsbox}>
            <Datten
              icon={faBars}
              name="More"
              bigSize={bigSidebar}
              button={handleOptionsClick}
            />
            {activeOption ? (
              <div className={styles.optionsBox}>
                <button onClick={logOut}>Log Out</button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* SearchBox */}
        <div
          className={styles.expand}
          style={activeSearch ? { left: "80px" } : {}}
        >
          <SearchBox />
        </div>
        <div
          className={styles.createPage}
          style={activeCreate ? { display: "block" } : {}}
        >
          <div className={styles.createBox} ref={createBox}>
            <CreateBox />
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
