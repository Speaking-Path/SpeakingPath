import React, { useState, useEffect } from 'react';
import styles from './SelectTest.module.css'; // 모듈화된 CSS 파일을 import하여 적용

const SelectTest = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const options = [
    { value: '', label: '값을 선택해주세요' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sass', label: 'SASS' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'jquery', label: 'jQuery' },
  ];

  useEffect(() => {
    const initialOption = options[0];
    setSelectedOption(initialOption.value);
  }, []);


  const handleSelectClick = () => {
    setIsSelectOpen((prevOpen) => !prevOpen);
  };

  const handleOptionClick = (newValue) => {
    setSelectedOption(newValue);
    setIsSelectOpen(false);
  };

  return (
    <div className={styles['select-container']}>
      <div className={`${styles.selection}`} onClick={handleSelectClick}>
        <p>
          <span>{options.find((option) => option.value === selectedOption)?.label}</span>
        </p>
        <span className={`${styles['arrow-icon']} ${isSelectOpen ? styles['arrow-up'] : ''}`}></span>
      </div>
      {isSelectOpen && (
        <div>
          {options.map((option) => (
            <div
              className={`${styles['option-container']} ${styles['option-appear']}`}
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              <p>{option.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>

  );
};

export default SelectTest;
