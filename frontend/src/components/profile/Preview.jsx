import React from 'react';
import styles from './Preview.module.css';
import MyCamera from './MyCamera'; 

const Preview = ({ isOpen, onClose, children, size }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.preview}>
      <div className={`${styles.previewContent} ${size === 'large' ? styles.large : ''}`}>
        {children}
        <MyCamera />
        <div>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default Preview;

