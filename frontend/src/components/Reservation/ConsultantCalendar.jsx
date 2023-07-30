// 컨설턴트가 본인 상담시간 결정하는 컴포넌트


import { ko } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import './Calendar.css'
import axios from 'axios';


function CsltCalendar() {
  const [selected, setSelected] = useState()
  const timesList = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  const [timeSelected, setTimeSelected] = useState({
    year: null,
    month: null,
    day: null,
    times: []
  })


  const today = new Date()

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
    if (timeSelected.year && timeSelected.month &&
      timeSelected.day && timeSelected.times.length) {
      const data = timeSelected.times.map((time) => {
        return {
          year: timeSelected.year,
          month: timeSelected.month,
          day: timeSelected.day,
          time: time,
        };
      });
      axios.post("", data)
      .then((res)=> {
        alert("상담 시간 선택이 완료되었습니다.")
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
        disabled= {{ before: new Date() }}
        showOutsideDays
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

export default CsltCalendar