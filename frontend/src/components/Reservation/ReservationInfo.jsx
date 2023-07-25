import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import styles from './ReservationInfo.module.css'
import ReservationStep from './ResvervationStep';
import { useSelector, useDispatch } from 'react-redux';
import { changeNum } from '../../store/Reservation';



function ReservationInfo() {
  const steps = [
    '예약 가능 일정 확인',
    '예약 신청하기',
    '예약 확정',
    '상담 진행',
  ];

  
  const stepNum = useSelector((state)=> {return state.stepNum})
  const dispatch = useDispatch()

  return (
    <div className={styles.box}>
      <div>
      <Box  sx={{ width: '100%' }}>
        <Stepper activeStep={stepNum} alternativeLabel>
          {steps.map((label, index) => (
            <Step onClick={()=>{dispatch(changeNum(index))}} key={label}>
              <StepLabel>
                <div>
                  <p>{label}</p>
                </div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      </div>
      <ReservationStep stepNum={stepNum}/>
    </div>
  )
}

export default ReservationInfo