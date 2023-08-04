import { useState } from 'react';
import React from 'react';
import './Entry.module.css'; 
// import Preview from './Preview';
import Preview from '../../profile/Preview';

function Entry(props) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  return (

    <div className="entry-container min-vh-100"> 
      <div className="entry-header py-5 px-md-5"> 

      {isPreviewOpen && (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
          <Preview isOpen={isPreviewOpen} onClose={handleClosePreview} size="large">
              <div>
              <h2 className='mb-0'>화면 미리보기</h2>
              {/* <p>내용</p> */}
              </div>
          </Preview>
      </div>
      )}

        <div className="container">

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
                  <a
                    className="btn btn-primary btn-lg px-5 py-3 fs-6 fw-bolder m-2"
                    href="연습화면링크넣기"
                    style={{ background: 'linear-gradient(45deg, #007bff, #6610f2)', color: 'white' }}
                  >
                    시작하기
                  </a>

                  <button type="button" className="btn btn-outline-primary btn-lg px-5 py-3 fs-6 fw-bolder m-2" onClick={handleButtonClick}>내화면보기</button>

                </div>
                </div>
              </div>
            </div>
 
            <div className="col-lg-7">
              <div className="d-flex justify-content-center mt-5 mt-lg-0">
                <div className="profile bg-gradient-primary-to-secondary">
                  <img className="profile-img" src="../../assets/speak.jpg" style={{ width: '100%', maxWidth: '100vh' }} />
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
