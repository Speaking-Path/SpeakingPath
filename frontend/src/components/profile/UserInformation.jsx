import React, { useState } from 'react';
import Preview from './Preview';

function UserInformation() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleButtonClick = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

    return (
        <section style={{ backgroundColor: '#eee', height: '100vh'}}>
            
        {isPreviewOpen && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
            <Preview isOpen={isPreviewOpen} onClose={handleClosePreview} size="large">
                <div>
                    <h2 className='mb-0 title'>화면 미리보기</h2>
                </div>
            </Preview>
        </div>
        )}
            
            <div className="container py-5">

                <div className="row">
                    <div className="col-md-4 mt-5">
                        <div className="card">
                            <div className="card-body text-center">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                    className="rounded-circle img-fluid" style={{ width: "150px" }} />
                                <h5 className="my-3">Jihyon Seo</h5>
                                <p className="text-muted mb-3">Jenkins Test3</p>
                                {/* <p className="text-muted mb-4">안녕하세요</p> */}
                                <div className="d-flex justify-content-center mb-2">
                                    <button type="button" className="btn btn-primary">회원정보수정</button>
                                    <button type="button" className="btn btn-outline-primary ms-1" onClick={handleButtonClick}>내화면보기</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="m-2 fw-bold">아이디</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted m-2">ssafy</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="m-2 fw-bold">비밀번호</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted m-2">＊＊＊＊＊＊＊＊</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="m-2 fw-bold">이메일</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted m-2">example@example.com</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="m-2 fw-bold">연락처</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted m-2">010-1234-5678</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="m-2 fw-bold">생년월일</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted m-2">1999.11.11</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="m-2 fw-bold">성별</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted m-2">여성</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

    )
}

export default UserInformation