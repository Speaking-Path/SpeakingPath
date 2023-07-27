import { createSlice } from "@reduxjs/toolkit";

export let loginToken = createSlice({
  name : "loginToken",
  initialState : "",
  reducers : {
      changeLoginInfo(state, info) {
      return info.payload
      }
}})

export let { changeLoginInfo } = loginToken.actions