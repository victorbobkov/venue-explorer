import PropTypes from 'prop-types';
import './ConfirmationHeader.css';

const ConfirmationHeader = ({ venue }) => {
  return (
    <div className="booking-confirmation__header">
      <img src={venue.imageUrl} alt={`${venue.name} venue`} className="booking-confirmation__image" />
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
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
  }).isRequired
};

export default ConfirmationHeader;
