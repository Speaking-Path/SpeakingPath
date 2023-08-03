import React from 'react';
import styles from './Entry.module.css'

function Entry() {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        {/* Custom Google font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
          rel="stylesheet"
        />
        {/* Bootstrap icons */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        {/* Core theme CSS (includes Bootstrap) */}
        <link href="Entry.module.css" rel="stylesheet" />
      </head>
      <body className="d-flex flex-column h-100">
        <main className="flex-shrink-0">
          {/* Navigation */} 
          {/* Header */}
          <header className="py-5">
            <div className="container px-5 pb-5">
              <div className="row gx-5 align-items-center">
                <div className="col-xxl-5">
                  {/* Header text content */}
                  <div className="text-center text-xxl-start">
                    <div className="badge bg-gradient-primary-to-secondary text-white mb-4">
                      <div className="text-uppercase">음절 &middot; 단어 &middot; 문장</div>
                    </div>
                    <div className="fs-3 fw-light text-muted">발음을 듣고 따라해보세요</div>
                    <h1 className="display-3 fw-bolder mb-5">
                      <span className="text-gradient d-inline">음절 말하기</span>
                    </h1>
                    <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                      <a
                        className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder"
                        href="resume.html"
                      >
                        시작하기
                      </a>

                      <a
                        className="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder"
                        href="projects.html"
                      >
                        내화면보기 
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-7">
                  {/* Header profile picture */}
                  <div className="d-flex justify-content-center mt-5 mt-xxl-0">
                    <div className="profile bg-gradient-primary-to-secondary">
                      {/* TIP: For best results, use a photo with a transparent background like the demo example below */}
                      {/* Watch a tutorial on how to do this on YouTube (link) */}
                      <img className="profile-img" src="../../assets/speak.jpg" alt="..." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </main>
        {/* Bootstrap core JS */}
        {/* Core theme JS */}
        {/* <script src="js/scripts.js"></script> */}
      </body>
    </>
  );
};

export default Entry;