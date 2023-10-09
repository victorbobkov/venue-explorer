import PropTypes from 'prop-types';
import './PriceDetails.css';

const PriceDetails = ({ venue, numberOfNights, totalPrice, isAmusement, guestCount }) => {
  return (
    <div className="booking-confirmation__price-details">
      <h2 className="booking-confirmation__price-details--header">
        Price Details
      </h2>
      <div className="booking-confirmation__item">
        {isAmusement ? (
          <>
            <span className="booking-confirmation__price-normal">
              {Number(venue.price)} x {guestCount} guests
            </span>
            <span className="booking-confirmation__price-value">
              ${totalPrice}
            </span>
          </>
        ) : (
          <>
            <span className="booking-confirmation__price-normal">
              {Number(venue.price)} x {numberOfNights} nights
            </span>
            <span className="booking-confirmation__price-value">
              ${totalPrice}
            </span>
          </>
        )}
      </div>
      <div className="booking-confirmation__item">
        <span className="booking-confirmation__price-label">Total Price:</span>
        <span className="booking-confirmation__price-value">${totalPrice}</span>
      </div>
    </div>
  );
};

PriceDetails.propTypes = {
  venue: PropTypes.shape({
    price: PropTypes.number.isRequired,
  }).isRequired,
  numberOfNights: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  isAmusement: PropTypes.bool,
  guestCount: PropTypes.number
};

export default PriceDetails;

