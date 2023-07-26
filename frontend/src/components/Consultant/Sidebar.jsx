import styles from './Sidebar.module.css'
import { useState } from 'react';
import axios from 'axios';


function Sidebar() {

  const [tagsCheck, setTagsCheck] = useState(['엄격한', '친근한', '친절한', '정적인', '발랄한', '활동적인'])
  const [boundarysCheck, setBoundarysCheck] = useState(['언어발달장애', '말소리장애', '신경언어장애', '유창성장애', '음성장애'])

  const [name, setName] = useState("")
  const [exp, setExp] = useState("")
  const [sex, setSex] = useState("")
  const [boundary, setBoundary] = useState([])
  const [tag, setTag] = useState([])

  const [tmpExp, setTmpExp] = useState("")


  const data = {
    "userName": name,
    "csltExp": exp,
    "userSex": sex,
    "csltBoundary": boundary,
    "csltTag": tag
  }


  const searchConsultant = () => {
      axios.post("http://localhost:8080/cslt", data)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
  }



  const changeBoundary = (checked, item) => {
    if (checked) {
      setBoundary([...boundary, item]);
    } else {
      setBoundary(boundary.filter((el) => el !== item));
    }
  }


  const changeTag = (checked, item) => {
    if (checked) {
      setTag([...tag, item]);
    } else {
      setTag(tag.filter((el) => el !== item));
    }
  }

  const resetAll = () => {
    setExp("")
    setSex("");
    setBoundary([]);
    setTag([]);
  };


  return (
    <div>
      <div className={`${styles.searchinput}`}>
        <label htmlFor=""></label>
        <input type="text" placeholder="상담사 이름"
          onChange={(e) => {
            setName(e.target.value)
          }} />
      </div>
      <hr />
      <div className={`${styles.detail} container`}>
        <div className='row'>
          <p className='col'>상세조건</p>
          <button className={`${styles.reset} col`} onClick={resetAll}>초기화</button>
        </div>
      </div>
      <hr />
      <div>
        <p>치료사 경력</p>
        <div>
          <div>
            <input type="radio" id="training" name="exp" value="3"
            onChange={(e)=>{
              setExp(e.target.value)
              setTmpExp(e.target.value)
            }}
            checked={false}/>
            <label htmlFor="training">수련 치료사(~3년)</label>
          </div>
          <div>
            <input type="radio" id="speciality" name="exp" value="5"
            onClick={(e)=>{setExp(e.target.value)}}/>
            <label htmlFor="speciality">전문 치료사(~5년)</label>
          </div>
          <div>
            <input type="radio" id="master" name="exp" value="10"
            onClick={(e)=>{setExp(e.target.value)}}/>
            <label htmlFor="master">마스터 치료사(~10년)</label>
          </div>
          <div>
            <input type="radio" id="pro" name="exp" value="11"
            onClick={(e)=>{setBoundary(e.target.value)}}/>
            <label htmlFor="pro">프로 치료사(10년~)</label>
          </div>
        </div>
      </div>
      <div>
        <p>상담사 성별</p>
        <div>
          <input type="radio" name="sex" id="여성" value="F"
          onClick={(e) =>{
            setSex(e.target.value)}}/>
          <label htmlFor="여성">여성</label>
        </div>
        <div>
          <input type="radio" name="sex" id="남성" value="M"
          onClick={(e) =>{setSex(e.target.value)}}/>
          <label htmlFor="남성">남성</label>
        </div>
      </div>
      <div>
        <p>치료 가능 영역</p>
        <div>
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
        <p>성향</p>
        <div>
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
      <div>
        <button onClick={searchConsultant}>검색하기</button>
      </div>
    </div>
  )
}

export default Sidebar