import styled from 'styled-components';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import styles from './SavedItems.module.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import VideoComp from './VideoComp';



const SavedItems = () => {

  const userId = useSelector((state) => { return state.loginId })
  const [userRecog, setUserRecog] = useState([])
  const [userSyllable, setUserSyllable] = useState([])
  const [userWord, setUserWord] = useState([])
  const [userSentence, setUserSentence] = useState([])

  const [isVideo, setIsVideo] = useState(false)
  const [videoSrc, setVideoSrc] = useState("")


  // const userSyllable = [
  //   {
  //     "userId": "ssafy1",
  //     "slbId": 1,
  //     "slbContent": "아"
  //   },
  //   {
  //     "userId": "ssafy1",
  //     "slbId": 2,
  //     "slbContent": "야"
  //   },
  //   {
  //     "userId": "ssafy1",
  //     "slbId": 3,
  //     "slbContent": "어"
  //   },
  //   {
  //     "userId": "ssafy1",
  //     "slbId": 4,
  //     "slbContent": "여"
  //   }
  // ]

  // const userWord = [
  //   {
  //     "userId": "ssafy1",
  //     "wordId": 1,
  //     "wordContent": "아아",
  //     "wordPron": "[아아]"
  //   },
  //   {
  //     "userId": "ssafy1",
  //     "wordId": 2,
  //     "wordContent": "어어",
  //     "wordPron": "[어어]"
  //   },
  //   {
  //     "userId": "ssafy1",
  //     "wordId": 3,
  //     "wordContent": "여여",
  //     "wordPron": "[여여]"
  //   }
  // ]

  // const userSentence = []


  useEffect(() => {
    axios.post("practice/recog/object/show", { "userId": userId })
      .then((res) => {
        setUserRecog(res.data)
      })
      .catch((err) => {
        // console.log(err)
      })
    axios.post("practice/pron/syllable/show", { "userId": userId })
      .then((res) => {
        setUserSyllable(res.data)
      })
      .catch((err) => {
        // console.log(err)
      })
    axios.post("practice/pron/word/show", { "userId": userId })
      .then((res) => {
        setUserWord(res.data)
      })
      .catch((err) => {
        // console.log(err)
      })
    axios.post("practice/pron/sentence/show", { "userId": userId })
      .then((res) => {
        setUserSentence(res.data)
      })
      .catch((err) => {
        // console.log(err)
      })
  }, [])

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };


  const openVideo = function (type, id) {
    setVideoSrc(type + "/" + id)
    setIsVideo(true)
  }


  const deleteObject = function (objId) {
    const data = {
      "objId": objId,
      "userId": userId
    }
    axios.post("practice/recog/object/save", data)
      .then((res) => {
        const updatedUserRecog = userRecog.filter(item => item.objId !== objId);
        setUserRecog(updatedUserRecog)
      })
      .catch((err) => {
        // console.log(err)
      })
  }


  const items = userRecog.map((recog, index) => (
    <div className={styles.ItemsContain} key={index}>
      <div className={styles.ItemsWrap}>
        <img
          className={styles.img}
          src={process.env.PUBLIC_URL + "/assets/PickPic/" + recog.objId + ".jpg"}
          alt=""
        />
        <div className={styles.overlay}>
          <p>{recog.objName}</p>
          <div className={styles.starIconContainer}>
            <CloseIcon onClick={() => { deleteObject(recog.objId) }} className={styles.starIcon} />
          </div>
        </div>
      </div>
    </div>
  ))



  const deleteSyllable = function (slbId, event) {
    event.stopPropagation()
    const data = {
      "slbId": slbId,
      "userId": userId
    }
    axios.post("practice/pron/styllable/save", data)
      .then((res) => {
        const updatedUserRecog = userRecog.filter(item => item.slbId !== slbId);
        setUserRecog(updatedUserRecog)
      })
      .catch((err) => {
        // console.log(err)
      })
  }


  const syllableItems = userSyllable.map((syllable, index) => (
    <div className={styles.ItemsContain} key={index}>
      <div className={styles.ItemsWrap} onClick={() => { openVideo("syllable", syllable.slbId) }}>
        <div className={styles.overlay2}>
          <p>{syllable.slbContent}</p>
          <div className={styles.starIconContainer}>
            <CloseIcon onClick={(event) => { deleteSyllable(syllable.slbId, event) }} className={styles.starIcon} />
          </div>
        </div>
      </div>
    </div>
  ))

  const deleteWord = function (wordId) {
    const data = {
      "wordId": wordId,
      "userId": userId
    }
    axios.post("practice/pron/word/save", data)
      .then((res) => {
        const updatedUserRecog = userRecog.filter(item => item.wordId !== wordId);
        setUserRecog(updatedUserRecog)
      })
      .catch((err) => {
        // console.log(err)
      })
  }


  const wordItems = userWord.map((word, index) => (
    <div className={styles.ItemsContain} key={index}>
      <div className={styles.ItemsWrap} onClick={() => { openVideo("word", word.wordId) }}>
        <div className={styles.overlay2}>
          <p>{word.wordContent}</p>
          <p>{word.wordPron}</p>
          <div className={styles.starIconContainer}>
            <CloseIcon onClick={() => { deleteWord(word.wordId) }} className={styles.starIcon} />
          </div>
        </div>
      </div>
    </div>
  ))



  const deleteSentence = function (stcId) {
    const data = {
      "stcId": stcId,
      "userId": userId
    }
    axios.post("practice/recog/object/save", data)
      .then((res) => {
        const updatedUserRecog = userRecog.filter(item => item.stcId !== stcId);
        setUserRecog(updatedUserRecog)
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  const sentenceItems = userSentence.map((sentence, index) => (
    <div className={styles.ItemsContain} key={index}>
      <div className={styles.ItemsWrap} onClick={() => { openVideo("sentence", sentence.stcId) }}>
        <div className={styles.overlay2}>
          <p>{sentence.stcContent}</p>
          <div className={styles.starIconContainer}>
            <CloseIcon onClick={() => { deleteSentence(sentence.stcId) }} className={styles.starIcon} />
          </div>
        </div>
      </div>
    </div>
  ))


  return (
    <div>
      <div>
        {
          videoSrc && isVideo ? (
            <VideoComp videoSrc={videoSrc} setIsVideo={setIsVideo}/>
          ) : (
            null
          )
        }
      </div>
      <div className={styles.title}>
        <p className={styles.titleText1}>훈련 즐겨찾기</p>
        <p className={styles.titleText2}>즐겨찾기한 단어들을 확인하세요!</p>
      </div>
      <div>
        <div>
          <p className={styles.myTitle}>나만의 음절</p>
          <p className={styles.clickInfo}>클릭하면 영상을 볼 수 있어요.</p>
        </div>
        {
          userSyllable.length > 0 ? (
            <div className={styles.contain}>
              <AliceCarousel
                mouseTracking
                animationDuration={3000}
                disableButtonsControls
                responsive={responsive}
                items={syllableItems}
                paddingRight={40}
              />
            </div>
          ) : (
            <div>
              <p>즐겨찾기한 음절이 없습니다.</p>
            </div>
          )
        }
      </div>
      <div>
        <div>
          <p className={styles.myTitle}>나만의 단어</p>
          <p className={styles.clickInfo}>클릭하면 영상을 볼 수 있어요.</p>
        </div>
        {
          userWord.length > 0 ? (
            <div className={styles.contain}>
              <AliceCarousel
                mouseTracking
                // infinite={1000}
                animationDuration={3000}
                disableButtonsControls
                responsive={responsive}
                items={wordItems}
                paddingRight={40}
              // paddingLeft={40}
              />
            </div>
          ) : (
            <div>
              <p>즐겨찾기한 단어가 없습니다.</p>
            </div>
          )
        }
      </div>
      <div>
        <div>
          <p className={styles.myTitle}>나만의 문장</p>
          <p className={styles.clickInfo}>클릭하면 영상을 볼 수 있어요.</p>
        </div>
        {
          userSentence.length > 0 ? (
            <div className={styles.contain}>
              <AliceCarousel
                mouseTracking
                // infinite={1000}
                animationDuration={3000}
                disableButtonsControls
                responsive={responsive}
                items={sentenceItems}
                paddingRight={40}
              // paddingLeft={40}
              />
            </div>
          ) : (
            <div>
              <p>즐겨찾기한 문장이 없습니다.</p>
            </div>
          )
        }
      </div>
      <div>
        <div>
          <p className={`${styles.myTitle} ${styles.onlyP}`}>나만의 사물</p>
        </div>
        {
          userRecog.length > 0 ? (
            <div className={styles.contain}>
              <AliceCarousel
                mouseTracking
                // infinite={1000}
                animationDuration={3000}
                disableButtonsControls
                responsive={responsive}
                items={items}
                paddingRight={40}
              // paddingLeft={40}
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