import PropTypes from 'prop-types';
import './ConfirmationHeader.css';
import CustomSlider from '../../../common/CustomSlider/index.jsx';

const ConfirmationHeader = ({ venue }) => {
  return (
    <div className="booking-confirmation__header">
      <CustomSlider images={venue.imageUrls} height="150px" width="100%" />
      <div className="booking-confirmation__info">
        <h1 className="booking-confirmation__name">{venue.name}</h1>
        <span className="booking-confirmation__rating">
          <img src="/assets/icons/icons8-star-50.png" alt="Star icon" className="booking-confirmation__icon"/> {venue.rating}
        </span>
      </div>
    </div>
  );
};

ConfirmationHeader.propTypes = {
  venue: PropTypes.shape({
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
  }).isRequired
};

export default ConfirmationHeader;
