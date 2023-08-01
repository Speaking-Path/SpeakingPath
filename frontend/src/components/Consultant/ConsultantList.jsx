import { useEffect, useState } from "react"
import axios from "axios"
import ConsultantCard from "./ConsultantCard"


function ConsultantList() {
  const [consultants, setConsultants] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:8080/cslt")
    .then((res)=>{
      if (res.data.length >= 1) {
        const newList = res.data
        setConsultants(newList)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [])


  return (
    <div>
      <p>검색 결과 {consultants.length}건</p>
      <hr />
      {
        consultants.map((consultant, index)=>{
          return(
            <div key={index}>
              <ConsultantCard consultant={consultant}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default ConsultantList