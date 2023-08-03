import axios from "axios";
import { useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./CheckRsv.module.css"
import { useEffect } from "react";

function CheckRsv() {
  const userId = useSelector((state) => { return state.loginId })
  const userInfo = useSelector((state) => { return state.profileInfo })
  // const [userInfo, setUserInfo] = useState(null)


  const tokenType = localStorage.getItem('tokenType')
  const accessToken = localStorage.getItem('accessToken')

  const [upcomingRsv, setUpcomingRsv] = useState([])




  useEffect( () => {

    if (userInfo && userInfo.userGrade === "USER") {
      axios.post("/cslting/upcomingrsv", null, { params: { userId: userInfo.userId } }
      )
        .then((res) => {
          setUpcomingRsv(res.data)
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.post("/cslting/upcomingrsv", null, { params: { userId: userInfo.userId } }
      )
        .then((res) => {
          setUpcomingRsv(res.data)
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
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



  return (
    <div>
      <div className={styles.titleBox}>
        <p>예정된 상담</p>
      </div>
      <div className={styles.rsvListBox}>
        {results.map(({ year, data }) => (
          <div key={year} className={styles.yearBox}>
            <p>{year}년</p>
            <div className={styles.dayListBox}>
              {data.map(item => (
                <div className={styles.dayBox} key={`${item.year}-${item.month}-${item.day}`}>
                  <div className={styles.dayBoxMain}>
                    <div>
                      <p className={styles.result}>예약확정들어갈곳</p>
                    </div>
                    <div className={styles.resDay}>
                      <p className={styles.dayDesc}>상담 예약 날짜</p>
                      <p className={styles.dayDay}>{item.month+1}월 {item.day}일 {item.time}</p>
                    </div>
                      <p className={styles.csltName}>상담사 <span>{item.cslTName}</span></p>
                  </div>
                  <div className={styles.btnBox}>
                    <button>입장하기</button>
                    <button>예약취소</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CheckRsv