import { useParams } from 'react-router-dom';
import { venues } from '../constants/index.js';
import '../styles/BookingConfirmationView.css';

const BookingConfirmationView = () => {
  const { id } = useParams();
  const venue = venues.find((v) => v.id.toString() === id) || {};

  return (
    <section className="booking-confirmation">
      <div className="booking-confirmation__header">
        <img src={venue.imageUrl} alt={`${venue.name} venue`} className="booking-confirmation__image" />
        <div className="booking-confirmation__info">
          <h1 className="booking-confirmation__name">{venue.name}</h1>
          <span className="booking-confirmation__rating">⭐️ {venue.rating}</span>
        </div>
      </div>

      <div className="booking-confirmation__trip-details">
        <h2>Getaway Snapshot</h2>
        {/* Dates and Guests information with edit buttons */}
      </div>

      <div className="booking-confirmation__price-details">
        <h2>Price Details</h2>
        {/* Price Calculation based on selected dates and guests */}
      </div>

      <div className="booking-confirmation__payment">
        <h2>Pay with</h2>
        {/* Payment method form */}
      </div>
    </section>
  );
};

export default BookingConfirmationView;
