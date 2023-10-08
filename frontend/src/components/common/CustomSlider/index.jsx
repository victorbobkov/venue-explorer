import { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const CustomSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const diffX = startX - endX;

    if (Math.abs(diffX) >= 50) { // Threshold for swipe
      if (diffX > 0) {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    }

    // Reset start and end X positions.
    setStartX(0);
    setEndX(null);
  };

  const handleTouchMove = (e) => {
    setEndX(e.touches[0].clientX);
  };

  const handleDotClick = (index, e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentIndex(index);
  };

  return (
    <div
      className="custom-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="slider-content">
        <div
          className="slides"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s ease-out' }}
        >
          {images.map((img, index) => (
            <img src={img} key={index} alt={`Slide ${index + 1}`} className="slide-image" />
          ))}
        </div>

      </div>
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={(e) => handleDotClick(index, e)}
          />
        ))}
      </div>
    </div>
  );
};

CustomSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CustomSlider;
