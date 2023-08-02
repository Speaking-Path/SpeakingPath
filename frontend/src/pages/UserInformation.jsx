import React, { useState, useEffect } from 'react';
import Preview from '../components/profile/Preview';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './UserInformation.module.css'
import { useMemo } from 'react';



function UserInformation() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const userId = useSelector((state) => { return state.loginId })
  const [userInfo, setUserInfo] = useState(null)
  const tokenType = localStorage.getItem('tokenType')
  const accessToken = localStorage.getItem('accessToken')

  const [isProfileClicked, setProfileClicked] = useState(false);
  const [isReservationsClicked, setReservationsClicked] = useState(false);
  const [isPastrsvClicked, setIsPastrsvClicked] = useState(false);


  const handleProfileClick = () => {
    setProfileClicked(true);
    setReservationsClicked(false);
    setIsPastrsvClicked(false)
    navigate("/account/mypage");
  };

  const handleReservationsClick = () => {
    setProfileClicked(false);
    setReservationsClicked(true);
    setIsPastrsvClicked(false)
    navigate("/account/mypage/checkrsv");
  };

  const handlePastRsvClick = () => {
    setProfileClicked(false);
    setReservationsClicked(false);
    setIsPastrsvClicked(true)
    navigate("/account/mypage/pastrsv");
  };

  // const handleMyScreen = () => {
  //   setProfileClicked(false);
  //   setReservationsClicked(false);
  //   setIsPastrsvClicked(false)
  // };





  const navigate = useNavigate()


  const handleButtonClick = () => {
    setIsPreviewOpen(true);
  }

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  }

  useMemo(() => {
    axios.post("/account/mypage",
      { userId: userId },
      {
        headers: {
          Authorization: `${tokenType} ${accessToken}`
        }
      },
    )
      .then((res) => {
        setUserInfo(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userInfo)
  return (
    <div>
      <img className={styles.mypageBanner} src={process.env.PUBLIC_URL + "/assets/mypage.png"} alt="" />
      <div className={`${styles.mypageMain} container`}>
        <div className='row'>
          <div className={`${styles.infoBox} col-3`}>
            {userInfo && userInfo.userPic !== null ?
              <img className={styles.userImg} src={process.env.PUBLIC_URL + `${userInfo.userPic}`} alt="" /> :
              <img className={styles.userImg} src={process.env.PUBLIC_URL + "/assets/user.png"} alt="" />
            }
            <div>
              <p className={styles.userInfo}><b>{userInfo && userInfo.username}</b><span>님</span></p>
              <p className={styles.userEandP}>{userInfo && userInfo.userEmail}</p>
              <p className={styles.userEandP}>{userInfo && userInfo.userPhone}</p>
            </div>
            <div>
              <p className={isProfileClicked ? styles.profileClicked : styles.profileNonClicked} onClick={handleProfileClick}><span>내 프로필</span></p>
              <p className={isReservationsClicked ? styles.profileClicked : styles.profileNonClicked} onClick={handleReservationsClick}>예정된 상담</p>
              <p className={isPastrsvClicked ? styles.profileClicked : styles.profileNonClicked} onClick={handlePastRsvClick}>지난 상담</p>
              <p className={isPreviewOpen ? styles.profileClicked : styles.profileNonClicked} onClick={handleButtonClick}>내화면보기</p>
            </div>
          </div>
          <div className='col-9'>
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