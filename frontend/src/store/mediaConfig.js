// 카메라 장치 정보 저장 (카메라, 마이크, 스피커)

import { createSlice } from "@reduxjs/toolkit";

const mediaConfigSlice = createSlice({
    name: 'mediaConfig',
    initialState: {
        camera: undefined,
        microphone: undefined,
        speaker: undefined,
    },
    reducers: {
        setCamera(state, action) {
            return {
                ...state,
                camera: action.payload,
            }
        },
        setMicrophone(state, action) {
            return {
                ...state,
                microphone: action.payload,
            }
        },
        setSpeaker(state, action) {
            return {
                ...state,
                speaker: action.payload,
            }
        },
    }
})
export const { setCamera, setMicrophone, setSpeaker } = mediaConfigSlice.actions
export const selectMediaConfig = (state) => state.mediaConfig
export default mediaConfigSlice.reducer