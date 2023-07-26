import { createSlice } from "@reduxjs/toolkit";

export let areas = createSlice({
  name : "areas",
  initialState : ['언어발달장애', '말소리장애', '신경언어장애', '유창성장애', '음성장애']
})


export let searchTags = createSlice({
  name : "searchTags",
  initialState : ['엄격한', '친근한', '친절한', '정적인', '발랄한', '활동적인']
})
