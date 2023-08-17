import { createSlice } from "@reduxjs/toolkit";

export let csltList = createSlice({
  name : "csltList",
  initialState : [],
  reducers : {
      changeCsltList(state, info) {
      return info.payload
      }
}})


export let { changeCsltList } = csltList.actions