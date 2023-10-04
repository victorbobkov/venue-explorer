import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAppStore from '../store.js';
import useTelegram from '../hooks/useTelegram.js';
import { venues} from '../constants/index.js';
import '../styles/BookingConfirmationView.css';
import EditGuestsModal from '../components/EditGuestsModal.jsx';

const BookingConfirmationView = () => {
  const { id } = useParams();
  const { WebApp } = useTelegram();
  const navigate = useNavigate();

  // const venue = venues.find((v) => v.id.toString() === id) || {};
  const venue = useAppStore(state => state.venues.find(v => v.id.toString() === id)) || {};

  const [guestDetails, setGuestDetails] = useState({ adults: 1, children: 0, pets: 0 });
  const [isEditingGuests, setIsEditingGuests] = useState(false);

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
  }, [WebApp, navigate]);

  const handleEditDates = () => {
    // Handle dates edit
  };

  const handleEditGuests = () => {
    setIsEditingGuests(true);
  };

  const handleSaveGuestDetails = (details) => {
    setGuestDetails(details);
    setIsEditingGuests(false);
  };

  const handleCancelEditGuests = () => {
    setIsEditingGuests(false);
  };

  return (
    <section className="booking-confirmation">
      <div className="booking-confirmation__header">
        <img src={venue.imageUrl} alt={`${venue.name} venue`} className="booking-confirmation__image" />
        <div className="booking-confirmation__info">
          <h1 className="booking-confirmation__name">{venue.name}</h1>
          <span className="booking-confirmation__rating">
            <img src="/assets/icons/icons8-star-50.png" alt="Star icon" className="booking-confirmation__icon"/> {venue.rating}
          </span>
        </div>
      </div>

      <div className="booking-confirmation__trip-details">
        <h2 className="booking-confirmation__trip-details--header">
          Getaway Snapshot
        </h2>
        <div className="booking-confirmation__item">
          <span>Dates: <br/> Nov 5 - 10</span>
          <button onClick={handleEditDates} className="booking-confirmation__item--button">Edit</button>
        </div>
        <div className="booking-confirmation__item">
          <span>Guests: <br/> {guestDetails.adults + guestDetails.children} guests, {guestDetails.pets} pets</span>
          <button onClick={handleEditGuests} className="booking-confirmation__item--button">Edit</button>
        </div>
      </div>

      <div className="booking-confirmation__price-details">
        <h2 className="booking-confirmation__trip-details--header">
          Price Details
        </h2>
        <div className="booking-confirmation__item">
          <span className="booking-confirmation__price-normal">$100 x 7 nights</span>
          <span className="booking-confirmation__price-value">$700</span>
        </div>
        <div className="booking-confirmation__item">
          <span className="booking-confirmation__price-label">Total Price:</span>
          <span className="booking-confirmation__price-value">$700</span>
        </div>
      </div>
      <EditGuestsModal
        isVisible={isEditingGuests}
        onSave={handleSaveGuestDetails}
        onCancel={handleCancelEditGuests}
      />
    </section>
  );
};

export default BookingConfirmationView;
