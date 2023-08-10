import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux';
import { selectMediaConfig } from '../../store/mediaConfig';

function MyCamera({ myVideoRef }) {
  const mediaConfig = useSelector(selectMediaConfig)
  const stream = useRef(null)

  useEffect(() => {
    async function getMedia() {
      try {
        const constraints = {
          video: {
            deviceId: mediaConfig.camera,
          },
          audio: {
            deviceId: mediaConfig.microphone,
          },
        };

        if (mediaConfig.camera === 'no-camera') {
          delete constraints.video;
        }
        if (mediaConfig.microphone === 'no-microphone') {
          delete constraints.audio;
        }

        // constraints정보 : https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        stream.current = await navigator.mediaDevices.getUserMedia(constraints);

        // myVideoRef에 mediaStream값 넣어주기(변경되는 값)
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream.current;
          // 에코 방지
          myVideoRef.current.muted = true;
        }
      } catch (e) {
        window.alert(e);
      }
    }

    // 권한 요청을 먼저 진행
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(() => {
          // 사용자가 권한 허용 시에만 getMedia() 함수를 호출
          getMedia();
        })
        .catch((err) => {
          window.alert('카메라 또는 마이크 접근 권한이 거부되었습니다. 모두 access할 수 있도록 설정을 변경해주세요');
        });
    }
    console.log(mediaConfig)
  }, [mediaConfig.camera, mediaConfig.microphone]);

  // stop camera
  useEffect(() => {
    return () => {
      if (stream.current) {
        stream.current.getTracks().forEach((track) => track.stop());
      }
    }
  }, [])

  // 렌더링 되면 video DOM object가 myVideoRef.current에 들어감
  // return <video ref={myVideoRef} autoPlay style={{ width: '600px', height: '350px' }}/>; 
  return (
    <div className='my-camera'>
      <video ref={myVideoRef} autoPlay style={{height:'50vh', width:'60vw'}}/>
    </div>
  );
}

export default MyCamera;




