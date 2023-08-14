import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faMagnifyingGlass,
  faXmark,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons"
import styles from "./SearchBox.module.scss"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import Link from "next/link"
import api from "@/api"

enum inputStatus {
  focus = "FOCUS",
  blur = "BLUR",
}
type User = {
  username: string
  password: string
  followers: Array<Object>
  following: {
    type: Array<Object>
    required: true
  }
  profilePic: {
    type: String
  }
  posts: {
    type: Array<Object>
    required: true
  }
}

const haha: Array<User> = []
;(async () => {
  axios
    .get(`${api}/user`)
    .then((json) => json.data.data.users)
    .then((res) => res.forEach((e: User) => haha.push(e)))
})()

function SearchBox() {
  const input = useRef<HTMLInputElement>(null)
  const [inputFocus, setInputFocus] = useState(inputStatus.focus)
  const [inputValue, setInputValue] = useState<string>("")
  const [names, setNames] = useState<Array<User>>([])

  const focusHandler = () => {
    setInputFocus(inputStatus.focus)
  }
  const blurHandler = () => {
    setInputFocus(inputStatus.blur)
  }
  const changeHandler = () => {
    // setInputFocus(inputStatus.loading);
    setInputValue(input.current?.value!)
    setTimeout(() => {
      setInputFocus(inputStatus.focus)
    }, 1000)
  }

  useEffect(() => {
    setNames([])
    haha.forEach((e) => {
      if (e.username.includes(inputValue)) {
        setNames((prev) => [...prev, e])
      }
    })
  }, [inputValue])

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.header}>Search</div>
        <div className={styles.body}>
          <div className={styles.search}>
            <input
              className={styles.searchInput}
              placeholder="Search...."
              ref={input}
              onFocus={focusHandler}
              onBlur={blurHandler}
              value={inputValue}
              style={inputFocus === "BLUR" ? { paddingLeft: "50px" } : {}}
              onChange={changeHandler}
            />
            {inputFocus === "BLUR" && (
              <div
                className={styles.icon}
                onClick={() => {
                  input.current?.focus()
                }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            )}

            <div className={styles.icons}>
              {inputFocus === "FOCUS" && (
                <FontAwesomeIcon
                  icon={faXmark}
                  onMouseDown={() => {
                    setInputValue("")
                  }}
                />
              )}
            </div>
          </div>
          <div className={styles.results}>
            {names.map((name, index) => (
              <Link
                key={index}
                href={`http://localhost:3000/user/${name.username}`}
              >
                <div className={styles.result}>
                  <p>{name.username.toString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBox
