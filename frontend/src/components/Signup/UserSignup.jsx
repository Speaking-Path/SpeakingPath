// 일반 유저일 경우 회원가입 컴포넌트

import { useState } from "react"
import { onChangEmail, onChangeId, onChangePassword, onChangePasswordConfirm, clickSignup } from "./SignupFunc"
import { NavLink } from 'react-router-dom';


function UserSignup() {
  const [email, setEmail] = useState("")
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const [emailMessage, setEmailMessage] = useState("")
  const [idMessage, setIdMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("")

  const data = {
    "email" : email,
    "id" : id,
    "password" : password,
    "passwordConfirm" : passwordConfirm
  }

  return (
    <div>
      <h3>회원가입</h3>
      <form>
        <div>
          <label htmlFor="email">이메일 </label>
          <input type="text" id="email" value={email}
          onChange={(e) => onChangEmail(e, setEmail, setEmailMessage)} />
          <p className="message"> {emailMessage} </p>
        </div>
        <div>
          <label htmlFor="id">아이디 </label>
          <input type="text" id="id" value={id}
          onChange={(e)=> onChangeId(e, setId, setIdMessage)} />
          <p className="message"> {idMessage} </p>
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
        <button onClick={(e)=> clickSignup(e, data)}>가입하기</button>
      </form>
      <p>상담사로 가입하시나요?</p><NavLink to="/account/consultantsignup"><span>회원가입</span></NavLink>
    </div>
  )
}

export default UserSignup