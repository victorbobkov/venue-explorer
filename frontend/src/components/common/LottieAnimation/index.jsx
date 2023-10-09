import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';
import PropTypes from 'prop-types';
import './LottieAnimation.css';

const LottieAnimation = ({ path, playAnimation }) => {
  const animationRef = useRef();
  const [animationInstance, setAnimationInstance] = useState(null);

  // Load Lottie animation when the component mounts and clean up the animation instance when the component unmounts
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationRef.current ?? undefined,
      path: path,
      renderer: 'canvas',
      loop: false,
      autoplay: false,
      rendererSettings: {
        progressiveLoad: true,
      }
    });

    setAnimationInstance(animation);

    return () => {
      animation.destroy();
    };
  }, [path]);

  // Play the animation when 'playAnimation' is true
  useEffect(() => {
    if (playAnimation && animationInstance) {
      animationInstance.goToAndPlay(0, true);
    }
  }, [playAnimation, animationInstance]);

  return (
    <span className="venue-type__icon" ref={animationRef}></span>
  );
};

LottieAnimation.propTypes = {
  path: PropTypes.string.isRequired,
  playAnimation: PropTypes.bool.isRequired,
}

export default LottieAnimation;
