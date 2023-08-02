import React, { useState, useEffect } from 'react';
import Preview from '../components/profile/Preview';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './UserInformation.module.css'



function UserInformation() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const userId = useSelector((state)=>{return state.loginId})
  const [userInfo, setUserInfo] = useState(null)
  const tokenType = localStorage.getItem('tokenType')
  const accessToken = localStorage.getItem('accessToken')

  const navigate = useNavigate()


  const handleButtonClick = () => {
    setIsPreviewOpen(true);
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  }

  useEffect(() => {
    axios.post("/account/mypage", 
    {userId : userId},
    {
      headers : {
        Authorization : `${tokenType} ${accessToken}`
      }
    },
    )
      .then((res) => {
        console.log(res.data)
        setUserInfo(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); 

  return (
    <div>
      <section>
        {isPreviewOpen && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
            <Preview isOpen={isPreviewOpen} onClose={handleClosePreview} size="large">
              <div>
                <h2 className='mb-0'>화면 미리보기</h2>
                {/* <p>내용</p> */}
              </div>
            </Preview>
          </div>
        )}
        <button type="button" className="btn btn-outline-primary ms-1" onClick={handleButtonClick}>내화면보기</button>
      </section>
      <div className='container'>
        <div className='row'>
        <div className='col-3'>
          { userInfo && userInfo.userPic !== null ?
            <img className={styles.userImg} src={process.env.PUBLIC_URL + `${userInfo.userPic}`} alt="" /> :
            <img className={styles.userImg} src={process.env.PUBLIC_URL + "/assets/user.png"} alt="" /> 
          }
          {/* <p>{userInfo.userName}</p> */}
          <p></p>
          <div>
            <p onClick={navigate("/account/mypage")}>내 프로필 </p>
            <p onClick={navigate("/account/mypage/checkrsv")}>내 예약 확인하기</p>
          </div>
        </div>
        <div className='col-9'>
          <Outlet/>
        </div>
      </div>
      </div>
    </div>

  )
}

export default UserInformation