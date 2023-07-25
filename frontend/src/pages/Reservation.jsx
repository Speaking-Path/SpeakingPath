import ReservationInfo from "../components/Reservation/ReservationInfo"
import styles from './Consultant.module.css'
import RevCalendar from './../components/Reservation/Calendar';

function Reservation() {
  return (
    <div className="container">
      <div className={styles.applystart}>
      <p className={styles.title}><span className={styles.titleinfo}>상담 신청서 작성하기</span></p>
      <ReservationInfo/>
      </div>
      <RevCalendar/>
    </div>
  )
}

export default Reservation