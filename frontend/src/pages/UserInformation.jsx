import React, { useState } from 'react';
import Preview from '../components/profile/Preview';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserInformation.module.css'
import { useMemo } from 'react';
import { changeProfileInfo } from '../store/profileInfo'
import { changeProfileClick } from '../store/profileInfo';
import { useEffect } from 'react';



function UserInformation() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const userId = useSelector((state) => { return state.loginId })
  // const [userInfo, setUserInfo] = useState(null)
  const userInfo = useSelector((state)=>{return state.profileInfo})
  const dispatch = useDispatch()
  const profileClicked = useSelector((state)=>{return state.profileClick})


  const tokenType = localStorage.getItem('tokenType')
  const accessToken = localStorage.getItem('accessToken')

  const [isProfileClicked, setProfileClicked] = useState(false);
  const [isReservationsClicked, setReservationsClicked] = useState(false);
  const [isPastrsvClicked, setIsPastrsvClicked] = useState(false);
  const [isCsltRsv, setIsCsltRsv] = useState(false)


  const handleProfileClick = () => {
    dispatch(changeProfileClick(0))
    navigate("/account/mypage");
  };

  const handleReservationsClick = () => {
    dispatch(changeProfileClick(1))
    navigate("/account/mypage/checkrsv");
  };

  const handlePastRsvClick = () => {
    dispatch(changeProfileClick(2))
    navigate("/account/mypage/pastrsv");
  };

  const handleCsltRsv = () => {
    dispatch(changeProfileClick(3))
    navigate("/account/mypage/consultrsv");
  };


  const navigate = useNavigate()


  const handleButtonClick = () => {
    setIsPreviewOpen(true);
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  }

  useMemo(() => {
    axios.post("/account/mypage", {userId: userId},
      {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      },
    )
      .then((res) => {
        dispatch(changeProfileInfo(res.data))
      })
      .catch((err) => {
        console.log(err); 
      });
  }, []);

  

  return (
    <div>
      <img className={styles.mypageBanner} src={process.env.PUBLIC_URL + "/assets/mypage.png"} alt="" />
      <p className={styles.notice}><span className={styles.noticeTitle}>공지</span>
      <span className={styles.noticeInfo}> 안녕하세요. 말하길입니다.</span></p>
      <div className={`${styles.mypageMain} container`}>
        <div className='row'>
          <div className={`${styles.infoBox} col-3`}>
            {userInfo && userInfo.userPic !== null ?
              <img className={styles.userImg} src={process.env.PUBLIC_URL + `${userInfo.userPic}`} alt="" /> :
              <img className={styles.userImg} src={process.env.PUBLIC_URL + "/assets/user.png"} alt="" />
            }
            <div>
              <p className={styles.userInfo}><b>{userInfo && userInfo.userName}</b><span>님</span></p>
              <p className={styles.userEandP}>{userInfo && userInfo.userEmail}</p>
              <p className={styles.userEandP}>{userInfo && userInfo.userPhone}</p>
            </div>
            <div>
              <p className={profileClicked === 0 ? styles.profileClicked : styles.profileNonClicked} onClick={handleProfileClick}><span>내 정보</span></p>
              <p className={profileClicked === 1 ? styles.profileClicked : styles.profileNonClicked} onClick={handleReservationsClick}>예정된 상담</p>
              <p className={profileClicked === 2 ? styles.profileClicked : styles.profileNonClicked} onClick={handlePastRsvClick}>지난 상담</p>
              <p className={isPreviewOpen ? styles.profileClicked : styles.profileNonClicked} onClick={handleButtonClick}>내 화면 보기</p>
              {
                userInfo && userInfo.userGrade === "CONSULTANT" ? (
                  <p className={profileClicked === 3 ? styles.profileClicked : styles.profileNonClicked} onClick={handleCsltRsv}>예약 시간 지정</p>
                ) : (
                  null
                )
              }
            </div>
          </div>
          <div className={`${styles.outletBox} col-9`}>
            <Outlet />
          </div>
        </div>
      </div>
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
      </section>
    </div>

  )
}

export default UserInformation