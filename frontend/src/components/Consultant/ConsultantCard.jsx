import { useState } from "react";
import styles from "./ConsultantCard.module.css"


function ConsultantCard({ consultant }) {

  const [imgsrc, setImgsrc] = useState("")

  if (consultant.userPic) {
    setImgsrc(consultant.userPic)
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <img className={styles.profile} src={process.env.PUBLIC_URL + "/assets/user.png"} alt="" />
        </div>
        <div className="col">
          <div className="row">
          <div className="col">
          <p>{consultant.userName}</p>
          </div>
          <div className="col">
            {consultant.csltExp <= 3 && <p>수련 치료사</p>}
            {consultant.csltExp > 3 && consultant.csltExp <= 5 && <p>전문 치료사</p>}
            {consultant.csltExp > 5 && consultant.csltExp <= 10 && <p>프로 치료사</p>}
            {consultant.csltExp > 10 && <p>마스터 치료사</p>}
          </div>
          </div>
        <div>
          <p>{consultant.csltTeam}</p>
        </div>
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
                  <div className="col">
                  <p key={index}>{boundary}</p>
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
                <div className="col">
                <p key={index}>{tag}</p>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
      </div>
      <div>
        <button>상담 신청</button>
      </div>
      <hr />
    </div>
  )
}

export default ConsultantCard