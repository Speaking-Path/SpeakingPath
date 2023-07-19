// 로그인 페이지

import { useState } from "react"
import { clickLogin } from "./SignupFunc"
import { useNavigate } from "react-router-dom"

function UserLogin() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const data = {id, password}

  const navigate = useNavigate()

  return (
    <div>
      <h3>로그인</h3>
      <form>
        <div>
          <label htmlFor="id">아이디 </label>
          <input type="text" id="id" value={id}
          onChange={(e)=>{setId(e.target.value)}} />
        </div>
        <div>
          <label htmlFor="password">비밀번호 </label>
          <input type="password" id="password" value={password}
          onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <button onClick={(e)=> {
          clickLogin(e, data)
          navigate("/")
          }}>로그인</button>
      </form>
    </div>
  )
}

export default UserLogin