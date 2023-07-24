// 로그인 페이지

import { useState } from "react"
import { clickLogin } from "./SignupFunc"
import { useNavigate } from "react-router-dom"
import styles from './UserLogin.module.css'
import { NavLink } from "react-router-dom"

function UserLogin() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const data = {id, password}

  const navigate = useNavigate()

  return (
    <div className={`${styles.box} d-inline-flex`}>
      <form>
      <p className={`${styles.title}`}>로그인</p>
        <div>
          <label className={styles.label} htmlFor="id">아이디</label>
          <input className={styles.input} type="text" id="id" value={id} placeholder="아이디 입력"
          onChange={(e)=>{setId(e.target.value)}} />
        </div>
        <div>
          <label className={styles.label} htmlFor="password">비밀번호</label>
          <input className={styles.input} type="password" id="password" value={password} placeholder="비밀번호 입력"
          onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <p className={styles.forgot}>로그인 정보를 잊으셨나요?</p>
        <button className={styles.loginBtn} variant="contained" 
        onClick={(e)=> {
          clickLogin(e, data)
          navigate("/")
          }}>로그인</button>
        <div className={styles.join}>
        <span>아직 계정이 없으신가요? </span>
        <NavLink className={styles.clickjoin} to="/account/signup">
          회원가입</NavLink>
        </div>
      </form>
    </div>
  )
}

export default UserLogin