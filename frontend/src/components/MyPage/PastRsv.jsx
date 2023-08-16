import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./PastRsv.module.css"
import { changeCsltInfo } from "../../store/consultantInfo"
import { changeCsltTimes } from "../../store/consultantTimes"
import { useNavigate } from "react-router-dom"


function PastRsv() {

  const userId = useSelector((state) => { return state.loginId })
  const userInfo = useSelector((state) => { return state.profileInfo })
  // const [userInfo, setUserInfo] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const tokenType = localStorage.getItem('tokenType')
  const accessToken = localStorage.getItem('accessToken')

  const [pastRsv, setPastRsv] = useState([])

  useEffect( () => {

    if (userInfo && userInfo.userGrade === "USER") {
      axios.post("/cslting/pastrsv", null, { params: { userId: userInfo.userId } }
      )
        .then((res) => {
          setPastRsv(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios.post("/cslting/pastrsvcslt", null, { params: { csltId: userInfo.userId } }
      )
        .then((res) => {
          setPastRsv(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  pastRsv.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    if (a.month !== b.month) {
      return b.month - a.month;
    }
    if (a.day !== b.day) {
      return b.day - a.day;
    }

    return b.time.localeCompare(a.time);
  });


  const groupedByYear = pastRsv.reduce((acc, current) => {
    const { year } = current;

    if (!acc[year]) {
      acc[year] = { year, data: [current] };
    } else {
      acc[year].data.push(current);
    }
    return acc;
  }, {});

  const results = Object.values(groupedByYear);

  const reRsv = async (csltId) =>{
    await axios.post("/cslt/showcslt", {userId: csltId},
    {
      headers: {
        Authorization: `${tokenType} ${accessToken}`
      }
    },
  )
    .then((res) => {
      dispatch(changeCsltInfo(res.data))
      const data = {
        userId: csltId
      }
      axios.get("/sche", data)
        .then((res) => {
          dispatch(changeCsltTimes(res.data))
        })
        .catch((err) => {
        })
      navigate("/consulting/reservation")
    })
    .catch((err) => {
      console.log(err); 
    });
  }

  return(
    <div>
     <div className={styles.titleBox}>
        <p>지난 상담</p>
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
                    <div className={styles.resDay}>
                      <p className={styles.dayDesc}>상담 날짜</p>
                      <p className={styles.dayDay}>{item.month+1}월 {item.day}일 {item.time}</p>
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
                      userInfo.userGrade === "CONSULTANT" ?
                      <p>상담 완료</p> :
                      <button onClick={()=>{reRsv(item.csltId)}}>다시 예약하기</button>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div> :
      <p className={styles.none}>상담 기록이 없습니다.</p>
      }
    </div>
  )
}

export default PastRsv