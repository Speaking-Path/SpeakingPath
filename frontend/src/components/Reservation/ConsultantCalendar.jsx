// 컨설턴트가 본인 상담시간 결정하는 컴포넌트


import { DayPicker } from "react-day-picker"
import { ko } from "date-fns/locale"
import { useState, useEffect } from "react"
import "./Calendar.css"
import axios from "axios"
import { addDays } from "date-fns"
import { useSelector } from "react-redux"


function CsltCalendar() {
  // const [selected, setSelected] = useState()
  const timesList = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
  const [revTime, setRevTime] = useState([])

  const [timeSelected, setTimeSelected] = useState([])
  const csltId = useSelector((state)=>{return state.loginId})


  const today = new Date()


  const defaultSelected = {
    from: new Date(),
    to: addDays(new Date(), 4)
  };

  const [range, setRange] = useState(defaultSelected);


  useEffect(() => {
    if (range != undefined) {
      if (range.from && !range.to) {
        // range의 from만 존재하는 경우
        setTimeSelected([])
        const year = range.from.getFullYear()
        const month = range.from.getMonth()
        const day = range.from.getDate()
        setTimeSelected([{
          years: year,
          months: month,
          days: [day]
        }])

      } else if (range.from && range.to) {
        setTimeSelected([])
        const fromYear = range.from.getFullYear()
        const toYear = range.to.getFullYear()
        const fromMonth = range.from.getMonth()
        const toMonth = range.to.getMonth()
        const fromDate = range.from.getDate()
        const toDate = range.to.getDate()

        if (fromYear === toYear && fromMonth === toMonth) {
          const days = Array.from(
            { length: toDate - fromDate + 1 },
            (_, index) => fromDate + index
          )
          setTimeSelected([{
            year: fromYear,
            month: fromMonth,
            day: days
          }])
        } else if (fromYear === toYear && fromMonth !== toMonth) {
          let currentYear = fromYear;
          let currentMonth = fromMonth;
          let currentDate = new Date(currentYear, currentMonth, fromDate);

          while (
            currentYear < toYear ||
            (currentYear === toYear && currentMonth <= toMonth)
          ) {
            // 해당 월의 마지막 날짜를 구함
            const lastDayOfMonth = new Date(
              currentYear,
              currentMonth + 1,
              0
            ).getDate();

            // 선택한 마지막 달이면 해당 월의 마지막 날짜까지만 포함
            const days = (currentYear === toYear && currentMonth === toMonth)
              ? Array.from(
                { length: toDate - currentDate.getDate() + 1 },
                (_, index) => currentDate.getDate() + index
              )
              : Array.from(
                { length: lastDayOfMonth - currentDate.getDate() + 1 },
                (_, index) => currentDate.getDate() + index
              );

            // 월별로 날짜들을 저장하는 배열에 추가
            const data = {
              year: currentYear,
              month: currentMonth,
              days: days
            }

            setTimeSelected((timeSelected) => {
              return [...timeSelected, data]
            })

            // 다음 월로 이동
            currentMonth += 1;
            if (currentMonth > 11) {
              currentMonth = 0;
              currentYear += 1;
            }
            currentDate = new Date(currentYear, currentMonth, 1);
          }
        } else if (fromYear !== toYear && fromMonth !== toMonth) {
          setTimeSelected([])
          // 3. 연, 월이 다를 경우
          const allMonthsDays = [];
          let currentYear = fromYear;
          let currentMonth = fromMonth;
          let currentDate = new Date(currentYear, currentMonth, fromDate);

          while (
            currentYear < toYear ||
            (currentYear === toYear && currentMonth <= toMonth)
          ) {
            // 해당 월의 마지막 날짜를 구함
            const lastDayOfMonth = new Date(
              currentYear,
              currentMonth + 1,
              0
            ).getDate();

            // 해당 월의 날짜들로 배열 생성
            const days = (currentYear === toYear && currentMonth === toMonth)
              ? Array.from(
                { length: toDate - currentDate.getDate() + 1 },
                (_, index) => currentDate.getDate() + index
              )
              : Array.from(
                { length: lastDayOfMonth - currentDate.getDate() + 1 },
                (_, index) => currentDate.getDate() + index
              );

            // 월별로 날짜들을 저장하는 배열에 추가
            const data = {
              year: currentYear,
              month: currentMonth,
              days: days
            }

            setTimeSelected((timeSelected) => {
              return [...timeSelected, data]
            })

            // 다음 월로 이동
            currentMonth += 1;
            if (currentMonth > 11) {
              currentMonth = 0;
              currentYear += 1;
            }
            currentDate = new Date(currentYear, currentMonth, 1);
          }
        } else if (fromYear === toYear && fromMonth === toMonth && fromDate === toDate) {
          setTimeSelected([])
          const data = {
            year: fromYear,
            month: fromMonth,
            days: [fromDate]
          }
          setTimeSelected(data)
        }
      }
    } else { 
      setTimeSelected([])
    }
  }, [range])


  const selectTime = (checked, time) => {
    if (checked) {
      setRevTime([...revTime, time])
    } else {
      setRevTime(revTime.filter((el) => el !== time))
    }
  }


  const onReserv = function () {
    if (timeSelected && revTime.length) {
      const data = {
        timeSelected,
        times : revTime,
        csltId
      }
      setRange()
      setRevTime([])
      console.log(data)
      axios.post("/cslting/addsche", data)
        .then((res) => {
          alert("상담 시간 선택이 완료되었습니다.")
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      alert("날짜와 시간을 선택해주세요.")
    }
  }




  return (
    <div>
      <DayPicker
        mode="range"
        locale={ko}
        // onDayClick={handleDayClick}
        disabled={{ before: new Date() }}
        defaultMonth={new Date()}
        selected={range}
        showOutsideDays
        onSelect={setRange}
      />
      <div>
        {
          timesList.map((time, index) => {
            return (
              <div key={index}>
                <input type="checkbox" name="times" id={index} value={index}
                  checked={revTime.includes(time)}
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