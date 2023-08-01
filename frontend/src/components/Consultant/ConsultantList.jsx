import { useEffect } from "react"
import axios from "axios"
import ConsultantCard from "./ConsultantCard"
import styles from "./ConsultantList.module.css"
import { useDispatch, useSelector } from "react-redux"
import { changeCsltList } from "../../store/consultantList"


function ConsultantList() {
  const consultants = useSelector((state) => { return state.csltList })
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get("/cslt")
      .then((res) => {
        if (res.data.length >= 1) {
          const newList = res.data
          dispatch(changeCsltList(newList))
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