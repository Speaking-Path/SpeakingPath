  // mute = async () => {
  //   const publisher = this.state.publisher
  //   publisher.publishAudio(false)
  //   this.setState({
  //     sound: false
  //   })
  // }

  // soundOn = async () => {
  //   const publisher = this.state.publisher
  //   publisher.publishAudio(true)
  //   this.setState({
  //     sound: true
  //   })
  // }

  // videoOff = async () => {
  //   const publisher = this.state.publisher
  //   publisher.publishVideo(false)
  //   this.setState({
  //     video: false
  //   })
  // }

  // videoOn = async () => {
  //   const publisher = this.state.publisher
  //   publisher.publishVideo(true)
  //   this.setState({
  //     video: true
  //   })
  // }


      // getToken()
    //   .then((token) => {
    //     mySession.connect(token, { clientData: myUserName })
    //       .then(async () => {

    //         let publisher = await OV.initPublisherAsync(undefined, {
    //           audioSource: undefined,
    //           videoSource: undefined,
    //           publishAudio: true,
    //           publishVideo: true,
    //           resolution: '640x480',
    //           frameRate: 30,
    //           insertMode: 'APPEND',
    //           mirror: false,
    //         });
    //         console.log("내 퍼블리셔", publisher)
    //         setPublisher(publisher);


    //         const devices = await OV.getDevices();
    //         const videoDevices = devices.filter(device => device.kind === 'videoinput');
    //         const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
    //         const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

    //         setCurrentVideoDevice(currentVideoDevice)
    //         setMainStreamManager(publisher)
    //         setPublisher(publisher)
    //       })
    //       .catch((error) => {
    //         console.log('There was an error connecting to the session:', error.code, error.message);
    //       });
    //   });