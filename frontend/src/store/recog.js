import { createSlice } from "@reduxjs/toolkit"

export let recogList = createSlice({
  name : "recogList",
  initialState : {},
  reducers : {
    changeRecogList(state, list) {
      return list.payload
    }
  }
})

export let recogNum = createSlice({
  name : "recogNum",
  initialState : 0,
  reducers : {
    changeRecogNum(state, num) {
      return num.payload
    }
  }
})

export let qList = createSlice({
  name : "qList",
  initialState : 0,
  reducers : {
    changeRecogQlist(state, list) {
      return list.payload
    }
  }
})

export let recogNameNum = createSlice({
  name : "recogNameNum",
  initialState : 0,
  reducers : {
    changeRecogNameNum(state, num) {
      return num.payload
    }
  }
})

export let { changeRecogList } = recogList.actions
export let { changeRecogNum } = recogNum.actions
export let { changeRecogQlist } = qList.actions
export let { changeRecogNameNum } = recogNameNum.actions