import { createSlice } from "@reduxjs/toolkit";

export let stepNum = createSlice({
  name : "stepNum",
  initialState : 0,
  reducers : {
      changeNum(state, num) {
      return num.payload
      }
}})

export let { changeNum } = stepNum.actions