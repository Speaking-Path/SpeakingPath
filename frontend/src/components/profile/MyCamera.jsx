import React, { useRef, useEffect, useState } from 'react';

function MyCamera({ selectedVideoSource, selectedAudioSource }) {
  const myVideoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    async function getMedia() {
      try {
        const constraints = {
          video: {
            deviceId: selectedVideoSource ? { exact: selectedVideoSource } : undefined,
          },
          audio: {
            deviceId: selectedAudioSource ? { exact: selectedAudioSource } : undefined,
          },
        };
        if (selectedVideoSource === 'no-camera') {
          constraints.video=false
        }
        if (selectedAudioSource === 'no-audio') {
          constraints.audio=false
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(mediaStream);

        if (myVideoRef.current) {
          myVideoRef.current.srcObject = mediaStream;
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

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [selectedVideoSource, selectedAudioSource]);

  return <video ref={myVideoRef} autoPlay />; 
}

export default MyCamera;



// import React, { useRef, useEffect, useState } from 'react';

// function MyCamera() {
//     const myVideoRef = useRef(null);

//     useEffect(() => {
//         async function getMedia() {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//                 if (myVideoRef.current) {
//                     myVideoRef.current.srcObject = stream;
//                 }
//             } catch (e) {
//                 window.alert(e);
//             }
//         }

//         // 권한 요청을 먼저 진행
//         if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//             navigator.mediaDevices
//                 .getUserMedia({ video: true, audio: true })
//                 .then(() => {
//                     // 사용자가 권한 허용 시에만 getMedia() 함수를 호출
//                     getMedia();
//                 })
//                 .catch((err) => {
//                     window.alert('카메라 또는 마이크 접근 권한이 거부되었습니다. 모두 access할 수 있도록 설정을 변경해주세요');
//                 });
//         }
//     }, []);

//     return <video ref={myVideoRef} autoPlay />;
// }

// export default MyCamera;




