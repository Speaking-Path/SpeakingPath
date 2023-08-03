import { createSlice } from "@reduxjs/toolkit";

export let pronCorrect = createSlice({
  name : "pronCorrect",
  initialState : false,
  reducers : {
      changeCorrect(state, isCorrect) {
      return isCorrect.payload
      }
}})

export let { changeCorrect } = pronCorrect.actions


export let pronWrong = createSlice({
  name : "pronWrong",
  initialState : false,
  reducers : {
    changeWrong(state, isWrong) {
      return isWrong.payload
    }
  }
})

export let { changeWrong } = pronWrong.actions