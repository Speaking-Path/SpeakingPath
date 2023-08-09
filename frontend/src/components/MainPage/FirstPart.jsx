import React, { useEffect, useState } from 'react';
import './FirstPart.css'

const FirstPart = () => {
  const [didScroll, setDidScroll] = useState(false);

  const scrollInProgress = () => {
    setDidScroll(true);
  };

  useEffect(() => {
    const parallaxTitles = document.querySelectorAll('.paralax-title');

    const updateParallaxTitles = () => {
      parallaxTitles.forEach((element) => {
        element.style.transform = `translateX(${window.scrollY / 10}%)`;
      });
      setDidScroll(false);
    };

    const raf = () => {
      if (didScroll) {
        updateParallaxTitles();
      }
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    window.addEventListener('scroll', scrollInProgress);

    return () => {
      window.removeEventListener('scroll', scrollInProgress);
    };
  }, [didScroll]);

  return (
    <div className="first-part-body">
    <div className="outer-container">
      <div
        className="image-container"
      >
        <h2 className="section-title on-dark">
          <span className="paralax-title">
            당신의 세상에서, 말하길
          </span>
        </h2>
      </div>

      <h2 className="section-title">
        <span className="paralax-title">
          당신의 세상에서, 말하길
        </span>
      </h2>
    </div>
    </div>
  );
};

export default FirstPart;
