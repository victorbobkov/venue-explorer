import { useParams, useNavigate } from 'react-router-dom';
import '../styles/BookingConfirmationView.css';
import useTelegram from '../hooks/useTelegram.js';
import { useEffect } from 'react';
import useAppStore from '../store.js';

const BookingConfirmationView = () => {
  const { id } = useParams();
  const { WebApp } = useTelegram();
  const navigate = useNavigate()

  // const venue = venues.find((v) => v.id.toString() === id) || {};
  const venue = useAppStore(state => state.venues.find(v => v.id.toString() === id)) || {};

  const handleEditDates = () => {
    // Handle dates edit
  };

  const handleEditGuests = () => {
    // Handle guests edit
  };

  // Configure Main Button and Back Button when component mounts and clean up when it unmounts
  useEffect(() => {
    WebApp.MainButton.show();
    WebApp.MainButton.setParams({ text: 'CONFIRM AND PAY' });
    WebApp.BackButton.show();

    const handleMainButtonClick = () => {
      console.log('Main Button clicked!')
    }

    const handleBackButtonClick = () => {
      navigate(`/details/${id}`);
    }

    WebApp.MainButton.onClick(handleMainButtonClick);
    WebApp.BackButton.onClick(handleBackButtonClick);

    return () => {
      // Clean up
      WebApp.MainButton.hide();
      WebApp.BackButton.hide();
      WebApp.MainButton.offClick(handleMainButtonClick);
      WebApp.BackButton.offClick(handleBackButtonClick);
    }
  }, [WebApp, navigate])

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
        <div>
          <p>Dates:
            <button onClick={handleEditDates}>Edit</button>
          </p>
          <p>Guests:  <button onClick={handleEditGuests}>Edit</button></p>
        </div>
      </div>

      <div className="booking-confirmation__price-details">
        <h2>Price Details</h2>
        <div>
          <p>Total Price:</p>
        </div>
      </div>

      <div className="booking-confirmation__payment">
        <h2>Pay with</h2>
      </div>
    </section>
  );
};

export default BookingConfirmationView;
