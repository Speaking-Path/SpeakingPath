// 로그인, 회원가입 요청



import axios from "axios";

// const TOKEN_TYPE = localStorage.getItem("tokenType")
// let ACCESS_TOKEN = localStorage.getItem("accessToken")


export const AuthApi = axios.create({
    baseURL: '/',
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
    // },
})



export const clickSignup = async function (e, data) {
  e.preventDefault()
  const userInfo = {
    "userName" : data.userName,
    "userEmail" : data.email,
    "userPhone" : data.phoneNumber,
    "userId" : data.id,
    "userPwd" : data.password,
    "userGrade" : "USER",
  }
  try {
    const response = await AuthApi.post(`account/signup`, userInfo)
    return response
  } catch(err) {
    alert('정보를 다시 한번 확인해주세요')
    console.log(err)
    return err.message
  }
}



export const clickConsultantSignup = async function (e, data) {
  const userInfo = {
    "userName" : data.userName,
    "userEmail" : data.email,
    "userPhone" : data.phoneNumber,
    "userId" : data.id,
    "userPwd" : data.password,
    "csltTeam" : data.team,
    "csltExp" : data.exp, 
    "csltTag" : data.tag,
    "csltBoundary" : data.boundry,
    "userSex" : data.sex,
    "userGrade" : "CONSULTANT",
  }
  console.log(userInfo)
  console.log(data)
  try {
    const response = await AuthApi.post(`account/consultantsignup`, userInfo)
    return response.data
  } catch(err) {
    alert('정보를 다시 한번 확인해주세요')
    console.log(err)
    return err.message
  }
}


export const login = async (data) => {
  const userInfo = {
    "userId" : data.id,
    "userPwd" : data.password,
  };
  
  try {
    const response = await AuthApi.post(`account/login`, userInfo);
    return response.data;
  } catch (error) {
    return 0;
  }
};



export const checkEmailApi = function (e, email, setEmailMessage, setIsEmail) {
  e.preventDefault()
  axios
  .get("/account/checkemail",
  {params : { "userEmail" : email}})
  .then((res)=>{
    if (res.data === "success") {
      setEmailMessage("사용 가능한 이메일입니다.")
      setIsEmail(true)
      
      const userInfo={
        "userEmail" : email
      }
      axios.post(`/account/auth/sendEmail`, userInfo).then((res)=>{
        console.log(res)
        if(res.data === "success"){
          setEmailMessage("이메일 인증번호를 확인해주세요.")    
        }
      })
      
      
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
  axios.get("/account/checkid",
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

export const checkEmailAuth = function (e, email, emailAuth, setEmailMessage, setAuthorizedEmail, setAuthMessage) {
  e.preventDefault();
  axios
    .post(`/account/auth/checkEmail/${emailAuth}`, { "userEmail": email })
    .then((res) => {
      console.log(res);
      if (res.data) {
        setAuthMessage("인증에 성공하였습니다.");
        setEmailMessage(""); // Correct way to update setEmailMessage state
        setAuthorizedEmail(true);
      } else {
        setAuthMessage("인증번호를 다시 확인해주세요");
        setAuthorizedEmail(false);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const APISERVER = 'http://data.kca.kr/api/v1/cq/certificate/check'

export const checkLicenseApi = async (e, name, license, setTrueLicense, setLicenseMessage) => {
  if(name === "") {
    alert('이름을 입력해주세요!')
  }else{
    e.preventDefault();
    try {
      const res = await axios.get(`${APISERVER}`, {
        params: {
          "apiKey": process.env.REACT_APP_LICENSE_API_KEY,
          "name": name,
          "no": license
        },
        withCredentials: true // Add this line
      });
      console.log(res.data)
      if(res.data.result){
        console.log(res.data)
        if(res.data.certificatename === "언어치료사"){
          setTrueLicense(true)
        }else{
          setLicenseMessage('현재 말하길에서 상담사 자격으로 인정되는 자격증이 아닙니다.\n관리자에게 문의하세요.')
        }
      }
    } catch (error) {
      setLicenseMessage('자격증 인증 도중 에러 발생! 다시 시도해주세요')
    }
  }
  
};