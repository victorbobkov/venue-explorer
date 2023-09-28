import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import PropTypes from 'prop-types';

// Component for displaying and animating venue types
const VenueType = ({ type, iconPath, onTypeClick, isActive }) => {
  const iconRef = useRef();
  const [animationInstance, setAnimationInstance] = useState(null);

  // Load Lottie animation when the component mounts and clean up the animation instance when the component unmounts
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: iconRef.current,
      path: iconPath,
      renderer: 'canvas',
      loop: false,
      autoplay: false,
    });

    setAnimationInstance(animation);

    return () => {
      animation.destroy();
    };
  }, [iconPath]);

  // Handle click event on the component, trigger the attached animation
  // and invoke the provided onTypeClick handler with the type as an argument
  const handleClick = (event) => {
    event.preventDefault();
    onTypeClick(type);
    if (animationInstance) {
      animationInstance.goToAndPlay(0, true);
    }
  };

  return (
    <button
      className={`venue-type ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label={`Select ${type} venue type`}
      aria-pressed={isActive}
    >
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
