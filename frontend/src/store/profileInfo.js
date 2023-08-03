import { createSlice } from "@reduxjs/toolkit"

export let profileInfo = createSlice({
  name : "profileInfo",
  initialState : [],
  reducers : {
    changeProfileInfo(state, info) {
      return info.payload
    }
  }
})

export let { changeProfileInfo } = profileInfo.actions