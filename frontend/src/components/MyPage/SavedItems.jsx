import axios from 'axios'
import styles from './SavedItems.module.css'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'


function SavedItems() {
  const userId = useSelector((state)=>{ return state.loginId })
  const [userRecog, setUserRecog] = useState([])
  const [userPron, setUserPron] = useState([])

  useEffect(()=>{
    axios.post("practice/recog/object/show", {"userId": userId})
    .then((res) => {
      setUserRecog(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
    axios.post("practice/pron/word/show", {"userId": userId})
    .then((res) => {
      setUserPron(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  
  const [clickedItem, setClickedItem] = useState(null);
  const images = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1543357530-d91dab30fa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
  ];

  const expand = (index) => {
    setClickedItem(index);
    const newWidth = clickedItem === index ? '15vw' : '42vw';
    const easeValue = clickedItem === index ? 'elastic(1, .6)' : 'elastic(1, .3)';
    
    gsap.to('.item', {
      width: '8vw',
      duration: 2,
      ease: 'elastic(1, .6)',
      onComplete: () => {
        gsap.to(`#item-${index}`, {
          width: newWidth,
          duration: 2.5,
          ease: easeValue,
        });
      }
    });
  }

  


  return (
    <div>
      <div>
        <p>훈련 즐겨찾기</p>
      </div>
      <div>
        <p>발음 보관함</p>
      </div>
      <div>
        <p>사물 보관함</p>
        {userRecog && userRecog.map((recog, index) => (
          <p key={index}>{recog.objId}</p>
        ))}
      </div>
      <div className="group">
      {images.map((imageUrl, index) => (
        <div
          key={index}
          id={`item-${index}`}
          className={`item ${clickedItem === index ? 'clicked' : ''}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
          onClick={() => expand(index)}
        />
      ))}
    </div>
    </div>
  )
}

export default SavedItems