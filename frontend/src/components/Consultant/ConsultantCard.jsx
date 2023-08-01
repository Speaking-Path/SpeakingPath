import { useEffect, useState } from "react"
import styles from "./ConsultantCard.module.css"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { changeCsltInfo } from "../../store/consultantInfo"
import axios from "axios"
import { changeCsltTimes } from "../../store/consultantTimes"


function ConsultantCard({ consultant }) {
  const dispatch = useDispatch()

  const [imgsrc, setImgsrc] = useState("/assets/user.png")
  const navigate = useNavigate()

  const goRev = async () => {
    await dispatch(changeCsltInfo(consultant))
    const data = {
      userId : consultant.userId
    }
    await axios.get("/sche", data)
    .then((res) => {
      dispatch(changeCsltTimes(res.data))
      console.log(res.data)
    })
    .catch((err) => {
    })
    navigate("/consulting/reservation")
  }

  useEffect(() => {
    if (consultant.userPic) {
      setImgsrc(consultant.userPic)
    }
  }, [])

  return (
    <div className={styles.csltCard}>
      <div className={styles.cardBox}>
        <div className={styles.profileBox}>
          <img className={styles.profile} src={process.env.PUBLIC_URL + imgsrc} alt="" />
        </div>
        <div>
          <div className={styles.nameAndExp}>
            <span className={styles.name}>{consultant.userName}</span>
            {consultant.csltExp <= 3 && <span className={styles.exp}>수련 치료사</span>}
            {consultant.csltExp > 3 && consultant.csltExp <= 5 && <span className={styles.exp}>전문 치료사</span>}
            {consultant.csltExp > 5 && consultant.csltExp <= 10 && <span className={styles.exp}>프로 치료사</span>}
            {consultant.csltExp > 10 && <span className={styles.exp}>마스터 치료사</span>}
          </div>
          <div className={styles.team}>
            <p>{consultant.csltTeam}</p>
          </div>
          <div className={styles.boundary}>
            <div className={styles.boundaryTitle}>
              <span>치료 가능 영역&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
            <div>
              {
                consultant.csltBoundary.map((boundary, index) => {
                  return (
                    <span key={index}>#{boundary} </span>
                  )
                })
              }
            </div>
          </div>
          <div className={styles.tag}>
            <div>
              <p>성향</p>
            </div>
            <div>
                {
                  consultant.csltTag.map((tag, index) => {
                    return (
                        <span key={index}>{tag}</span>
                    )
                  })
                }
            </div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={goRev}>상담 신청</button>
      </div>
    </div>
  )
}

export default ConsultantCard