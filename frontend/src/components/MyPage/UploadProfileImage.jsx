import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './UploadProfileImage.css'
import axios from 'axios'
import { ThreeGMobiledataSharp } from '@mui/icons-material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function UploadProfileImage(){
    const [image, setImage] = useState(null)
    const userInfo = useSelector(state => state.profileInfo)
    const [isModalOpen, setIsModalOpen] = useState(false) // 모달 열림/닫힘 상태
    const dispatch = useDispatch()
    const accessToken = localStorage.getItem('accessToken')

    const handleImageChange = event => {
        const file = event.target.files[0]
        setImage(URL.createObjectURL(file))
    }

    const handleModalBackgroundClick = event => {
        if (event.target.classList.contains('modal-card')) {
            setIsModalOpen(false);
        }
    }

    const handleImageUpload = () => {
        if (image) {
            const uploadFile = document.querySelector("#profile-image").files[0]
            const formData = new FormData();
            formData.append('file', uploadFile); // 이미지를 FormData에 추가합니다.
            formData.append('userId', userInfo.userId)

            axios.post('/account/profile', formData,  {
                headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + accessToken, // the token is a variable which holds the token
                },
            })
            .then(response => {
              console.log('Image uploaded successfully', response);
              setIsModalOpen(false);
              window.location.reload();
            })
            .catch(error => {
              console.error('Error uploading image', error);
              alert('업로드 중 문제발생하였습니다. \n다시 시도해주시기 바랍니다.')
            });
        }
      };

    return(
        <div>
            <CameraAltIcon onClick={() => setIsModalOpen(true)} />
            {isModalOpen && (
        <div className="modal-card" onClick={handleModalBackgroundClick}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header mb-3">
                <h5 className="modal-title">프로필 업로드</h5>
                <button onClick={() => setIsModalOpen(false)} className="btn-close"></button>
              </div>
              <div className="modal-body row-2">
                <div className="row justify-content-center form-group-row">
                  <div className="col-7 ">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      id='profile-image'
                      className="form-control my-3"
                    />
                  </div>
                  <div className="col-3">
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      className="btn submit-btn my-3"
                      style={{ width: '100%' }}
                    >
                      선택
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-body row-8 d-flex justify-content-center">
                <div id="img-container">
                  {!image ? (
                    <div className="align-self-center text-center my-5"> 프로필을 업로드 해주세요.</div>
                  ) : (
                    <img  className="p-5" src={image} alt="프로필 이미지" style={{ width: '100%', height: '100%' }}/>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    )
}

export default UploadProfileImage