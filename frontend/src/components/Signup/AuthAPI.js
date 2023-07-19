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

export const signUp = async ({email, id, password, passwordConfirm}) => {
  const data = { email, id, password, passwordConfirm }
  const response = await AuthApi.post(`account/signup`, data)
  return response.data
}

export const consultSignUp = async ({
  email, id, password, passwordConfirm, team, exp, tag, boundry }) => {
  const data = { email, id, password, passwordConfirm, team, exp, tag, boundry }
  const response = await AuthApi.post(`account/signup`, data)
  return response.data
}