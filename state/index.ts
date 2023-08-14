import { createSlice } from "@reduxjs/toolkit"

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
type UserModel = {
  _id: string
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

type StateModel = {
  user: UserModel | null
  token: string | null
  posts: Array<PostModel>
}

const initialState: StateModel = {
  user: null,
  token: null,
  posts: [],
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post: PostModel) => {
        if (post._id === action.payload.post._id) return action.payload.post
        return post
      })
      state.posts = updatedPosts
    },
  },
})

export const { setLogin, setLogout, setPosts, setPost } = authSlice.actions
export default authSlice.reducer
