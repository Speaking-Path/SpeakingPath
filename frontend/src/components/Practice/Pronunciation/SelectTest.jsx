import React, { useState } from 'react';
import './SelectTest.module.css'; // Make sure to import your CSS file

function SelectTest() {
  const [selectedPlatform, setSelectedPlatform] = useState('Select a platform');
  const [showOptions, setShowOptions] = useState(false);

  const platformOptions = [
    { value: 'codepen', label: 'CodePen', icon: 'fab fa-codepen' },
    { value: 'dribbble', label: 'Dribbble', icon: 'fab fa-dribbble' },
    { value: 'behance', label: 'Behance', icon: 'fab fa-behance' },
    { value: 'hackerrank', label: 'HackerRank', icon: 'fab fa-hackerrank' },
    { value: 'stackoverflow', label: 'StackOverflow', icon: 'fab fa-stack-overflow' },
    { value: 'freecodecamp', label: 'FreeCodeCamp', icon: 'fab fa-free-code-camp' },
  ];

  const handlePlatformSelect = (value) => {
    setSelectedPlatform(value);
    setShowOptions(false);
  };

  return (
    <div id="app-cover">
      <div
        id="select-button"
        className="brd"
        onClick={() => setShowOptions(!showOptions)}
      >
        <div id="selected-value">
          <span>{selectedPlatform}</span>
        </div>
        <div id="chevrons">
          <i className="fas fa-chevron-up"></i>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      {showOptions && (
        <div id="options">
          {platformOptions.map((option) => (
            <div
              key={option.value}
              className="option"
              onClick={() => handlePlatformSelect(option.label)}
            >
              <input
                className="s-c top"
                type="radio"
                name="platform"
                value={option.value}
              />
              <input
                className="s-c bottom"
                type="radio"
                name="platform"
                value={option.value}
              />
              <i className={option.icon}></i>
              <span className="label">{option.label}</span>
              <span className="opt-val">{option.label}</span>
            </div>
          ))}
          <div id="option-bg"></div>
        </div>
      )}
    </div>
  );
}

export default SelectTest;
