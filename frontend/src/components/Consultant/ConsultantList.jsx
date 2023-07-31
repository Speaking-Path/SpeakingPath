import { useEffect, useState } from "react"
import axios from "axios"
import ConsultantCard from "./ConsultantCard"
import styles from "./ConsultantList.module.css"
import ListIcon from '@mui/icons-material/List';


function ConsultantList() {
  const [consultants, setConsultants] = useState([])

  useEffect(() => {
    axios.get("/cslt")
      .then((res) => {
        if (res.data.length >= 1) {
          const newList = res.data
          setConsultants(newList)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  return (
    <div className={styles.resultBox}>
        <p className={styles.result}>검색 결과 {consultants.length}건</p>
      {
        consultants.map((consultant, index) => {
          return (
            <div key={index}>
              <ConsultantCard consultant={consultant} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ConsultantList