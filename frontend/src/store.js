import { configureStore } from '@reduxjs/toolkit'
import { areas, searchTags } from './store/consultSearch'
import { stepNum } from './store/Reservation'
import { loginToken } from './store/UserInfo'



export default configureStore({
  reducer: {
    areas : areas.reducer,
    searchTags : searchTags.reducer,
    stepNum : stepNum.reducer,
    loginToken : loginToken.reducer,
  }
}) 