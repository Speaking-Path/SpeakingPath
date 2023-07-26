import axios from 'axios';
import { isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


function RevCalendar() {
  const [selected, setSelected] = useState()
  const timesList = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  const [timeSelected, setTimeSelected] = useState({
    year: null,
    month: null,
    day: null,
    times: []
  })

  const days = [
    {
      year: 2023,
      month: 6,
      day: 23,
      times: ["09:00", "10:00"]
    },
    {
      year: 2023,
      month: 6,
      day: 25,
      times: ["09:00", "11:00", "13:00", "14:00"]
    }
  ]

  const excludedDates = days.map(({ year, month, day }) =>
    new Date(year, month, day))

  const isDateExcluded = (date) => {
    return !excludedDates.some((excludedDate) => isSameDay(date, excludedDate))
  }

  const isTimeExcluded = (time) => {
    return selected && days.some(({ year, month, day, times }) => {
      return isSameDay(selected, new Date(year, month, day)) && !times.includes(time)
    })
  }

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
    console.log(timeSelected)
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
    console.log(timeSelected)
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
        disabled={isDateExcluded}
        onDayClick={handleDayClick}
      />
      <div>
        {
          timesList.map((time, index) => {
            return (
              <div key={index}>
                <input type="checkbox" name="times" id={index} value={index}
                  checked={timeSelected.times.includes(time)}
                  disabled={isTimeExcluded(time)}
                  onChange={(e) => {
                    selectTime(e.currentTarget.checked, time)
                  }} />
                <label htmlFor={index}>{time}</label>
              </div>
            )
          })
        }
      </div>
      <button onClick={onReserv}>예약하기</button>
    </div>
  )
}

export default RevCalendar