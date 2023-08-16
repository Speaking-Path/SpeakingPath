// 컨설턴트 회원가입일 경우

import { useState } from "react"
import {
  onChangeEmail, onChangeId, onChangePassword, onChangePasswordConfirm,
  onChangePhoneNumber, onChangeExp
} from "./SignupFunc"
import { useNavigate } from "react-router-dom"
import { checkEmailApi, checkIdApi, clickConsultantSignup, checkEmailAuth } from "./AuthAPI"
import styles from "./UserSignup.module.css"

function ConsultantSignup() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [emailAuth, setEmailAuth] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [team, setTeam] = useState("")
  const [exp, setExp] = useState("")
  const [tag, setTag] = useState([])
  const [boundry, setBoundry] = useState([])
  const [sex, setSex] = useState("")



  const [emailMessage, setEmailMessage] = useState("")
  const [authMessage, setAuthMessage] = useState("")
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("")
  const [idMessage, setIdMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("")
  const [expMessage, setExpMessage] = useState("")


  const [isId, setIsId] = useState(false)
  const [idBtn, setIdBtn] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [emailBtn, setEmailBtn] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
  const [isTeam, setIsTeam] = useState(false)
  const [isExp, setIsExp] = useState(false)
  const [isTag, setIsTag] = useState(false)
  const [isBoundry, setIsBoundry] = useState(false)
  const [isSex, setIsSex] = useState(false)
  const [authorizedEmail, setAuthorizedEmail] = useState(false)



  const navigate = useNavigate()

  const [tagsCheck, setTagsCheck] = useState(["엄격한", "친근한", "친절한", "정적인", "발랄한", "활동적인"])
  const [boundrysCheck, setBoundrysCheck] = useState(["언어발달장애", "말소리장애", "신경언어장애", "유창성장애", "음성장애"])


  const data = {
    userName, email, id, phoneNumber,
    "password": passwordConfirm,
    sex, team, exp, tag, boundry
  }

  const changeBoundry = (checked, item) => {
    if (checked) {
      setBoundry([...boundry, item])
    } else {
      setBoundry(boundry.filter((el) => el !== item))
    }
    if (boundry) {
      setIsBoundry(true)
    } else {
      setIsBoundry(false)
    }
  }


  const changeTag = (checked, item) => {
    if (checked) {
      setTag([...tag, item])
    } else {
      setTag(tag.filter((el) => el !== item))
    }
    if (tag) {
      setIsTag(true)
    } else {
      setIsTag(false)
    }
  }

  const handleRadioChange = (e) => {
    setSex(e.target.value)
    if (sex) {
      setIsSex(true)
    } else {
      setIsSex(false)
    }
  }


  return (
    <div className={`${styles.box} d-inline-flex`}>
      <form className={styles.form}>
        <p className={styles.title}>회원가입</p>
        <div>
          <label className={styles.label} htmlFor="id">아이디 </label>
          <input className={`${styles.checkinput}`} type="text" id="id" value={id} placeholder="아이디 입력"
            onChange={(e) => onChangeId(e, setId, setIdMessage, setIdBtn)} />
          <button className={`${styles.checkbtn}`} onClick={(e) => checkIdApi(e, id, setIdMessage, setIsId)}>중복확인</button>
          <p className={`${styles.message} ${isId ? styles.correct : styles.message}`}> {idMessage} </p>
        </div>
        <div>
          <label className={styles.label} htmlFor="email">이메일 </label>
          <input className={`${styles.checkinput}`} type="text" id="email" value={email} placeholder="이메일 계정"
            onChange={(e) => onChangeEmail(e, setEmail, setEmailMessage, setEmailBtn)} disabled={isEmail}/>
          <button className={`${styles.checkbtn}`} onClick={(e) => checkEmailApi(e, email, setEmailMessage, setIsEmail)}>인증받기</button>
          <p className={`${styles.message} ${isEmail ? styles.correct : styles.message }`}> {emailMessage} </p>
          {isEmail && ( <>
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
          <label className={styles.label} htmlFor="password">비밀번호 </label>
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
        <hr />
        <div>
          <label className={styles.label} htmlFor="team">소속 </label>
          <input className={styles.input} type="text" id="team" value={team} placeholder="근무지 입력"
            onChange={async (e) => {
              const teamName = e.target.value
              setTeam(teamName)
              if (e.target.value) {
                setIsTeam(true)
              } else {
                setIsTeam(false)
              }
            }
            } />
        </div>
        <div>
          <label className={styles.label} htmlFor="exp">경력 </label>
          <input className={styles.input} type="text" id="exp" value={exp} placeholder="연 단위로 입력"
            onChange={(e) => onChangeExp(e, setExp, setExpMessage, setIsExp)} />
          <p className={styles.message}> {expMessage} </p>
        </div>
        <p className={styles.label}>성별</p>
        <div className="container">
          <div className="row">
            <div className="col">
              <input className={styles.input} type="radio" id="F" value="F" name="sex"
              onClick={handleRadioChange}/>
              <label className={styles.checklabel} htmlFor="F">여성</label>
            </div>
            <div className="col">
              <input className={styles.input} type="radio" id="M" value="M" name="sex"
              onClick={handleRadioChange}/>
              <label className={styles.checklabel} htmlFor="M">남성</label>
            </div>
          </div>
          <div>
          </div>
        </div>
        <p className={styles.label}>치료가능영역</p>
        <div className="container">
          <div className="row">
            {
              boundrysCheck.map((boundrys, index) => {
                return (
                  <div key={index} className={`${styles.checkdiv} col-4`}>
                    <input className={styles.input} type="checkbox" id={boundrys}
                      onChange={(e) => {
                        changeBoundry(e.currentTarget.checked, boundrys)
                      }}
                      checked={boundry.includes(boundrys) ? true : false}></input>
                    <label className={styles.checklabel} htmlFor={boundrys}>{boundrys}</label>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div>
          <p className={styles.label}>태그</p>
          <div className="container">
            <div className="row">
              {
                tagsCheck.map((tags, index) => {
                  return (
                    <div key={index} className={`${styles.checkdiv} col-4`}>
                      <input className={styles.input} type="checkbox" id={tags}
                        onChange={(e) => {
                          changeTag(e.currentTarget.checked, tags)
                        }}
                        checked={tag.includes(tags) ? true : false}></input>
                      <label className={styles.checklabel} htmlFor={tags}>{tags}</label>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

        <button className={styles.signupBtn} onClick={async (e) => {
          e.preventDefault()
          if (isPassword && isPasswordConfirm && isId && isEmail && authorizedEmail
            && isBoundry && isExp && isTag && isTeam) {
            const signup = await clickConsultantSignup(e, data)
            if (signup === "success") {
              navigate("/account/login")
            }
          } else if (!isPassword | !isPasswordConfirm) {
            alert("비밀번호를 다시 확인해주세요.")
          } else if (!isId) {
            alert("아이디를 확인해주세요.")
          } else if (!isEmail) {
            alert("이메일을 확인해주세요.")
          } else if (!isTeam) {
            alert("소속을 입력해주세요.")
          } else if (!isExp) {
            alert("경력을 입력해주세요.")
          } else if(!isSex) {
            alert("성별을 입력해주세요")
          }else if (!isBoundry) {
            alert("치료가능영역을 선택해주세요")
          } else if (!isTag) {
            alert("태그를 선택해주세요")
          } else if(!authorizedEmail){
            alert("이메일을 인증해주세요")
          }
        }}>가입하기</button>
      </form>
    </div>
  )
}

export default ConsultantSignup