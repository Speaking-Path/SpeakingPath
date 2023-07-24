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



export const clickSignup = async function (e, data) {
  e.preventDefault()
  const userInfo = {
    "userName" : data.userName,
    "userEmail" : data.email,
    "userPhone" : data.phoneNumber,
    "userId" : data.id,
    "userPwd" : data.password,
  }
  try {
    const response = await AuthApi.post(`account/signup`, userInfo)
    return response.data
  } catch(err) {
    alert('정보를 다시 한번 확인해주세요')
    console.log(err)
    return err.message
  }
}



export const clickConsultantSignup = async function (e, data) {
  console.log(data)
  const userInfo = {
    "userName" : data.userName,
    "userEmail" : data.email,
    "userPhone" : data.phoneNumber,
    "userId" : data.id,
    "userPwd" : data.password,
    "cnslrTeam" : data.team,
    "cnslrExp" : data.exp, 
    "cnslrTag" : data.tag,
    "cnslrBoundry" : data.boundry,
    "userGrade" : "상담사",
  }
  try {
    const response = await AuthApi.post(`account/signup`, userInfo)
    return response.data
  } catch(err) {
    alert('정보를 다시 한번 확인해주세요')
    console.log(err)
    return err.message
  }
}


export const login = async ({ id, password }) => {
  const data = {
    "userId" : id,
    "userPwd" : password,
  }
  const response = await AuthApi.post(`accounts/login`, data)
  return response.data
}



export const checkEmailApi = function (e, email, setEmailMessage, setIsEmail) {
  e.preventDefault()
  axios
  .get("http://localhost:8080/account/checkemail",
  {params : { "userEmail" : email}})
  .then((res)=>{
    if (res.data === "success") {
      setEmailMessage("사용 가능한 이메일입니다.")
      setIsEmail(true)
    } else {
      setEmailMessage("이미 존재하는 이메일입니다.")
      setIsEmail(false)
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}

export const checkIdApi = function (e, id, setIdMessage, setIsId) {
  e.preventDefault()
  axios.get("http://localhost:8080/account/checkid",
  {params : {"userId" : id}})
  .then((res)=>{
    if (res.data === "success") {
      setIdMessage("사용 가능한 아이디입니다.")
      setIsId(true)
    } else {
      setIdMessage("이미 존재하는 아이디입니다.")
      setIsId(false)
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}