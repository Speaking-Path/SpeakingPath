import React, { useEffect } from "react";
import ReservationInfo from "../components/Reservation/ReservationInfo"
import styles from './Reservation.module.css'
import Calendar from './../components/Reservation/Calendar';
import { useParams, useNavigate } from "react-router-dom";

function Reservation() {
  const csltid = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const userInfo = localStorage.getItem("accessToken");
    if (!userInfo) {
      navigate("/account/login"); // userInfo가 없으면 로그인 페이지로 이동
    } 
  }, [navigate]);

  return (
    <div className={`${styles.infoAndCalendar}`}>
      <img className={styles.reservationBanner}
      src={process.env.PUBLIC_URL + "/assets/write.png"} alt="" />
      <div className={styles.applystart}>
        {/* <div className={styles.write}>
          <p className={styles.title}><span className={styles.titleinfo}>상담 신청서 작성하기</span></p>
        </div> */}
        <ReservationInfo />
      </div>
      <Calendar csltid={csltid} />
    </div>
  )
}

export default Reservation