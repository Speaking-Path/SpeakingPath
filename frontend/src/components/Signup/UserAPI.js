// 토큰 이용해서 정보 보내고 받아오는 페이지(토큰갱신포함)


import axios from "axios"

const TOKEN_TYPE = localStorage.getItem("tokenType")
let ACCESS_TOKEN = localStorage.getItem("accessToken")
let REFRESH_TOKEN = localStorage.getItem("refreshToken")

export const UserApi = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
      "Content-Type": "application/json",
      "Authorization": `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
      "REFRESH_TOKEN": REFRESH_TOKEN,
  },
})

// 토큰갱신
const refreshAccessToken = async () => {
  const response = await UserApi.get(`/api/v1/auth/refresh`)
  ACCESS_TOKEN = response.data
  localStorage.setItem("accessToken", ACCESS_TOKEN)
  UserApi.defaults.headers.common["Authorization"] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`
}

// 토큰 유효성 검사
UserApi.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config
  if (error.response.status === 403 && !originalRequest._retry) {
      await refreshAccessToken()
      return UserApi(originalRequest)
  }
  return Promise.reject(error)
})


// 이 아래부터 주소정보 수정해야함!!!!
// 회원조회
export const fetchUser = async () => {
  const response = await UserApi.get(`/account`)
  return response.data;
}

// 회원수정 API
export const updateUser = async (data) => {
  const response = await UserApi.put(`/account/change`, data)
  return response.data;
}

// 회원탈퇴 API
export const deleteUser = async () => {
  await UserApi.delete(`/account/withdraw`)
}