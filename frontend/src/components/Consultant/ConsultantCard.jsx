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
      userId: consultant.userId
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
          <img className={styles.profileImage} src={process.env.PUBLIC_URL + imgsrc} alt="" />
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.nameAndExp}>
            <p className={styles.userName}>{consultant.userName}</p>
            {consultant.csltExp <= 3 && <p className={styles.exp}>수련 치료사</p>}
            {consultant.csltExp > 3 && consultant.csltExp <= 5 && <p className={styles.exp}>전문 치료사</p>}
            {consultant.csltExp > 5 && consultant.csltExp <= 10 && <p className={styles.exp}>프로 치료사</p>}
            {consultant.csltExp > 10 && <p className={styles.exp}>마스터 치료사</p>}
          </div>
          <div className={styles.team}>
            <p>{consultant.csltTeam}</p>
          </div>
          <div className={styles.boundary}>
            <div >
              <p className={styles.boundaryTitle}>치료 가능 영역</p>
            </div>
            <div>
              {
                consultant.csltBoundary.map((boundary, index) => {
                  return (
                    <span key={index}># {boundary} </span>
                  )
                })
              }
            </div>
          </div>
          <div className={styles.tag}>
            <div>
              <p className={styles.tagTitle}>성향</p>
            </div>
            <div>
              {
                consultant.csltTag.map((tag, index) => {
                  return (
                    <span key={index}># {tag} </span>
                  )
                })
              }
            </div>
          </div>
          <div>
            <button onClick={goRev} className={styles.btn1}>상담 신청</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultantCard