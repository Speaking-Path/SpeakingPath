import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import styles from './UserVideo.module.css';

const UserVideoComponent = (props) => {
  const getNicknameTag = () => {
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };

  return (
    <div>
      <div>
        <p className={styles.nickname}>{getNicknameTag()}</p>
      </div>
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={props.streamManager} />
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;