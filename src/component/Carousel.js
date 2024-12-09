import React, { useState, useEffect } from 'react';
import next from './next.png';
import back from './back.png'

const Carousel = ({ items, interval = 5000, tips }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(autoSlide); // Cleanup interval on unmount
  }, [interval]);

  return (
    <>
    <div className="carousel">
      <button onClick={prevSlide} className="carousel-button prev"><img src={back} alt='previous'/></button>
      <div className="carousel-content" style={{textAlign:"center"}}>
       {tips[currentIndex]}: 
        {items[currentIndex]}
      </div>
      <button onClick={nextSlide} className="carousel-button next"><img src={next} alt='next'/></button>
    </div>
    </>
  );
};

export default Carousel;
