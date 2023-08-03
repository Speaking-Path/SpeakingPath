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

export let profileClick = createSlice({
  name : "profileClick",
  initialState : 0,
  reducers : {
    changeProfileClick(state, click) {
      return click.payload
    }
  }
})

export let { changeProfileInfo } = profileInfo.actions
export let { changeProfileClick } = profileClick.actions