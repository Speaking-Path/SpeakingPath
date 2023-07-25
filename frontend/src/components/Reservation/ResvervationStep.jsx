import { useSelector } from 'react-redux'
import styles from './ReservationStep.module.css'

function ReservationStep(props) {
  const stepNum = useSelector((state) => { return state.stepNum })

  return (
    <div className={styles.info}>
      {stepNum === 0 &&
        <div className='row'>
          <div className='col-5'>
            <p><span>1단계</span><span>일정 확인</span></p>
            <p>달력을 보고 상담을 받고 싶은 날짜와 시간을 선택합니다.</p>
          </div>
          <div className='col-7'>
            <img className={styles.consultingimg} src={process.env.PUBLIC_URL + "/assets/finddate.png"} alt="" />
          </div>
        </div>}
      {stepNum === 1 &&
        <div className='row'>
          <div className='col-5'>
          <p><span>2단계</span><span>예약 신청</span></p>
          <p>시간과 상담 날짜 확인 후 예약을 신청합니다.</p>
          </div>
          <div className='col-7'>
          <img className={styles.consultingimg} src={process.env.PUBLIC_URL + "/assets/checkdate.png"} alt="" />
          </div>
        </div>}
      {stepNum === 2 &&
        <div className='row'>
          <div className='col-5'>
          <p><span>3단계</span><span>예약 확정</span></p>
          <p>상담사가 일정을 확인한 후 예약이 확정됩니다.</p>
          </div>
          <div className='col-7'>
          <img className={styles.consultingimg} src={process.env.PUBLIC_URL + "/assets/confirm.png"} alt="" />
          </div>
        </div>}
      {stepNum === 3 &&
        <div className='row'>
          <div className='col-5'>
          <p><span>4단계</span><span>상담 진행</span></p>
          <p>예약 시간에 맞춰 비대면으로 상담을 진행합니다.</p>
          </div>
          <div className='col-7'>
          <img className={styles.consultingimg} src={process.env.PUBLIC_URL + "/assets/consulting.png"} alt="" />
          </div>
        </div>}
    </div>
  )
}

export default ReservationStep