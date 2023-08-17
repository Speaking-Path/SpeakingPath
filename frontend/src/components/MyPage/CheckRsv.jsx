import axios from "axios";
import { useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./CheckRsv.module.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function CheckRsv() {
  const userId = useSelector((state) => { return state.loginId })
  const userInfo = useSelector((state) => { return state.profileInfo })
  // const [userInfo, setUserInfo] = useState(null)

  const navigate = useNavigate()

  const tokenType = localStorage.getItem('tokenType')
  const accessToken = localStorage.getItem('accessToken')

  const [upcomingRsv, setUpcomingRsv] = useState([])




  useEffect(() => {

    if (userInfo && userInfo.userGrade === "USER") {
      axios.post("/cslting/upcomingrsv", null, { params: { userId: userInfo.userId } }
      )
        .then((res) => {
          setUpcomingRsv(res.data)
        })
        .catch((err) => {
          // console.log(err)
        });
    } else {
      axios.post("/cslting/upcomingrsvcslt", null, { params: { csltId: userInfo.userId } }
      )
        .then((res) => {
          setUpcomingRsv(res.data)
        })
        .catch((err) => {
          // console.log(err)
        });
    }
  }, []);

  upcomingRsv.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    if (a.month !== b.month) {
      return a.month - b.month;
    }
    if (a.day !== b.day) {
      return a.day - b.day;
    }

    return a.time.localeCompare(b.time);
  });


  const groupedByYear = upcomingRsv.reduce((acc, current) => {
    const { year } = current;

    if (!acc[year]) {
      acc[year] = { year, data: [current] };
    } else {
      acc[year].data.push(current);
    }
    return acc;
  }, {});

  const results = Object.values(groupedByYear);


  const rsvCancel = function(id) {
    if (userInfo) {
      axios.get("/cslting/cancelrsv", {params: {id: id}}
      )
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => {
          // console.log(err)
        });
    }
  }
  
  const rsvComplete = function(id) {
    if (userInfo) {
      axios.get("/cslting/approversv", {params: {id: id}}
      )
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => {
          // console.log(err)
        });
    }
  }

  const rsvReject = function(id) {
    if (userInfo) {
      axios.get("/cslting/declinersv", {params: {id: id}}
      )
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => {
          // console.log(err)
        });
    }
  }

  const joinMeeting = function (item) {
    navigate("/consulting/meeting", {
      state: {
        sessionId: item.rsvCode
      }
    })
  }

  const shouldShowJoinButton = function (item) {
    const currentTime = new Date();
    const [hour, minute] = item.time.split(":");
    const rsvTime = new Date(item.year, item.month, item.day, hour, minute);
  
    const timeDifference = rsvTime - currentTime; 
    const minutesDifference = timeDifference / (1000 * 60); 
  
    // return minutesDifference <= 10;
    return true
  }

  return (
    <div>
      <div className={styles.titleBox}>
        <p className={styles.boxTitle}>예정된 상담</p>
        <p className={styles.csltInfo}>상담은 10분 전부터 입장 가능합니다.</p>
      </div>
      {
        results.length > 0 ?
      <div className={styles.rsvListBox}>
        {results.map(({ year, data }) => (
          <div key={year} className={styles.yearBox}>
            <p>{year}년</p>
            <div className={styles.dayListBox}>
              {data.map((item, index) => (
                <div className={styles.dayBox} key={index}>
                  <div className={styles.dayBoxMain}>
                    <div>
                      {item.rsvStatus ==="예약대기" ? <p className={styles.waiting}>예약대기</p> : null}
                      {item.rsvStatus ==="예약확정" ? <p className={styles.complete}>예약확정</p> : null}
                      {item.rsvStatus ==="예약거절" ? <p className={styles.reject}>예약거절</p> : null}
                      {item.rsvStatus ==="예약취소" ? <p className={styles.cancel}>예약취소</p> : null}
                    </div>
                    <div className={styles.resDay}>
                      <p className={styles.dayDesc}>상담 예약 날짜</p>
                      <p className={styles.dayDay}>{item.month + 1}월 {item.day}일 {item.time}</p>
                    </div>
                    {
                      userInfo.userGrade === "USER" ?
                        <div>
                          <p className={styles.csltName}>상담사 <span>{item.cslTName}</span></p>
                        </div> :
                        <div>
                          <p className={styles.csltName}>내담자 <span>{item.userName}</span></p>
                          <p className={styles.reason}>신청 사유</p>
                          <p className={styles.reasonInfo}>{item.rsvInfo}</p>
                        </div>
                    }
                  </div>
                  <div className={styles.btnBox}>
                    {
                      userInfo.userGrade === "USER" && item.rsvStatus ==="예약대기" ?
                      <button className={styles.redBtn} onClick={()=>{rsvCancel(item.id)}}>예약취소</button> :
                      null
                    }
                    {
                      userInfo.userGrade === "CONSULTANT" && item.rsvStatus ==="예약대기" ?
                      <div>
                      <button className={styles.blueBtn} onClick={()=>{rsvComplete(item.id)}}>예약승인</button>
                      <button className={styles.redBtn} onClick={()=>{rsvReject(item.id)}}>예약거절</button>
                      </div> :
                      null
                    }
                    {
                      item.rsvStatus ==="예약확정" ?
                      <div>
                        {
                          shouldShowJoinButton(item) ?
                          <button className={styles.blueBtn} onClick={() => { joinMeeting(item) }}>입장하기</button> :
                          null
                        }
                      <button className={styles.redBtn} onClick={()=>{rsvCancel(item.id)}}>예약취소</button>
                      </div> :
                      null
                    }
                    {
                      item.rsvStatus ==="예약취소" ?
                      <p className={styles.cancelMsg}>취소된 예약입니다.</p> :
                      null
                    }
                    {
                      item.rsvStatus ==="예약거절" ?
                      <p className={styles.rejectMsg}>진행되지 못한 예약입니다.</p> :
                      null
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div> : (
        <p className={styles.none}>예정된 예약이 없습니다.</p>
      )
      }
    </div>
  )
}

export default CheckRsv