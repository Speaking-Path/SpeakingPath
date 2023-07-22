// 컨설턴트 회원가입일 경우

import { useState } from "react"
import { onChangeEmail, onChangeId, onChangePassword, onChangePasswordConfirm,
  onChangePhoneNumber, onChangeExp } from "./SignupFunc"
import { useNavigate } from "react-router-dom"
import { checkEmailApi, checkIdApi, clickConsultantSignup } from "./AuthAPI"


function ConsultantSignup() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setphoneNumber] = useState("")
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [team, setTeam] = useState("")
  const [exp, setExp] = useState("")
  const [tag, setTag] = useState([])
  const [boundry, setBoundry] = useState([])


  const [emailMessage, setEmailMessage] = useState("")
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("")
  const [idMessage, setIdMessage] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("")
  const [expMessage, setExpMessage] = useState("")


  const [isId, setIsId] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
  const [isTeam, setIsTeam] = useState(false)
  const [isExp, setIsExp] = useState(false)
  const [isTag, setIsTag] = useState(false)
  const [isBoundry, setIsBoundry] = useState(false)




  const navigate = useNavigate()

  const [tagsCheck, setTagsCheck] = useState(['엄격한', '친근한', '친절한', '정적인', '발랄한', '활동적인'])
  const [boundrysCheck, setBoundrysCheck] = useState(['언어발달장애', '말소리장애', '신경언어장애', '유창성장애', '음성장애'])

  const data = {
    userName, email, id, phoneNumber, 
    "password" : passwordConfirm,
    team, exp, tag, boundry
  }

  const changeBoundry = (checked, item) => {
    if (checked) {
      setBoundry([...boundry, item]);
    } else {
      setBoundry(boundry.filter((el) => el !== item));
    }
    if (boundry) {
      setIsBoundry(true)
    } else {
      setIsBoundry(false)
    }
  }


  const changeTag = (checked, item) => {
    if (checked) {
      setTag([...tag, item]);
    } else {
      setTag(tag.filter((el) => el !== item));
    }
    if (tag) {
      setIsTag(true)
    } else {
      setIsTag(false)
    }
  }
  

  return (
    <div>
      <h3>회원가입</h3>
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
        <hr />
        <div>
          <label htmlFor="team">소속 </label>
          <input type="text" id="team" value={team}
            onChange={(e) => {
              if (e.target.value) {
                setTeam(e.target.value)
                setIsTeam(true)
              } else {
                setIsTeam(false)
              }
              } 
            }/>
        </div>
        <div>
          <label htmlFor="exp">경력 </label>
          <input type="text" id="exp" value={exp}
            onChange={(e) => onChangeExp(e, setExp, setExpMessage, setIsExp)} /><span>(개월)</span>
          <p className="message"> {expMessage} </p>
        </div>
        <div>
          <h6>치료가능영역</h6>
          {
            boundrysCheck.map((boundrys, index) => {
              return (
                <div key={index}>
                  <input type="checkbox" id={boundrys}
                    onChange={(e) => {
                      changeBoundry(e.currentTarget.checked, boundrys)
                    }}
                    checked={boundry.includes(boundrys) ? true : false}></input>
                  <label htmlFor={boundrys}>{boundrys}</label>
                </div>
              )
            })
          }
        </div>
        <div>
          <p>태그</p>
          {
            tagsCheck.map((tags, index) => {
              return (
                <div key={index}>
                  <input type="checkbox" id={tags}
                    onChange={(e) => {
                      changeTag(e.currentTarget.checked, tags)
                    }}
                    checked={tag.includes(tags) ? true : false}></input>
                  <label htmlFor={tags}>{tags}</label>
                </div>
              )
            })
          }
        </div>
        <button onClick={async (e) => {
          e.preventDefault()
          if (isPassword && isPasswordConfirm && isId && isEmail
            && isBoundry && isExp && isTag && isTeam) {
            const signup = await clickConsultantSignup(e, data)
            if (signup === id) {
              navigate('/account/login')
            }
          } else if (!isPassword | !isPasswordConfirm){
            alert("비밀번호를 다시 확인해주세요.")
          } else if (!isId) {
            alert("아이디를 확인해주세요.")
          } else if (!isEmail) {
            alert("이메일을 확인해주세요.")
          } else if(!isTeam) {
            alert("소속을 입력해주세요.")
          } else if(!isExp) {
            alert("경력을 입력해주세요.")
          } else if(!isBoundry) {
            alert("치료가능영역을 선택해주세요")
          } else if(!isTag) {
            alert("태그를 선택해주세요")
          }
        }}>가입하기</button>
      </form>
    </div>
  )
}

export default ConsultantSignup