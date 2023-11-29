import React, { useState, useEffect } from 'react';

const TypewriterEffect = ({ words, typeSpeed, deleteSpeed, delaySpeed }) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const wordLength = currentWord?.length;

    const type = () => {
      if (text !== currentWord) {
        setText(currentWord?.slice(0, text?.length + 1));
      } else {
        setIsDeleting(true);
      }
    };

    const erase = () => {
      if (text !== '') {
        setText(currentWord?.slice(0, text?.length - 1));
      } else {
        setIsDeleting(false);
        setWordIndex((prevIndex) => (prevIndex + 1) % words?.length);
      }
    };

    const handleTyping = () => {
      if (!isDeleting) {
        type();
      } else {
        erase();
      }
    };

    const typingInterval = setInterval(handleTyping, isDeleting ? deleteSpeed : typeSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, wordIndex, isDeleting, words, typeSpeed, deleteSpeed]);

  useEffect(() => {
    const transitionInterval = setTimeout(() => {
      setIsDeleting(true);
    }, delaySpeed);

    return () => {
      clearTimeout(transitionInterval);
    };
  }, [wordIndex, delaySpeed]);

  return <span>{text}</span>;
};

export default TypewriterEffect;
