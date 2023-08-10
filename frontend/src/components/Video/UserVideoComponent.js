import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import styles from './UserVideo.module.css';

const UserVideoComponent = (props) => {
  const getNicknameTag = () => {
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };

  return (
    <div className={styles.videobox}>
      <div className='nick-name' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={styles.nickname}>
          <i class="bi bi-person-bounding-box"></i> 
          {getNicknameTag()}
        </div>
      </div>

      {props.streamManager !== undefined ? (
        <div className={`${styles.videoContainer} streamcomponent`}>
          <OpenViduVideoComponent streamManager={props.streamManager} />
        </div>
      ) : null}

    </div>
  );
};

export default UserVideoComponent;