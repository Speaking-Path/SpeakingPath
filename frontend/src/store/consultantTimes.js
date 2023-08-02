import { createSlice } from "@reduxjs/toolkit";

export let csltTimes = createSlice({
  name : "csltTimes",
  initialState : "",
  reducers : {
      changeCsltTimes(state, times) {
      return times.payload
      }
}})


export let { changeCsltTimes } = csltTimes.actions