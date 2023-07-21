import React, { useState } from 'react';
import styles from './Preview.module.css';
import MyCamera from './MyCamera'; 
import MyCameraOption from './MyCameraOption';

const Preview = ({ isOpen, onClose, children, size }) => {
  const [selectedVideoSource, setSelectedVideoSource] = useState('');
  const [selectedAudioSource, setSelectedAudioSource] = useState('');

  if (!isOpen) return null;

  return (
    <div className={styles.preview}>
      <div className={`${styles.previewContent} ${size === 'large' ? styles.large : ''}`}>
        {children}
        <MyCamera 
          selectedVideoSource={selectedVideoSource}
          selectedAudioSource={selectedAudioSource}   
        />
        <MyCameraOption
          selectedVideoSource={selectedVideoSource}
          onSelectedVideoChange={(videoSource) => setSelectedVideoSource(videoSource)}
          selectedAudioSource={selectedAudioSource}
          onSelectedAudioChange={(audioSource) => setSelectedAudioSource(audioSource)}
        />
        <div>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default Preview;

