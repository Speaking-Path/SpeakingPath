import React, { useRef, useEffect, useState } from 'react';

// selectedVideoSource가 변경될 때마다 useEffect가 실행되도록 추가해야 함 

function MyCamera({ selectedVideoSource }) {
  const myVideoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    async function getMedia() {
      try {
        // 선택한 비디오 소스가 "no-camera"인 경우 비디오 스트림을 요청하지 않음
        if (selectedVideoSource === 'no-camera') {
            if (myVideoRef.current) {
                myVideoRef.current.srcObject = null; // 비디오 스트림을 제거
            }
            return;
        }

        const constraints = {
          video: {
            deviceId: selectedVideoSource ? { exact: selectedVideoSource } : undefined,
          },
          audio: true,
        };
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
      // 컴포넌트가 unmount 되면 스트림 해제
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [selectedVideoSource]);

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




