import { useCallback, useEffect, useRef } from 'react';

import ReactCanvasConfetti from 'react-canvas-confetti';
import styles from './Confetti.module.css'

export default function WrongConfetti() {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  // const makeShot = useCallback((particleRatio, opts) => {
  //   refAnimationInstance.current &&
  //     refAnimationInstance.current({
  //       ...opts,
  //       origin: { x: Math.random(), y: Math.random() },
  //       particleCount: Math.floor(200 * particleRatio)
  //     });
  // }, []);

  // useEffect(() => fire(), []);

  // const fire = useCallback(() => {
  //   makeShot(0.25, {
  //     spread: 180,
  //     startVelocity: 55,
  //     shapes: ['circle', 'square',],
  //     origin: { x: -30, y: 0 },
  //     particleLifetime: 5000,
  //   });

  //   makeShot(0.2, {
  //     spread: 150,
  //     shapes: ['circle', 'square',],
  //     particleLifetime: 5000,
  //   });

  //   makeShot(0.35, {
  //     spread: 100,
  //     decay: 0.91,
  //     shapes: ['circle', 'square',],
  //     scalar: 0.8,
  //     particleLifetime: 5000,
  //   });

  //   makeShot(0.1, {
  //     spread: 120,
  //     startVelocity: 25,
  //     decay: 0.92,
  //     shapes: ['circle', 'square',],
  //     scalar: 1.2,
  //     particleLifetime: 5000,
  //   });

  //   makeShot(0.1, {
  //     spread: 360,
  //     shapes: ['circle', 'square',],
  //     startVelocity: 45,
  //     colors: ['#FF0000', '#00FF00', '#0EB1D2', '#A42CD6'],
  //     particleLifetime: 5000,
  //   });

  //   makeShot(0.2, {
  //     spread: 120,
  //     startVelocity: 25,
  //     shapes: ['circle', 'square',],
  //     decay: 0.92,
  //     scalar: 1.2,
  //     colors: ['#FF0000', '#00FF00', '#0EB1D2', '#A42CD6'],
  //     particleLifetime: 5000,
  //   })

  //   makeShot(0.2, {
  //     spread: 120,
  //     startVelocity: 45,
  //     shapes: ['circle', 'square',],
  //     decay: 0.92,
  //     scalar: 1.2,
  //     origin: { x: 1, y: 0 },
  //     colors: ['#FFA500', '#FFFF00', '#FF00FF'],
  //     particleLifetime: 5000,
  //   })

  //   makeShot(0.2, {
  //     particleCount: 2,
  //     angle: 60,
  //     shapes: ['circle', 'square',],
  //     spread: 55,
  //     origin: { x: 0, y: 1 },
  //     colors: ['#bb0000', '#ffffff'],
  //     particleLifetime: 5000,
  //   })

    
  // }, [makeShot])

  

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
    />
  );
}