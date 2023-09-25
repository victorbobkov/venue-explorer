import LottieIcon from './LottieIcon.jsx';
import PropTypes from 'prop-types';

// Component for displaying and animating venue types
const VenueType = ({ type, iconPath, onTypeClick }) => {

  return (
    <LottieIcon iconPath={iconPath} onIconClick={() => onTypeClick(type)} />
  );
};

VenueType.propTypes = {
  type: PropTypes.string.isRequired,
  iconPath: PropTypes.string.isRequired,
  onTypeClick: PropTypes.func.isRequired,
};

export default VenueType;
