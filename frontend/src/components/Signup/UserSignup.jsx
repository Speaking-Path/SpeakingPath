// 일반 유저일 경우 회원가입 컴포넌트

import { useState } from "react"
import { onChangeEmail, onChangeId, onChangePassword, onChangePasswordConfirm,
  clickSignup, onChangePhoneNumber, checkEmail, checkId } from "./SignupFunc"
import { NavLink, useNavigate } from 'react-router-dom'


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

  const data = {
    userName, email, phoneNumber, id, password
  }

  const navigate = useNavigate()

  return (
    <div>
      <h3>회원가입</h3>
      <form>
        <div>
          <label htmlFor="userName">이름 </label>
          <input type="text" id="userName" value={userName}
            onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">이메일 </label>
          <input type="text" id="email" value={email}
            onChange={(e) => onChangeEmail(e, setEmail, setEmailMessage)} />
          <p className="message"> {emailMessage} </p>
          <button onClick={(e)=>checkEmail(e, email)}>중복확인</button>
        </div>
        <div>
          <label htmlFor="phoneNumber">핸드폰번호 </label>
          <input type="text" id="phoneNumber" value={phoneNumber}
            onChange={(e) => onChangePhoneNumber(e, setphoneNumber, setPhoneNumberMessage)} />
          <p className="message"> {phoneNumberMessage} </p>
        </div>
        <div>
          <label htmlFor="id">아이디 </label>
          <input type="text" id="id" value={id}
            onChange={(e) => onChangeId(e, setId, setIdMessage)} />
          <p className="message"> {idMessage} </p>
          <button onClick={(e)=>checkId(e, id)}>중복확인</button>
        </div>
        <div>
          <label htmlFor="password">비밀번호 </label>
          <input type="password" id="password" value={password}
            onChange={(e) => onChangePassword(e, setPassword, setPasswordMessage)} />
          <p className="message"> {passwordMessage} </p>
        </div>
        <div>
          <label htmlFor="passwordConfirm">비밀번호 확인 </label>
          <input type="password" id="passwordConfirm" value={passwordConfirm}
            onChange={(e) => onChangePasswordConfirm(e, password, setPasswordConfirm, setPasswordConfirmMessage)} />
          <p className="message"> {passwordConfirmMessage} </p>
        </div>
        <button onClick={(e) => {
          clickSignup(e, data)
          navigate('/login')
        }}>가입하기</button>
      </form>
      <p>상담사로 가입하시나요?</p><NavLink to="/account/consultantsignup"><span>회원가입</span></NavLink>
    </div>
  )
}

export default UserSignup