import styled from 'styled-components';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import styles from './SavedItems.module.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios';



const SavedItems = () => {

  const userId = useSelector((state) => { return state.loginId })
  const [userRecog, setUserRecog] = useState([])
  const [userPron, setUserPron] = useState([])
  const [userWord, setUserWord] = useState([])
  const [userSentence, setUserSentence] = useState([])


  useEffect(() => {
    axios.post("practice/recog/object/show", { "userId": userId })
      .then((res) => {
        setUserRecog(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    axios.post("practice/pron/syllable/show", { "userId": userId })
      .then((res) => {
        setUserPron(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    // axios.post("practice/pron/word/show", { "userId": userId })
    //   .then((res) => {
    //     setUserWord(res.data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // axios.post("practice/pron/sentence/show", { "userId": userId })
    //   .then((res) => {
    //     setUserSentence(res.data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }, [])

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = userRecog.map((recog, index) => (
    <div className={styles.ItemsContain} key={index}>
      <div className={styles.ItemsWrap}>
        <img
          className={styles.img}
          src={process.env.PUBLIC_URL + "/assets/PickPic/" + recog.objId + ".jpg"}
          alt=""
        />
        <div className={styles.overlay}>{recog.objName}</div>
      </div>
    </div>
  ))


  // const pronItems = userPron.map((pron, index) => (
  //   <ItemsContain key={index}>
  //     <ItemsWrap>
  //       <img
  //         className={styles.img}
  //         src={process.env.PUBLIC_URL + "/assets/PickPic/" + pron.objId + ".jpg"}
  //         alt=""
  //       />
  //       <p>{pron.objId}</p>
  //     </ItemsWrap>
  //   </ItemsContain>
  // ))




  return (
    <div>
      <div>
        <p>훈련 즐겨찾기</p>
        <p>즐겨찾기한 단어들을 확인하세요!</p>
      </div>
      <div>
        <div>
          나만의 음절
        </div>
      </div>
      <div>
        <div>
          나만의 단어
        </div>
      </div>
      <div>
        <div>
          나만의 문장
        </div>
      </div>
      <div>
        <div>
          <p>나만의 사물</p>
        </div>
        {
          userRecog ? (
            <div className={styles.contain}>
              <AliceCarousel
                mouseTracking
                // infinite={1000}
                animationDuration={3000}
                disableButtonsControls
                responsive={responsive}
                // autoPlay
                items={items}
                paddingRight={40}
              />
            </div>
          ) : (
            <div>
              <p>즐겨찾기한 사물이 없습니다.</p>
            </div>
          )
        }
      </div>
    </div>
  )
}
export default SavedItems;