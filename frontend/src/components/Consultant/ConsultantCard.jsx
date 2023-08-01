import { useEffect, useState } from "react"
import styles from "./ConsultantCard.module.css"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { changeCsltInfo } from "../../store/consultantInfo"


function ConsultantCard({ consultant }) {
  console.log(consultant)
  const selectedCsltInfo = useSelector((state) => { return state.selectedCsltInfo })
  const dispatch = useDispatch()

  const [imgsrc, setImgsrc] = useState("")
  const navigate = useNavigate()

  const goRev = () => {
    dispatch(dispatch(changeCsltInfo(consultant)))
    navigate("/consulting/reservation")
  }

  useEffect(()=>{
    if (consultant.userPic) {
      setImgsrc(consultant.userPic)
    }
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <img className={styles.profile} src={process.env.PUBLIC_URL + "/assets/user.png"} alt="" />
        </div>
        <div className="col">
          <span>{consultant.username}</span>
          {consultant.csltExp <= 3 && <span>수련 치료사</span>}
          {consultant.csltExp > 3 && consultant.csltExp <= 5 && <span>전문 치료사</span>}
          {consultant.csltExp > 5 && consultant.csltExp <= 10 && <span>프로 치료사</span>}
          {consultant.csltExp > 10 && <span>마스터 치료사</span>}
          <div>
            <p>{consultant.csltTeam}</p>
          </div>
          <div className="row">
            <div className="col">
              <p>치료 가능 영역</p>
            </div>
            <div className="col">
              <div className="row">
                {
                  consultant.csltBoundary.map((boundary, index) => {
                    return (
                      <div className="col" key={index}>
                        <p >{boundary}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>성향</p>
            </div>
            <div className="col">
              <div className="row">
                {
                  consultant.csltTag.map((tag, index) => {
                    return (
                      <div className="col" key={index}>
                        <p >{tag}</p>
                      </div>
                    )
                  })
                }
              </div>
        </div>
            </div>
          </div>
      </div>
      <div>
        <button onClick={goRev}>상담 신청</button>
      </div>
      <hr />
    </div>
  )
}

export default ConsultantCard