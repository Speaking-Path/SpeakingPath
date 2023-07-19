// 컨설턴트 회원가입일 경우

import { useState } from "react"
import { onChangEmail, onChangeId, onChangePassword, onChangePasswordConfirm, clickConsultantSignup } from "./SignupFunc"


function ConsultantSignup() {
  const [email, setEmail] = useState("")
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [team, setTeam] = useState("")
  const [exp, setExp] = useState("")
  const [tag, setTag] = useState([])
  const [boundry, setBoundry] = useState([])


  const [emailMessage, setEmailMessage] = useState("")
  const [idMessage, setIdMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("")

  const data = {
    email, id, password, passwordConfirm, team, exp, tag, boundry
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
        <div>
          <label htmlFor="team">소속 </label>
          <input type="text" id="team" value={team}
            onChange={(e) => setTeam(e.target.value)} />
        </div>
        <div>
          <label htmlFor="exp">경력 </label>
          <input type="text" id="exp" value={exp}
            onChange={(e) => setExp(e.target.value)} />
        </div>
        <div>
          <label htmlFor="tag">태그 </label>
          <input type="text" id="tag" value={tag}
            onChange={(e) => setTag(e.target.value)} />
        </div>
        <div>
          <label htmlFor="boundry">치료가능영역 </label>
          <input type="text" id="boundry" value={boundry}
            onChange={(e) => setBoundry(e.target.value)} />
        </div>
        <button onClick={(e)=> clickConsultantSignup(e, data)}>가입하기</button>
      </form>
    </div>
  )
}

export default ConsultantSignup