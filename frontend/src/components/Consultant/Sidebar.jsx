import styles from "./Sidebar.module.css"
import { useState } from "react"
import axios from "axios"
import SearchIcon from '@mui/icons-material/Search';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ExtensionIcon from '@mui/icons-material/Extension';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { useDispatch, useSelector } from "react-redux"
import { changeCsltList } from "../../store/consultantList"
import { blue } from "@mui/material/colors";


function Sidebar() {

  const [tagsCheck, setTagsCheck] = useState(["엄격한", "친근한", "친절한", "정적인", "발랄한", "활동적인"])
  const [boundarysCheck, setBoundarysCheck] = useState(["언어발달장애", "말소리장애", "신경언어장애", "유창성장애", "음성장애"])

  const [name, setName] = useState("")
  const [exp, setExp] = useState("")
  const [sex, setSex] = useState("")
  const [boundary, setBoundary] = useState([])
  const [tag, setTag] = useState([])

  const dispatch = useDispatch()


  const data = {
    "userName": name,
    "csltExp": exp,
    "userSex": sex,
    "csltBoundary": boundary,
    "csltTag": tag
  }

  const changeExperience = (value) => {
    setExp(value)
  }

  const changeSex = (value) => {
    setSex(value)
  }

  const searchConsultant = () => {
    axios.post("/cslt", data)
      .then((res) => {
        const newList = res.data
        dispatch(changeCsltList(newList))
      })
      .catch((err) => {
        console.log(err)
      })
  }



  const changeBoundary = (checked, item) => {
    if (checked) {
      setBoundary([...boundary, item])
    } else {
      setBoundary(boundary.filter((el) => el !== item))
    }
  }


  const changeTag = (checked, item) => {
    if (checked) {
      setTag([...tag, item])
    } else {
      setTag(tag.filter((el) => el !== item))
    }
  }

  const resetAll = () => {
    setExp("")
    setSex("")
    setBoundary([])
    setTag([])
  }


  return (
    <div className={styles.search}>
      <div className={styles.iconcontainer}>
        <div className={styles.searchicon}>
          <SearchIcon sx={{ color: blue[500] }} onClick={searchConsultant}/>
        </div>
        <div>
          <label htmlFor="csltName"></label>
          <input className={`${styles.searchinput}`} type="text" id="csltName" placeholder="상담사 이름"
            onChange={(e) => {
              setName(e.target.value)
            }} />
        </div>
      </div>
      <div className={styles.searchBox}>
      <div className={`${styles.detail} container`}>
        <div className="row">
          <p className={`${styles.detailP} col`}>상세검색</p>
          <button className={`${styles.reset} col`} onClick={resetAll}>초기화</button>
        </div>
      </div>
      <div className={styles.condition}>
        <div>
          <MapsHomeWorkIcon sx={{ color: blue[300] }} color="action"/>
          <p className={styles.subtitle}>경력</p>
          <div className={styles.selectBox}>
            <div>
              <input type="checkbox" id="training" value="3"
                onChange={(e) => changeExperience(exp === 3 ? "" : 3)} checked={exp === 3} />
              <label htmlFor="training">수련 치료사 (~3년)</label>
            </div>
            <div>
              <input type="checkbox" id="speciality" value="5"
                onChange={(e) => changeExperience(exp === 5 ? "" : 5)} checked={exp === 5} />
              <label htmlFor="speciality">전문 치료사 (~5년)</label>
            </div>
            <div>
              <input type="checkbox" id="master" value="10"
                onChange={(e) => changeExperience(exp === 10 ? "" : 10)} checked={exp === 10} />
              <label htmlFor="master">프로 치료사 (~10년)</label>
            </div>
            <div>
              <input type="checkbox" id="pro" value="11"
                onChange={(e) => changeExperience(exp === 11 ? "" : 11)} checked={exp === 11} />
              <label htmlFor="pro">마스터 치료사 (10년~)</label>
            </div>
          </div>
        </div>
        <div>
          <EmojiPeopleIcon sx={{ color: blue[300] }} color="action"/>
          <p className={styles.subtitle}>성별</p>
          <div className={styles.selectBox}>
            <div>
              <input type="checkbox" id="여성" value="F"
                onChange={(e) => { changeSex(sex === "F" ? "" : e.target.value) }} checked={sex === "F"} />
              <label htmlFor="여성">여성</label>
            </div>
            <div>
              <input type="checkbox" id="남성" value="M"
                onChange={(e) => { changeSex(sex === "M" ? "" : e.target.value) }} checked={sex === "M"} />
              <label htmlFor="남성">남성</label>
            </div>
          </div>
        </div>
        <div>
          <MedicalServicesIcon sx={{ color: blue[300] }} color="action"/>
          <p className={styles.subtitle}>치료 가능 영역</p>
          <div className={styles.selectBox}>
            {
              boundarysCheck.map((boundarys, index) => {
                return (
                  <div key={index}>
                    <input type="checkbox" id={boundarys}
                      onChange={(e) => {
                        changeBoundary(e.currentTarget.checked, boundarys)
                      }}
                      checked={boundary.includes(boundarys) ? true : false}></input>
                    <label htmlFor={boundarys}>{boundarys}</label>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div>
          <ExtensionIcon sx={{ color: blue[300] }} color="action"/>
          <p className={styles.subtitle}>성향</p>
          <div className={styles.selectBox}>
            {
              tagsCheck.map((tags, index) => {
                return (
                  <div key={index} >
                    <input type="checkbox" id={tags}
                      onChange={(e) => {
                        changeTag(e.currentTarget.checked, tags)
                      }}
                      checked={tag.includes(tags) ? true : false}></input>
                    <label htmlFor={tags}>{tags}</label>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      </div>
      <div>
        <button className={styles.searchBtn} onClick={searchConsultant}>검색하기</button>
      </div>
    </div>
  )
}

export default Sidebar