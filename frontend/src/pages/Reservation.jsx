import ReservationInfo from "../components/Reservation/ReservationInfo"
import styles from './Reservation.module.css'
import Calendar from './../components/Reservation/Calendar';
import { useParams } from "react-router";

function Reservation() {
  const csltid = useParams()

  return (
    <div className={`${styles.infoAndCalendar}`}>
      <img className={styles.reservationBanner}
      src={process.env.PUBLIC_URL + "/assets/write.png"} alt="" />
      <div className={styles.applystart}>
        <div className={styles.write}>
          <p className={styles.title}><span className={styles.titleinfo}>상담 신청서 작성하기</span></p>
        </div>
        <ReservationInfo />
      </div>
      <Calendar csltid={csltid} />
    </div>
  )
}

export default Reservation