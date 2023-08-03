import React from 'react';
import './Entry.module.css'; 

function Entry() {
  return (
    <div className="entry-container min-vh-100"> 
      <div className="entry-header py-5 px-md-5"> 
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
                  음절말하기
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

                  <a
                      className="btn btn-outline-light btn-lg px-5 py-3 fs-6 fw-bolder m-2"
                      href="내화면미리보기링크넣기"
                      style={{ color: 'blue', borderColor: 'blue' }}
                    >
                    화면보기
                  </a>
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
