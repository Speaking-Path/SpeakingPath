// 로그인 페이지

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from './UserLogin.module.css'
import { NavLink } from "react-router-dom"
import { clickLogin } from "./SignupFunc"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from "react-redux"
import { changeLoginId, changeLoginInfo } from "../../store/UserInfo"


function UserLogin() {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const loginToken = useSelector((state)=> {return state.loginToken})
  const loginId = useSelector((state)=>{ return state.loginId})
  const dispatch = useDispatch()

  const data = {id, password}

  const navigate = useNavigate()

  return (
    <div className={`${styles.box} d-inline-flex`}>
      <form className={styles.form}>
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
        onClick={async (e)=> {
          const loginRes = await clickLogin(e, data)
          if (loginRes===1) {
            navigate("/")
            const ACCESS_TOKEN = localStorage.getItem("accessToken")
            dispatch(changeLoginInfo(ACCESS_TOKEN))
            dispatch(changeLoginId(id))
          }
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