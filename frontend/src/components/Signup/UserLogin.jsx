import { useState } from "react"
import { login } from "./AuthAPI"
import { clickLogin } from "./SignupFunc"

function UserLogin() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const data = {id, password}

  const handleSubmit = async (e) => {
    login(data)
    .then((response) => {
        localStorage.clear()
        localStorage.setItem('tokenType', response.tokenType)
        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        window.location.href = `/home`
    }).catch((error) => {
        console.log(error)
    });
}

  return (
    <div>
      <h3>로그인</h3>
      <form onSubmit={handleSubmit}>
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
        <button onClick={(e)=> clickLogin(e, data)}>로그인</button>
      </form>
    </div>
  )
}

export default UserLogin