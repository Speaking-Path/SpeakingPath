import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './SecondPart.css'

const AnimationComponent = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.text0', {
      x: '20%',
      rotate: 10,
      duration: 0.85,
      scrollTrigger: {
        trigger: '.text0',
        scrub: true,
        start: 'top 20%'
      }
    });

    gsap.to('.text2', {
      x: '20%',
      rotate: 10,
      duration: 0.85,
      scrollTrigger: {
        trigger: '.text2',
        scrub: true,
        start: 'top 40%'
      }
    });

    gsap.to('.text1', {
      x: '-20%',
      rotate: -10,
      duration: 0.85,
      scrollTrigger: {
        trigger: '.text1',
        scrub: true,
        start: 'top 30%'
      }
    });

    gsap.to('.text3', {
      x: '-20%',
      rotate: -10,
      duration: 0.85,
      scrollTrigger: {
        trigger: '.text3',
        scrub: true,
        start: 'top 40%'
      }
    });

    // Cleanup function to remove event listener when the component unmounts
  }, []);

  return (
    <div className="SecondPartBody">
      <div id="SecondParttext" className="SecondParttext0">언어훈련</div>
      <div id="SecondParttext" className="SecondParttext1">치료상담</div>
      <div id="SecondParttext" className="SecondParttext2">이 모든 것을</div>
      <div id="SecondParttext" className="SecondParttext3">말하길에서</div>
    </div>
  );
};

export default AnimationComponent;
