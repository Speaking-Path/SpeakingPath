// 일반 유저일 경우 회원가입 컴포넌트

import React, { useState, useEffect } from 'react';
import {
  onChangeEmail, onChangeId, onChangePassword, onChangePasswordConfirm,
  onChangePhoneNumber
} from "./SignupFunc"
import { NavLink, useNavigate } from 'react-router-dom'
import { checkEmailApi, checkIdApi, clickSignup, checkEmailAuth } from "./AuthAPI"
import styles from './UserSignup.module.css'


function UserSignup() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [emailAuth, setEmailAuth] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const [emailMessage, setEmailMessage] = useState("")
  const [timeoutMessage, setTimeoutMessage] = useState("인증 시간이 만료되었습니다. 다시 인증해주세요.")
  const [authMessage, setAuthMessage] = useState("")
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("")
  const [idMessage, setIdMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("")

  const [isId, setIsId] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
  const [authorizedEmail, setAuthorizedEmail] = useState(false)

  const [remainingTime, setRemainingTime] = useState(0); // Remaining time in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false)

  const startTimer = () => {
    setRemainingTime(3); // 5 minutes in seconds
    setTimerRunning(true);
  }

  useEffect(() => {
    let interval;
    if (timerRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setTimerRunning(false);
      setIsTimeout(true)
    } 
    return () => {
      clearInterval(interval);
    };
  }, [timerRunning, remainingTime]);

  const handleCheckEmail = (e) => {
    setIsTimeout(false)
    startTimer()
  }

  const data = {
    userName, email, phoneNumber, id,
    "password": passwordConfirm
  }

  const navigate = useNavigate()

  return (
    <div className={`${styles.box} d-inline-flex`}>
      <form className={styles.form}> 
        <p className={styles.title}>회원가입</p>
        <div>
          <label className={styles.label} htmlFor="id">아이디 </label>
          <input className={`${styles.checkinput}`} type="text" id="id" value={id} placeholder="아이디 입력"
            onChange={(e) => onChangeId(e, setId, setIdMessage)} disabled={isId}/>
          <button className={`${styles.checkbtn}`} onClick={(e) => checkIdApi(e, id, setIdMessage, setIsId)} >중복확인</button>
          <p className={`${styles.message} ${isId ? styles.correct : styles.message}`}> {idMessage} </p>
        </div>
        <div>
          <label className={styles.label} htmlFor="email">이메일 </label>
          <input className={`${styles.checkinput}`} type="text" id="email" value={email} placeholder="이메일 계정"
            onChange={(e) => onChangeEmail(e, setEmail, setEmailMessage)} disabled={isEmail}/>
          <button className={`${styles.checkbtn}`} onClick={(e) => {checkEmailApi(e, email, setEmailMessage, setIsEmail); handleCheckEmail();}} disabled={!isEmail}>인증받기</button>
          {timerRunning && !authorizedEmail && (
            <p className={`${styles.message} ${styles.timer}`}>남은 시간: {Math.floor(remainingTime / 60)}분 {remainingTime % 60}초</p>
          )}
          {isTimeout && isEmail && (<>
            <p className={`${styles.message}`}> {timeoutMessage} </p>
          </>)}
          {!isTimeout && (<>
            <p className={`${styles.message} ${isEmail ? styles.correct2 : styles.message }`}> {emailMessage} </p>
          </>)}
          
          {isEmail && !isTimeout && ( <>
          <input className={`${styles.checkinput2}`} type="text" id="emailCheck" value={emailAuth} placeholder="인증번호를 입력해주세요" onChange={(e) => setEmailAuth(e.target.value)} disabled={authorizedEmail}/>
          <button className={`${styles.checkbtn}`} onClick={(e) => checkEmailAuth(e, email, emailAuth, setEmailMessage, setAuthorizedEmail, setAuthMessage)}>인증확인</button>
          <p className={`${styles.message} ${authorizedEmail ? styles.correct : styles.message }`}> {authMessage} </p>
          </>)}
        </div>
        <div>
          <label className={styles.label} htmlFor="phoneNumber">핸드폰번호 </label>
          <input className={styles.input} type="text" id="phoneNumber" value={phoneNumber} placeholder="'-' 없이 입력"
            onChange={(e) => onChangePhoneNumber(e, setphoneNumber, setPhoneNumberMessage)} />
          <p className={styles.message}> {phoneNumberMessage} </p>
        </div>
        <div>
          <label className={styles.label} htmlFor="userName">이름 </label>
          <input className={styles.input} type="text" id="userName" value={userName} placeholder="이름 입력"
            onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div>
          <label className={styles.label} htmlFor="password">비밀번호</label>
          <input className={styles.input} type="password" id="password" value={password} placeholder="비밀번호 입력"
            onChange={(e) => onChangePassword(e, setPassword, setPasswordMessage, setIsPassword)} />
          <p className={styles.message}> {passwordMessage} </p>
        </div>
        <div>
          <label className={styles.label} htmlFor="passwordConfirm"></label>
          <input className={styles.pwdCheckInput} type="password" id="passwordConfirm" value={passwordConfirm} placeholder="비밀번호 확인"
            onChange={(e) => onChangePasswordConfirm(e, password, setPasswordConfirm, setPasswordConfirmMessage, setIsPasswordConfirm)} />
          <p className={styles.message}> {passwordConfirmMessage} </p>
        </div>
        <button className={styles.signupBtn} onClick={async (e) => {
          if (isPassword && isPasswordConfirm && isId && isEmail && authorizedEmail) {
            const signup = await clickSignup(e, data)
            if (signup.data === "success") {
              navigate('/account/login')
            }
          } else if (!isPassword | !isPasswordConfirm) {
            e.preventDefault()
            alert("비밀번호를 다시 확인해주세요.")
          } else if (!isId) {
            e.preventDefault()
            alert("아이디를 확인해주세요.")
          } else if (!isEmail || !authorizedEmail) {
            e.preventDefault()
            alert("이메일을 확인해주세요.")
          } 
        }}>가입하기</button>
        <div className={styles.consultSignup}>
        <span>상담사로 가입하시나요?</span>
        <NavLink to="/account/consultantsignup">
          회원가입</NavLink>
        </div>
      </form>
    </div>
  )
}

export default UserSignup