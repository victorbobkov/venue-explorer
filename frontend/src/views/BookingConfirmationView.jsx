import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAppStore from '../store.js';
import useTelegram from '../hooks/useTelegram.js';
import '../styles/BookingConfirmationView.css';
import EditGuestsModal from '../components/EditGuestsModal.jsx';
import { format } from 'date-fns';
import EditDatesModal from '../components/EditDatesModal.jsx';
import { getDifferenceInDays } from '../constants/dateUtilities';

const BookingConfirmationView = () => {
  const { id } = useParams();
  const { WebApp } = useTelegram();
  const navigate = useNavigate();
  const { selectedDates, setSelectedDates } = useAppStore();

  const venue = useAppStore(state => state.venues.find(v => v.id.toString() === id)) || {};
  const [guestDetails, setGuestDetails] = useState({ adults: 1, children: 0, pets: 0 });
  const [isEditingGuests, setIsEditingGuests] = useState(false);
  const [isEditingDates, setIsEditingDates] = useState(false);

  const isSingleDate = venue.typeId === 4;

  // Dynamically calculate the number of nights and total price
  let numberOfNights = 0;
  let totalPrice = 0;

  if (selectedDates.start && selectedDates.end && venue.price != null) {
    numberOfNights = venue.typeId === 4 ? 1 : getDifferenceInDays(selectedDates.start, selectedDates.end);
    const pricePerNight = Number(venue.price);
    totalPrice = numberOfNights * pricePerNight;
  }

  let formattedDates;
  if (isSingleDate && selectedDates.start) {
    formattedDates = format(selectedDates.start, 'MMM d');
  } else if (selectedDates.start && selectedDates.end) {
    formattedDates = `${format(selectedDates.start, 'MMM d')} - ${format(selectedDates.end, 'd')}`;
  } else {
    formattedDates = "Dates not selected";
  }

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
    if (!isEditingGuests) {
      setIsEditingDates(true);
    }
  };

  const handleSaveDateDetails = (startDate, endDate) => {
    setSelectedDates(startDate, endDate);
    setIsEditingDates(false);
  };

  const handleCancelEditDates = () => {
    setIsEditingDates(false);
  };

  const handleEditGuests = () => {
    if (!isEditingDates) {
      setIsEditingGuests(true);
    }
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
          <div className="booking-confirmation__item">
            <span>Dates: <br/> {formattedDates}</span>
          </div>
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
          <span className="booking-confirmation__price-normal">
            {Number(venue.price)} x {numberOfNights} nights
          </span>
          <span className="booking-confirmation__price-value">
            ${totalPrice}
          </span>
        </div>
        <div className="booking-confirmation__item">
          <span className="booking-confirmation__price-label">Total Price:</span>
          <span className="booking-confirmation__price-value">${totalPrice}</span>
        </div>
      </div>
      <EditGuestsModal
        isVisible={isEditingGuests}
        onSave={handleSaveGuestDetails}
        onCancel={handleCancelEditGuests}
      />
      <EditDatesModal
        isVisible={isEditingDates}
        onSave={handleSaveDateDetails}
        onCancel={handleCancelEditDates}
        startDate={selectedDates.start}
        endDate={selectedDates.end}
        isSingleDate={isSingleDate}
      />
    </section>
  );
};

export default BookingConfirmationView;
