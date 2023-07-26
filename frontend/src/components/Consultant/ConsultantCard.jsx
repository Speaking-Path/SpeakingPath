import { useState } from "react";
import styles from "./ConsultantCard.module.css"


function ConsultantCard({consultant}) {

  const [imgsrc, setImgsrc] = useState("")

  if (consultant.userPic) {
    setImgsrc(consultant.userPic)
  }
  return (
    <div>
        <img className={styles.profile} src={process.env.PUBLIC_URL + "/assets/user.png"} alt="" />
      <div className="container">
        <div>
        <div className="">
        <p>{consultant.userId}</p>
        </div>
        <div className="col">
        {consultant.csltExp <= 3 && <p>수련 치료사</p>}
        {consultant.csltExp > 3 && consultant.csltExp <= 5 && <p>전문 치료사</p>}
        {consultant.csltExp > 5 && consultant.csltExp <= 10 && <p>프로 치료사</p>}
        {consultant.csltExp > 10 && <p>마스터 치료사</p>}
        </div>
        </div>
      </div>
      {/* <div>
        <p>{consultant.csltTeam}</p>
      </div>
      <div>
        <p>치료 가능 영역</p>
        <div>
          {
            consultant.csltBoundary.map((boundary, index)=>{
              return(
                <p key={index}>{boundary}</p>
              )
            })
          }
        </div>
      </div>
      <div>
        <p>성향</p>
        {
          consultant.csltTag.map((tag, index) => {
            return(
              <p key={index}>{tag}</p>
            )
          })
        }
      </div> */}
      <div>
        <button>상담 신청</button>
      </div>
    </div>
  )
}

export default ConsultantCard