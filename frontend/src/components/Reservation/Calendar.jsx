// 유저가 상담 예약하는 컴포넌트



import axios from "axios"
import { isSameDay } from "date-fns"
import { ko } from "date-fns/locale"
import { useState, useEffect } from "react"
import { DayPicker } from "react-day-picker"
import "./Calendar.css"
import { useSelector } from "react-redux"
import styles from "./Calendar.module.css"
import { format } from "date-fns"
import { useRef } from "react"


function RevCalendar() {
  const selectedCsltInfo = useSelector((state) => { return state.selectedCsltInfo })
  const userId = useSelector((state) => { return state.loginId })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [rsvInfo, setRsvInfo] = useState("")

  const outside = useRef()

  const [selected, setSelected] = useState()
  const timesList = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  const [timeSelected, setTimeSelected] = useState({
    userId: userId,
    year: null,
    month: null,
    day: null,
    time: null,
  })

  const [dayOfWeek, setDayOfWeek] = useState()
  const dayList = ["일", "월", "화", "수", "목", "금", "토"]

  const [days, setDays] = useState([])

  const excludedDates = days.map(({ year, month, day }) =>
    new Date(year, month, day))

  const isDateExcluded = (date) => {
    return !excludedDates.some((excludedDate) => isSameDay(date, excludedDate))
  }

  const isTimeExcluded = (time) => {
    const selectedDate = new Date(selected)
    const selectedYear = selectedDate.getFullYear()
    const selectedMonth = selectedDate.getMonth()
    const selectedDay = selectedDate.getDate()

    const filteredDays = days.filter(({ year, month, day }) =>
      year === selectedYear && month === selectedMonth && day === selectedDay
    )

    const timesArray = filteredDays.map(({ time }) => time)
    const availableTimes = [].concat.apply([], timesArray)

    return !availableTimes.includes(time)
  }

  const selectTime = (checked, time) => {
    if (checked) {
      setTimeSelected({
        ...timeSelected,
        time: time
      })
    } else {
      setTimeSelected({
        ...timeSelected,
        time: null,
      })
    }
  }

  useEffect(() => {
    axios.get("/cslting/sche", {params : {"userId" : selectedCsltInfo.userId}})
      .then((res) => {
        console.log(res.data)
        setDays(res.data.dtos)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleDayClick = (date) => {
    if (selected?.toDateString() === date.toDateString()) {
      setSelected(null)
      setTimeSelected({
        ...timeSelected,
        year: null,
        month: null,
        day: null,
        time: null,
      })
    } else {
      setSelected(date)
      setTimeSelected({
        ...timeSelected,
        time: null
      })
    }
  }

  const onReserv = function () {
    if (timeSelected.year && timeSelected.month &&
      timeSelected.day && timeSelected.time) {
      const reservationData = {
        year: timeSelected.year,
        month: timeSelected.month,
        day: timeSelected.day,
        time: timeSelected.time,
        userId: userId,
        rsvInfo: rsvInfo,
        csltId: selectedCsltInfo.userId,
      }
      console.log(reservationData)
      // 주소입력
      axios.post("/cslting/addrsv", reservationData)
        .then((res) => {
          alert("예약이 완료되었습니다.")
          window.location.reload()
          setIsModalVisible(!isModalVisible)
        })
        .catch((err) => {
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
      setDayOfWeek(selected.getDay())
    } else {
      setTimeSelected({
        ...timeSelected,
        time: null,
      })
    }
  }, [selected])

  const changeRsvInfo = (value) => {
    setRsvInfo(value)
  }


  return (
    <div className={`${styles.calendar} container`}>
      <div className={`${styles.calendarTop} row`}>
        <div className={`${styles.calendarCsltInfo} col-3`}>
          <p className={styles.profileTitle}>선택한 치료사</p>
          {selectedCsltInfo.userPic ? (
            <img className={styles.profile} src={process.env.PUBLIC_URL + `${selectedCsltInfo.userPic}`} alt="" />
          ) : (
            <img className={styles.profile} src={process.env.PUBLIC_URL + "/assets/user.png"} alt="" />

          )}
          <p className={styles.name}>{selectedCsltInfo.userName}</p>
          <p className={styles.desc}>소속</p>
          <p>{selectedCsltInfo.csltTeam}</p>
          <p className={styles.desc}>전문 분야</p>
          <div className={styles.boundarys}>
            {
              selectedCsltInfo.csltBoundary.map((boundary, index) => (
                <span key={index}>{boundary} </span>
              ))
            }
          </div>
          <p className={styles.desc}>소개말</p>
          <p>{selectedCsltInfo.userInfo}</p>
          <p className={styles.desc}>연락처</p>
          <p>{selectedCsltInfo.userEmail}</p>
          <p>{selectedCsltInfo.userPhone}</p>
        </div>
        <div className={`${styles.calendarMain} col-6`}>
          <p className={styles.selectDayMsg}>상담 날짜 선택</p>
          <DayPicker className={styles.calendarPick}
            mode="single"
            selected={selected}
            onSelect={setSelected}
            locale={ko}
            disabled={isDateExcluded}
            onDayClick={handleDayClick}
            showOutsideDays
          />
        </div>
        <div className={`${styles.selectTime} col-3`}>
          <p className={styles.selectTimeMsg}>시간 선택</p>
          <div>
            {
              timeSelected.year ? (
                <div>
                  <p className={styles.dateNow}>{timeSelected.year}년 {timeSelected.month + 1}월 {timeSelected.day}일 ({dayList[dayOfWeek]})</p>
                  <div className={styles.dateBox}>
                    {
                      timesList.map((time, index) => {
                        return (
                          <div className={styles.labelAndInput} key={index}>
                            <input className={styles.input} type="checkbox" name="times" id={time} value={index}
                              checked={timeSelected.time === time}
                              disabled={isTimeExcluded(time)}
                              onChange={(e) => {
                                selectTime(e.currentTarget.checked, time)
                              }} />
                            <label className={styles.label} htmlFor={time}>{time}</label>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              ) : (
                <div className={styles.selDateWarning}>
                  <p>날짜를 선택해주세요</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <button onClick={(e) => { setIsModalVisible(!isModalVisible) }} className={`${styles.revButton} ${styles.btnFloat}`}>예약하기</button>
      <div>
        {
          isModalVisible ? (
            <div ref={outside} className={styles.rsvModal}
              onClick={(e) => { if (e.target == outside.current) setIsModalVisible(!isModalVisible) }}>
              <div className={styles.rsvModalMain}>
                <div className={styles.revReason}>
                  <img src={process.env.PUBLIC_URL + "/assets/modallogo.png"}
                    className={styles.img} alt="" />
                    <div className={styles.reasonInfo}>
                  <p>상담 신청 사유를 입력해주세요.</p>
                  <p>(10자 이내)</p>
                  </div>
                  <input className={styles.reasonInput} type="text" id="rsvInfo" placeholder="신청 사유"
                  onChange={(e) => { changeRsvInfo(e.target.value) }} />
                  <label className={styles.reasonLabel} htmlFor="rsvInfo"></label>
                  <span className={styles.reasonSpan}></span>
                </div>
                <div className={styles.btn}>
                  <div onClick={onReserv} className={styles.submit}>
                    신청하기</div>
                  <div onClick={(e) => { setIsModalVisible(!isModalVisible) }} className={styles.cancel}>
                    취소하기</div>
                </div>
              </div>
            </div>
          ) : (
            null
          )
        }
      </div>
    </div>
  )
}

export default RevCalendar