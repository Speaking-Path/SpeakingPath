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
          <img src="/assets/user2.png" alt="User Icon" style={{ marginRight: '5px', width: '20px', height: '20px' }} />
          &nbsp;{getNicknameTag()}
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