import { login } from "./AuthAPI"

export const onChangeEmail = function(e, setEmail, setEmailMessage) {
  const currentEmail = e.target.value
  setEmail(currentEmail)
  const emailRegExp =
    /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/

  if (!emailRegExp.test(currentEmail)) {
    setEmailMessage("이메일의 형식이 올바르지 않습니다.")
  } else (
    setEmailMessage("")
  )
}

export const onChangePhoneNumber = function(e, setPhoneNumber, setPhoneNumberMessage) {
  const currentPhoneNumber = e.target.value;
  
  const regPhone = (phoneNumber) => {
    return phoneNumber.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{4})(\d)/, "$1-$2-$3");
  };
  
  setPhoneNumber(regPhone(currentPhoneNumber));
  const phoneRegExp = /^[0-9\b -]{0,13}$/;

  if (currentPhoneNumber.replace(/[^0-9]/g, "").length > 11) {
    setPhoneNumberMessage("핸드폰 번호를 입력해 주세요.");
  } 
  else if (!phoneRegExp.test(currentPhoneNumber)) {
    setPhoneNumberMessage("숫자만 입력해 주세요.");
  } else {
    setPhoneNumberMessage("");
  }
};

export const onChangeId = function(e, setId, setIdMessage) {
  const currentId = e.target.value
  setId(currentId)
  const idRegExp = /^[a-zA-z0-9]{4,12}$/

  if (!idRegExp.test(currentId)) {
    setIdMessage("4-12이내 영문 대소문자 또는 숫자만 입력해 주세요!")
  } else {
    setIdMessage("")
  }
}

export const onChangePassword = function(e, setPassword, setPasswordMessage, setIsPassword) {
  const currentPassword = e.target.value;
  setPassword(currentPassword);
  const passwordRegExp =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
  if (!passwordRegExp.test(currentPassword)) {
    setPasswordMessage(
      "숫자, 영문, 특수문자 조합으로 8자리 이상 입력해주세요."
    );
    setIsPassword(false)
  } else {
    setPasswordMessage("")
    setIsPassword(true)
  }
}

export const onChangePasswordConfirm = function(e, password, setPasswordConfirm, setPasswordConfirmMessage, setIsPasswordConfirm) {
  const currentPasswordConfirm = e.target.value;
  setPasswordConfirm(currentPasswordConfirm)
  if (password !== currentPasswordConfirm) {
    setPasswordConfirmMessage("같은 비밀번호를 입력해주세요.");
    setIsPasswordConfirm(false)
  } else {
    setPasswordConfirmMessage("");
    setPasswordConfirm(currentPasswordConfirm);
    setIsPasswordConfirm(true)
  }
}

export const onChangeExp = function(e, setExp, setExpMessage, setIsExp) {
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
  await login(data)
  .then((response) => {
      localStorage.clear()
      localStorage.setItem('tokenType', response.tokenType)
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
      console.log(response)
  }).catch((error) => {
      console.log(error)
  })
}