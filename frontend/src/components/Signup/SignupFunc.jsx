import { login, naverLogin } from "./AuthAPI"

export const onChangeEmail = function (e, setEmail, setEmailMessage, setEmailBtn) {
  const currentEmail = e.target.value
  setEmail(currentEmail)
  const emailRegExp =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/

  if (!emailRegExp.test(currentEmail)) {
    setEmailMessage("이메일의 형식이 올바르지 않습니다.")
    setEmailBtn(false)
  } else {
    setEmailMessage("")
    setEmailBtn(true)
  }
}

export const onChangePhoneNumber = function (e, setPhoneNumber, setPhoneNumberMessage) {
  const currentPhoneNumber = e.target.value.replace(/[^0-9]/g, ''); // 하이픈을 제거하고 숫자만 남깁니다.

  const regPhone = (phoneNumber) => {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d)/, "$1-$2-$3");
  };

  const formattedPhoneNumber = regPhone(currentPhoneNumber);
  setPhoneNumber(formattedPhoneNumber);

  const phoneRegExp = /^[0-9]{0,13}$/;

  if (currentPhoneNumber.length > 11) {
    setPhoneNumberMessage("핸드폰 번호를 입력해 주세요.");
  } else if (!phoneRegExp.test(currentPhoneNumber)) {
    setPhoneNumberMessage("숫자만 입력해 주세요.");
  } else {
    setPhoneNumberMessage("");
  }
};

export const onChangeId = function (e, setId, setIdMessage, setIdBtn) {
  const currentId = e.target.value
  setId(currentId)
  const idRegExp = /^[a-zA-z0-9]{4,12}$/

  if (!idRegExp.test(currentId)) {
    setIdMessage("4-12이내 영문 대소문자 또는 숫자만 입력해 주세요!")
  } else {
    setIdMessage("")
    setIdBtn(true)
  }
}

export const onChangePassword = function (e, setPassword, setPasswordMessage, setIsPassword) {
  const currentPassword = e.target.value
  setPassword(currentPassword)
  const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
  if (!passwordRegExp.test(currentPassword)) {
    setPasswordMessage(
      "숫자, 영문, 특수문자 조합으로 8자리 이상 입력해주세요."
    )
    setIsPassword(false)
  } else {
    setPasswordMessage("")
    setIsPassword(true)
  }
}

export const onChangePasswordConfirm = function (e, password, setPasswordConfirm, setPasswordConfirmMessage, setIsPasswordConfirm) {
  const currentPasswordConfirm = e.target.value
  setPasswordConfirm(currentPasswordConfirm)
  if (password !== currentPasswordConfirm) {
    setPasswordConfirmMessage("같은 비밀번호를 입력해주세요.")
    setIsPasswordConfirm(false)
  } else {
    setPasswordConfirmMessage("")
    setPasswordConfirm(currentPasswordConfirm)
    setIsPasswordConfirm(true)
  }
}

export const onChangeExp = function (e, setExp, setExpMessage, setIsExp) {
  const currentExp = e.target.value
  setExp(currentExp)
  const ExpReg = /^[0-9]{0,13}$/
  if (!ExpReg.test(currentExp)) {
    setExpMessage("숫자만 입력해주세요.")
    setIsExp(false)
  } else {
    setExpMessage("")
    setIsExp(true)
  }
}


export const clickLogin = async (e, data) => {
  e.preventDefault()
  const response = await login(data)
  if (response===0) {
    alert("아이디와 비밀번호를 확인해주세요")
    return 0
  } else {
    localStorage.clear()
    localStorage.setItem('tokenType', response.grantType)
    localStorage.setItem('accessToken', response.accessToken)
    localStorage.setItem('refreshToken', response.refreshToken)

    function clearLocalStorageAfterTime() {
      localStorage.clear();
      console.log("localStorage cleared!");
    }

    setTimeout(clearLocalStorageAfterTime, 86400000)
    return 1
  }
}

export const clickNaverLogin = async (e) => {
  e.preventDefault()
  const url = `https://nid.naver.com/oauth2.0/authorize?response_type=${process.env.REACT_APP_RESPONSE_TYPE}&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}
  &state=${process.env.REACT_APP_STATE}`
  console.log(url)
  window.location.href = url;

  
  const response = await naverLogin()
  if (response===0) {
    alert("네이버로 로그인 실패하였습니다.")
    return 0
  } else {
    localStorage.clear()
    localStorage.setItem('tokenType', response.grantType)
    localStorage.setItem('accessToken', response.accessToken)
    localStorage.setItem('refreshToken', response.refreshToken)

    function clearLocalStorageAfterTime() {
      localStorage.clear();
      console.log("localStorage cleared!");
    }

    setTimeout(clearLocalStorageAfterTime, 86400000)
    return 1
  }
}