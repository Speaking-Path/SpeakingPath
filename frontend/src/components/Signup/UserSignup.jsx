// 일반 유저일 경우 회원가입 컴포넌트

import { useState } from "react"
import {
  onChangeEmail, onChangeId, onChangePassword, onChangePasswordConfirm,
  onChangePhoneNumber } from "./SignupFunc"
import { NavLink, useNavigate } from 'react-router-dom'
import { checkEmailApi, checkIdApi, clickSignup } from "./AuthAPI"


function UserSignup() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const [emailMessage, setEmailMessage] = useState("")
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("")
  const [idMessage, setIdMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("")

  const [isId, setIsId] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)


  const data = {
    userName, email, phoneNumber, id,
    "password" : passwordConfirm
  }

  const navigate = useNavigate()

  return (
    <div>
      <form>
        <div>
          <label htmlFor="id">아이디 </label>
          <input type="text" id="id" value={id}
            onChange={(e) => onChangeId(e, setId, setIdMessage)} />
          <button onClick={(e) => checkIdApi(e, id, setIdMessage, setIsId)}>중복확인</button>
          <p className="message"> {idMessage} </p>
        </div>
        <div>
          <label htmlFor="email">이메일 </label>
          <input type="text" id="email" value={email}
            onChange={(e) => onChangeEmail(e, setEmail, setEmailMessage)} />
          <button onClick={(e) => checkEmailApi(e, email, setEmailMessage, setIsEmail)}>중복확인</button>
          <p className="message"> {emailMessage} </p>
        </div>
        <div>
          <label htmlFor="phoneNumber">핸드폰번호 </label>
          <input type="text" id="phoneNumber" value={phoneNumber}
            onChange={(e) => onChangePhoneNumber(e, setphoneNumber, setPhoneNumberMessage)} />
          <p className="message"> {phoneNumberMessage} </p>
        </div>
        <div>
          <label htmlFor="userName">이름 </label>
          <input type="text" id="userName" value={userName}
            onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">비밀번호 </label>
          <input type="password" id="password" value={password}
            onChange={(e) => onChangePassword(e, setPassword, setPasswordMessage, setIsPassword)} />
          <p className="message"> {passwordMessage} </p>
        </div>
        <div>
          <label htmlFor="passwordConfirm">비밀번호 확인 </label>
          <input type="password" id="passwordConfirm" value={passwordConfirm}
            onChange={(e) => onChangePasswordConfirm(e, password, setPasswordConfirm, setPasswordConfirmMessage, setIsPasswordConfirm)} />
          <p className="message"> {passwordConfirmMessage} </p>
        </div>
        <button onClick={async (e) => {
          if (isPassword && isPasswordConfirm && isId && isEmail) {
            const signup = await clickSignup(e, data)
            if (signup === id) {
              navigate('/account/login')
            }
          } else if (!isPassword | !isPasswordConfirm){
            e.preventDefault()
            alert("비밀번호를 다시 확인해주세요.")
          } else if (!isId) {
            e.preventDefault()
            alert("아이디를 확인해주세요.")
          } else if (!isEmail) {
            e.preventDefault()
            alert("이메일을 확인해주세요.")
          }
        }}>가입하기</button>
      </form>
      <p>상담사로 가입하시나요?</p><NavLink to="/account/consultantsignup"><span>회원가입</span></NavLink>
    </div>
  )
}

export default UserSignup