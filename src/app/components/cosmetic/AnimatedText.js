'use client';
import React, { useState, useEffect } from 'react';
import '@/app/styles/globals.css';

const AnimatedText = ({ text, loading }) => {
  const [visibleLetters, setVisibleLetters] = useState(
    Array(text.length).fill(false),
  );
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (loading == false) {
      const interval = setInterval(() => {
        const newVisibleLetters = [...visibleLetters];
        let count = visibleCount;

        const revealCount = Math.ceil((text.length - visibleCount) / 10);

        for (let i = 0; i < revealCount; i++) {
          const randomIndex = Math.floor(Math.random() * (text.length - count));
          let j = 0;
          for (let k = 0; k < text.length; k++) {
            if (!newVisibleLetters[k]) {
              if (j === randomIndex) {
                newVisibleLetters[k] = true;
                count++;
                break;
              }
              j++;
            }
          }
        }

        setVisibleLetters(newVisibleLetters);
        setVisibleCount(count);

        if (count === text.length) {
          clearInterval(interval);
        }
      }, 45);

      return () => clearInterval(interval);
    }
  }, [text, visibleLetters, visibleCount, loading]);

  return (
    <div className={`animated-text tracking-wide font-base`}>
      {text.split('').map((letter, index) => (
        <span key={index} className={visibleLetters[index] ? 'visible' : ''}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
