import { createSlice } from "@reduxjs/toolkit";

export let selectedCsltInfo = createSlice({
  name : "selectedCsltInfo",
  initialState : "",
  reducers : {
      changeCsltInfo(state, info) {
      return info.payload
      }
}})


export let { changeCsltInfo } = selectedCsltInfo.actions