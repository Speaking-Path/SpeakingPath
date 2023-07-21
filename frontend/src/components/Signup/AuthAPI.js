// 로그인, 회원가입 요청


import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType")
let ACCESS_TOKEN = localStorage.getItem("accessToken")


export const AuthApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    },
})

export const signUp = async ({email, phoneNumber, id, password}) => {
  const data = {
    "userEmail" : email,
    "userPhone" : phoneNumber,
    "userId" : id,
    "userPwd" : password,
  }
  console.log(data)
  const response = await AuthApi.post(`account/signup`, data)
  return response.data
}

export const consultSignUp = async ({
  email, id, phoneNumber, password, team, exp, tag, boundry }) => {
  const data = {
    "userEmail" : email,
    "userPhone" : phoneNumber,
    "userId" : id,
    "userPwd" : password,
    "cnslrTeam" : team,
    "cnslrExp" : exp, 
    "cnslrTag" : tag,
    "cnslrBoundry" : boundry }
  const response = await AuthApi.post(`account/signup`, data)
  return response.data
}


export const login = async ({ id, password }) => {
  const data = {
    "userId" : id,
    "userPwd" : password,
  }
  const response = await AuthApi.post(`accounts/login`, data)
  return response.data
}