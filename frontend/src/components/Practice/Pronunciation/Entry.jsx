import { useState, useEffect } from 'react';
import React from 'react';
import './Entry.module.css'; 
// import Preview from './Preview';
import Preview from '../../profile/Preview';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import styles from './Entry.module.css'


function Entry(props) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 110, behavior: 'smooth' }); // 컴포넌트 상단으로 스크롤 이동
  }, []);

  const handleButtonClick = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  function typeEng(){
    if(props.type==="음절") return "syllable"
    else if(props.type==="단어") return "word"
    else if(props.type==="문장") return "sentence"
    return ""
  }

  return (

    <div className="entry-container min-vh-100"> 
      <div className="entry-header py-5 px-md-5"> 

      {isPreviewOpen && (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
          <Preview isOpen={isPreviewOpen} onClose={handleClosePreview} size="large">
          </Preview>
      </div>
      )}

        <div className="container" style={{ border: '4px solid skyblue', padding: '45px' }}>

          <div className="row gx-5 align-items-center">

            <div className="col-lg-5">
              <div className="">
                
                <div className="badge bg-gradient-primary-to-secondary text-white mb-4">
                  <div className="text-uppercase">음절 &middot; 단어 &middot; 문장</div>
                </div>
                
                <div className="fs-3 fw-light text-muted">발음을 듣고 따라해보세요</div>
                
                <h1 className="display-3 fw-bolder mb-5">
                  {/* <span className="text-gradient d-inline">음절 말하기</span> */}
                  <span style={{ background: 'linear-gradient(45deg, #007bff, #6610f2)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  {props.type} 말하기
                  </span>
                </h1>

                <div className="d-grid gap-3 d-sm-flex justify-content-center mb-3">
                  <div class="btn-container">
                    <Link to={"/practice/pron/start/"+typeEng()} className="btn btn-primary btn-lg px-5 py-3 fs-6 fw-bolder m-2" style={{ background: 'linear-gradient(45deg, #007bff, #6610f2)', color: 'white' }}>
                      시작하기
                    </Link>
                    <button type="button" className="btn btn-outline-primary btn-lg px-5 py-3 fs-6 fw-bolder m-2" onClick={handleButtonClick}>내화면보기</button>
                  </div>
                </div>
                
                <div className={styles.out} onClick={()=>{navigate("/practice")}}>
                  <span>나가기</span>
                </div>

              </div>
            </div>
 
            <div className="col-lg-7">
              <div className="d-flex justify-content-center mt-5 mt-lg-0">
                <div className="profile bg-gradient-primary-to-secondary">
                  <img className="profile-img" src={props.speakImage} style={{ width: '100%', maxWidth: '100vh', marginTop: '30px' }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Entry;
