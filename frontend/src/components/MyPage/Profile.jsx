import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Profile.module.css'
import { useEffect } from 'react';


function Profile() {
  const userInfo = useSelector((state) => { return state.profileInfo })
  const [data, setData] = useState({
    userId: userInfo.userId,
    userPhone: null,
    userInfo: null,
    userPwd: null,
  })

  const tokenType = localStorage.getItem('tokenType')
  const accessToken = localStorage.getItem('accessToken')

  const [pwd2, setPwd2] = useState("")

  const [clickPwdM, setClickPwdM] = useState(false)
  const [clickPhoneM, setClickPhoneM] = useState(false)
  const [clickInfoM, setClickInfoM] = useState(false)

  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("")
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)

  // const [email, setEmail] = useState("")
  const [phone, setphone] = useState("")
  const [info, setInfo] = useState("")


  const onChangePassword = function (e, setPassword, setPasswordMessage, setIsPassword) {
    const currentPassword = e.target.value
    setPassword(currentPassword)
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자, 영문, 특수문자 조합 8자리 이상 입력"
      )
      setIsPassword(false)
    } else {
      setPasswordMessage("")
      setIsPassword(true)
    }
  }

  const onChangePasswordConfirm = function (e, password, setPasswordConfirm, setPasswordConfirmMessage, setIsPasswordConfirm) {
    const currentPasswordConfirm = e.target.value
    setPasswordConfirm(currentPasswordConfirm)
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("같은 비밀번호를 입력해주세요.")
      setIsPasswordConfirm(false)
    } else {
      setPasswordConfirmMessage("")
      setPasswordConfirm(currentPasswordConfirm)
      setIsPasswordConfirm(true)
      const newData = { ...data }
      newData.userPwd = password
      setData(newData)
      console.log(data.userPwd)
    }
  }


  const changePhone = (newPhone) => {
    const newData = { ...data }
    newData.userPhone = newPhone
    setData(newData)
  }

  const changeInfo = (newInfo) => {
    const newData = { ...data }
    newData.userInfo = newInfo
    setData(newData)
  }


  const changeUserInfo = () => {
    axios.put("/account/change", data,
      {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      })
      .then((res) => {
        alert("유저 정보가 업데이트 되었습니다.")
        window.location.reload();
      })
      .catch((err) => {
        alert('알 수 없는 문제로 실패하였습니다.\n관리자에게 문의하세요.')
      })
  }
  const rewardSteps = [100, 300, 500, 700, 1500];


  const calculateRemainingPoints = (userReward) => {
    let remainingPoints = 0;
    for (let i = 0; i < rewardSteps.length; i++) {
      if (userReward < rewardSteps[i]) {
        remainingPoints = rewardSteps[i] - userReward;
        break;
      }
    }
    return remainingPoints;
  };

  const [imageURL, setImageURL] = useState("")

  const changeImageURL = () => {
    let reward = userInfo.userReward

    if (reward >= 0 && reward < 100) {
      setImageURL("/assets/reward/walk.png")
    } else if (reward >= 100 && reward < 300) {
      setImageURL("/assets/reward/bicycle.png")

    } else if (reward >= 300 && reward < 500) {
      setImageURL("/assets/reward/car.png")

    } else if (reward >= 500 && reward < 700) {
      setImageURL("/assets/reward/train.png")

    } else if (reward >= 700 && reward < 1500) {
      setImageURL("/assets/reward/plane.png")

    } else {
      setImageURL("/assets/reward/airplane.png")
    }
  }

  useEffect(() => {
    changeImageURL();
  }, [userInfo]);


  return (
    <div className={styles.info}>
      <div className={styles.infoTitle}>
        <p>내 정보</p>
      </div>
      <div className={styles.infoMain}>
        <div className={styles.rewardBox}>
          <div className={styles.rewardTitle}>
            <p className={styles.rewardNow}>현재 리워드</p>
            <p className={styles.rewardNum}>{userInfo.userReward}</p>
            {
              userInfo.userReward < 1500 ? (
                <p className={styles.rewardCur}>다음 단계까지 {calculateRemainingPoints(userInfo.userReward)}점 남았어요!</p>
              ) : (
                <p className={styles.rewardCur}>가장 높은 단계에 도달했어요!</p>
              )
            }
          </div>
          <div className={styles.rewardImg}>
            <img src={process.env.PUBLIC_URL + imageURL} alt="" />
          </div>
        </div>
        <div className={styles.check}>
          <p>내 정보 확인 및 수정</p>
        </div>
        <div className={styles.infoPart}>
          <div>
            <p className={styles.infoSubT}>이름</p>
            <p>{userInfo.userName}</p>
          </div>
          <div>
            <p className={styles.infoSubT}>이메일</p>
            <p>{userInfo.userEmail}</p>
          </div>
          <div>
            <p className={styles.infoSubT}>아이디</p>
            <p> { userInfo.userId.length > 12 } : {userInfo.userId} : {"네이버 로그인"}</p>
          </div>
          <div className={styles.infoSubPwd}>
            <p className={styles.infoSubT}>비밀번호</p>
            {
              clickPwdM ?
                <div className={styles.modifyPwd}>
                  <div >
                    <label htmlFor="pwd"></label>
                    <input type="password" id='pwd' placeholder='새 비밀번호를 입력하세요'
                      onChange={(e) => onChangePassword(e, setPassword, setPasswordMessage, setIsPassword)} disabled={isPasswordConfirm}/>
                    
                    <label htmlFor="pwd2"></label>
                    <input type="password" id='pwd' placeholder='비밀번호 확인'
                      onChange={(e) => onChangePasswordConfirm(e, password, setPasswordConfirm, setPasswordConfirmMessage, setIsPasswordConfirm)} disabled={isPasswordConfirm}/>
                    <p></p>
                    <span className={styles.message}> {passwordMessage} </span>
                    <span className={styles.message}> {passwordConfirmMessage} </span>
                  </div>
                  <div>
                    {isPasswordConfirm && isPassword && (
                      <button
                        onClick={async (e) => {
                          await setClickPwdM(false);
                          changeUserInfo();
                        }}
                      >
                        수정하기
                      </button>
                    )}
                    <button onClick={(e) => {setClickPwdM(false); setPasswordConfirm(false); setIsPassword(false); setIsPasswordConfirm(false)}}>취소하기</button>
                  </div>
                </div> :
                <div>
                  <p>수정 클릭 시 비밀번호 수정 창이 나타납니다.</p>
                  <button onClick={(e) => {
                    setClickPwdM(true)
                  }}>수정</button>
                </div>
            }
          </div>
          <div>
            <p className={styles.infoSubT}>전화번호</p>
            {
              clickPhoneM ?
                <div>
                  <div>
                    <label htmlFor="phone"></label>
                    <input type="text" id='phone' placeholder='새 전화번호를 입력하세요'
                      onChange={(e) => { changePhone(e.target.value) }} />
                  </div>
                  <div>
                    <button onClick={async (e) => {
                      await setClickPhoneM(false)
                      changeUserInfo()
                    }}>수정하기</button>
                    <button onClick={(e) => { setClickPhoneM(false) }}>취소하기</button>
                  </div>
                </div> :
                <div>
                  <p>{userInfo.userPhone}</p>
                  <button onClick={(e) => { setClickPhoneM(true) }}>수정</button>
                </div>
            }
          </div>
          <div className={clickInfoM ? styles.textarea : ""}>
            <p className={styles.infoSubT}>소개말</p>
            {
              clickInfoM ?
                <div>
                  <div>
                    <label htmlFor="info"></label>
                    <input type='text' name="info" id="info" placeholder='소개말을 입력하세요'
                      onChange={async (e) => {
                        await changeInfo(e.target.value)
                      }} />
                  </div>
                  <div>
                    <button onClick={(e) => { changeUserInfo() }}>수정하기</button>
                    <button onClick={(e) => { setClickInfoM(false) }}>취소하기</button>
                  </div>
                </div> :
                <div>
                  <p>{userInfo.userInfo}</p>
                  <button onClick={(e) => {setClickInfoM(true) }}>수정</button>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile