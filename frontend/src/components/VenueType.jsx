import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import PropTypes from 'prop-types';

const VenueType = ({ type, iconPath, onTypeClick }) => {
  const iconRef = useRef();
  const [animationInstance, setAnimationInstance] = useState(null);

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

  const handleClick = () => {
    onTypeClick(type);
    if(animationInstance) animationInstance.play();
  };

  return (
    <button className="venue-type" onClick={handleClick}>
      <span className="venue-type__icon" ref={iconRef}></span>
      {type}
    </button>
  );
};

VenueType.propTypes = {
  type: PropTypes.string.isRequired,
  iconPath: PropTypes.string.isRequired,
  onTypeClick: PropTypes.func.isRequired,
};

export default VenueType;
