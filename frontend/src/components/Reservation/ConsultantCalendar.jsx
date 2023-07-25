// import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from './Calendar.module.css'
import axios from 'axios';


function RevCalendar() {
  const [selected, setSelected] = useState()
  const timesList = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]


  const [timeSelected, setTimeSelected] = useState({
    year: null,
    month: null,
    day: null,
    times: []
  })

  const selectTime = (checked, time) => {
    if (checked) {
      setTimeSelected({
        ...timeSelected,
        times: [...timeSelected.times, time]
      })
    } else {
      setTimeSelected({
        ...timeSelected,
        times: timeSelected.times.filter((el) => el !== time)
      })
    }
  }

  const handleDayClick = (date) => {
    if (selected?.toDateString() === date.toDateString()) {
      setSelected(null)
      setTimeSelected({
        ...timeSelected,
        year: null,
        month: null,
        day: null,
        times: []
      })
    } else {
      setSelected(date)
      setTimeSelected({
        ...timeSelected,
        times: []
      })
    }
  }

  const onReserv = function () {
    console.log(timeSelected)
    if (timeSelected.year && timeSelected.month &&
      timeSelected.day && timeSelected.times.length) {
      const reservationData = {
        year: timeSelected.year,
        month: timeSelected.month,
        day: timeSelected.day,
        times: timeSelected.times
      }
      // 주소입력
      axios.post("", reservationData)
      .then((res)=> {
        alert("예약이 완료되었습니다.")
      })
      .catch((err)=>{
        console.log(err)
      })
    } else {
      alert("날짜와 시간을 선택해주세요.")
    }
  }


  useEffect(() => {
    if (selected) {
      setTimeSelected({
        ...timeSelected,
        year: selected.getFullYear(),
        month: selected.getMonth(),
        day: selected.getDate()
      })
    } else {
      setTimeSelected({
        ...timeSelected,
        times: []
      })
    }
  }, [selected])

  return (
    <div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        locale={ko}
        onDayClick={handleDayClick}
      />
      <div>
        {
          timesList.map((time, index) => {
            return (
              <div key={index}>
                <input type="checkbox" name="times" id={index} value={index}
                  checked={timeSelected.times.includes(time)}
                  onChange={(e) => {
                    selectTime(e.currentTarget.checked, time)
                  }} />
                <label htmlFor={index}>{time}</label>
              </div>
            )
          })
        }
      </div>
      <button onClick={onReserv}>시간 설정하기</button>
    </div>
  )
}

export default RevCalendar