import { createSlice } from "@reduxjs/toolkit";

export let loginToken = createSlice({
  name : "loginToken",
  initialState : "",
  reducers : {
      changeLoginInfo(state, info) {
      return info.payload
      }
}})

export let loginId = createSlice({
  name : "loginToken",
  initialState : "",
  reducers : {
    changeLoginId(state, id) {
      return id.payload
    }
  }
})

export let { changeLoginInfo } = loginToken.actions
export let { changeLoginId } = loginId.actions