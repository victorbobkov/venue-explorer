import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import PropTypes from 'prop-types';

// Reusable component for displaying and animating Lottie icons
const LottieIcon = ({ iconPath, onIconClick }) => {
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
    onIconClick();
    if (animationInstance) {
      animationInstance.goToAndPlay(0, true);
    }
  };

  return (
    <button className="lottie-icon" onClick={handleClick}>
      <span className="lottie-icon__animation" ref={iconRef}></span>
    </button>
  );
};

LottieIcon.propTypes = {
  iconPath: PropTypes.string.isRequired,
  onIconClick: PropTypes.func.isRequired,
}

export default LottieIcon;
