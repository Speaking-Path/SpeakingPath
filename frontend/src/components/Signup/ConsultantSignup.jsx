// 컨설턴트 회원가입일 경우

import { useState } from "react"
import { onChangeEmail, onChangeId, onChangePassword, onChangePasswordConfirm,
  clickConsultantSignup, onChangePhoneNumber, onChangeExp } from "./SignupFunc"
import { useNavigate } from "react-router-dom"

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


  const navigate = useNavigate()

  const [tagsCheck, setTagsCheck] = useState(['엄격한', '친근한', '친절한', '정적인', '발랄한', '활동적인'])
  const [boundrysCheck, setBoundrysCheck] = useState(['언어발달장애', '말소리장애', '신경언어장애', '유창성장애', '음성장애'])

  const data = {
    userName, email, id, phoneNumber, password, team, exp, tag, boundry
  }

  const changeBoundry = (checked, item) => {
    if (checked) {
      setBoundry([...boundry, item]);
    } else {
      setBoundry(boundry.filter((el) => el !== item));
    }
  }


  const changeTag = (checked, item) => {
    if (checked) {
      setTag([...tag, item]);
    } else {
      setTag(tag.filter((el) => el !== item));
    }
  }
  

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
            onChange={(e) => onChangeExp(e, setExp, setExpMessage)} /><span>(개월)</span>
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
        <button onClick={(e) => {
          clickConsultantSignup(e, data)
          navigate('/login')
        }}>가입하기</button>
      </form>
    </div>
  )
}

export default ConsultantSignup