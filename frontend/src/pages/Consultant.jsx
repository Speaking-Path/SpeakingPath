import Sidebar from "../components/Consultant/Sidebar"
import ConsultantList from "../components/Consultant/ConsultantList"
import styles from "./Consultant.module.css"


function Consultant() {
  return (
    <div className="container">
      <div className={styles.applystart}>
        <p className={styles.title}><span className={styles.titleinfo}>언어재활 상담 신청</span></p>
      </div>
      <div className="row">
        <div className="col-3">
        <Sidebar/>
        </div>
        <div className="col-9">
        <ConsultantList />
        </div>
      </div>
    </div>
  )
}

export default Consultant