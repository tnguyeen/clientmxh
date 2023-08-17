import { useSelector } from "react-redux"
import styles from "./Friend.module.scss"
import Image from "next/image"

type UserModel = {
  _id: string
  username: string
  profilePic: string
}
interface FriendProps {
  friend: UserModel
  setRoom: Function
}
export default function Friend({ friend, setRoom }: FriendProps) {
  const userCur = useSelector((state: any) => state.user)

  const getRoom = async () => {
    if (!userCur) return
    var room = ""
    if (userCur._id <= friend._id) {
      room = userCur._id + " " + friend._id
    } else {
      room = friend._id + " " + userCur._id
    }
    setRoom(room, friend.username)
  }
  return (
    <>
      <div
        className={styles.friend}
        onClick={() => {
          getRoom()
        }}
      >
        <Image
          className={styles.friendAva}
          src={`https://firebasestorage.googleapis.com/v0/b/winged-ray-395216.appspot.com/o/${friend.profilePic}?alt=media&token=059f309e-8a80-4117-a427-4a32b4f67431`}
          alt="Friend Ava"
          width={60}
          height={60}
        />
        <p>{friend.username}</p>
      </div>
    </>
  )
}
