import ReservationInfo from "../components/Reservation/ReservationInfo"
import styles from './Consultant.module.css'
import Calendar from './../components/Reservation/Calendar';
import { useParams } from "react-router";

function Reservation() {
  const csltid = useParams()
  
  return (
    <div className="container">
      <div className={styles.applystart}>
      <p className={styles.title}><span className={styles.titleinfo}>상담 신청서 작성하기</span></p>
      <ReservationInfo/>
      </div>
      <Calendar csltid={csltid}/>
    </div>
  )
}

export default Reservation