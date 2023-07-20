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


export const signUp = async ({userName, email, phoneNumber, id, password}) => {
  const data = {
    "userName" : userName,
    "userEmail" : email,
    "userPhone" : phoneNumber,
    "userId" : id,
    "userPwd" : password,
  }
  const response = await AuthApi.post(`account/signup`, data)
  return response.data
}

export const consultSignUp = async ({
  userName, email, id, phoneNumber, password, team, exp, tag, boundry }) => {
  const data = {
    "userName" : userName,
    "userEmail" : email,
    "userPhone" : phoneNumber,
    "userId" : id,
    "userPwd" : password,
    "cnslrTeam" : team,
    "cnslrExp" : exp, 
    "cnslrTag" : tag,
    "cnslrBoundry" : boundry,
    "userGrade" : "상담사",
  }
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

export const checkEmailApi = function(email) {
  axios
  .get("http://localhost:8080/account/checkemail",
  {params : { "userEmail" : email}})
  .then((res)=>{
    alert(res.data)
  })
  .catch((err)=>{
  })
}

export const checkIdApi = function(id) {
  axios.get("http://localhost:8080/account/checkid",
  {params : {"userId" : id}})
  .then((res)=>{
    console.log(res)
  })
}