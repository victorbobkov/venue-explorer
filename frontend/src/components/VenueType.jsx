import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import PropTypes from 'prop-types';

// Component for displaying and animating venue types
const VenueType = ({ type, iconPath, onTypeClick, isActive }) => {
  const iconRef = useRef();
  const [animationInstance, setAnimationInstance] = useState(null);

  // Load Lottie animation on mount and clean up on unmount
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: iconRef.current,
      path: iconPath,
      renderer: 'svg',
      loop: false,
      autoplay: false,
    });

    setAnimationInstance(animation);

    return () => {
      animation.destroy();
    };
  }, [iconPath]);

  const handleClick = (event) => {
    event.preventDefault();
    onTypeClick(type);
    if (animationInstance) {
      animationInstance.goToAndPlay(0, true);
    }
  };

  return (
    <button className={`venue-type ${isActive ? 'active' : ''}`} onClick={handleClick}>
      <span className="venue-type__icon" ref={iconRef}></span>
      {type}
    </button>
  );
};

VenueType.propTypes = {
  type: PropTypes.string.isRequired,
  iconPath: PropTypes.string.isRequired,
  onTypeClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default VenueType;
