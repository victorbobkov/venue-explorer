import LottieAnimation from './LottieAnimation.jsx';
import PropTypes from 'prop-types';

// Component for displaying and animating venue types
const VenueType = ({ type, iconPath, onTypeClick, isActive, shouldAnimate }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onTypeClick(type);
  };

  return (
    <button
      className={`venue-type ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label={`Select ${type} venue type`}
      aria-pressed={isActive}
    >
      <LottieAnimation path={iconPath} playAnimation={shouldAnimate} />
      {type}
    </button>
  );
};

VenueType.propTypes = {
  type: PropTypes.string.isRequired,
  iconPath: PropTypes.string.isRequired,
  onTypeClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  shouldAnimate: PropTypes.bool.isRequired,
};

export default VenueType;
