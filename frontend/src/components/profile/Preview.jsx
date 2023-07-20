import styles from './Preview.module.css';

const Preview = ({ isOpen, onClose, children, size }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.preview}>
      <div className={`${styles.previewContent} ${size === 'large' ? styles.large : ''}`}>
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Preview;

// import styles from './Preview.module.css';

// const Preview = ({ isOpen, onClose, children, size }) => {
//   if (!isOpen) return null;

//   return (
//     <div className={styles.Preview}>
//       <div className={`${styles.PreviewContent} ${size === 'large' ? styles.large : ''}`}>
//         {children}
//         <button onClick={onClose}>닫기</button>
//       </div>
//     </div>
//   );
// };

// export default Preview;