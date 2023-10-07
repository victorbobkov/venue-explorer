import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAppStore from '../../store.js';
import useTelegram from '../../hooks/useTelegram.js';
import { useInvoiceActions } from '../../hooks/useInvoiceActions.js';
import { createInvoice } from '../../fetchers/invoiceFetchers.js';
import ConfirmationHeader from '../../components/layout/BookingConfirmation/ConfirmationHeader';
import GetawaySnapshot from '../../components/layout/BookingConfirmation/GetawaySnapshot';
import PriceDetails from '../../components/layout/BookingConfirmation/PriceDetails';
import { handleInvoiceStatus } from '../../utils/handleInvoiceStatus.js';
import { VENUE_TYPES } from '../../constants/constants.js';
import { getDifferenceInDays } from '../../constants/dateUtilities.js';
import './BookingConfirmationView.css';

const BookingConfirmationView = () => {
  const { id } = useParams();
  const { WebApp } = useTelegram();
  const navigate = useNavigate();
  const { selectedDates, setSelectedDates } = useAppStore();

  const [guestDetails, setGuestDetails] = useState({ adults: 1, children: 0, pets: 0 });
  const [isEditingGuests, setIsEditingGuests] = useState(false);
  const [isEditingDates, setIsEditingDates] = useState(false);
  const createInvoiceMutation = useInvoiceActions(createInvoice, WebApp);
  const venue = useAppStore(state => state.venues.find(v => v.id.toString() === id)) || {};

  const isSingleDate = venue.typeId === VENUE_TYPES.AMUSEMENT;

  // Dynamically calculate the number of nights and total price
  let numberOfNights = 0;
  let totalPrice = 0;

  if (selectedDates.start && selectedDates.end && venue.price != null) {
    numberOfNights = venue.typeId === VENUE_TYPES.AMUSEMENT
      ? 1
      : getDifferenceInDays(selectedDates.start, selectedDates.end);
    const pricePerNight = Number(venue.price);
    totalPrice = numberOfNights * pricePerNight;
  }

  // Configure Main Button and Back Button when component mounts and clean up when it unmounts
  useEffect(() => {
    WebApp.MainButton.show();
    WebApp.MainButton.setParams({ text: 'CONFIRM AND PAY' });
    WebApp.BackButton.show();

    // Handle payment process on button click by sending request to server to create an invoice link
    const handleMainButtonClick = () => {
      createInvoiceMutation.mutate({
        title: venue.name,
        description: venue.description,
        payload: 'Payload',
        prices: [{
          label: "Booking Cost",
          amount: totalPrice * 100 // converting to cents
        }],
        image_url: venue.imageUrl
      });
    };

    const handleInvoiceClosed = (object) => {
      handleInvoiceStatus(WebApp, object.status);
    };

    const handleBackButtonClick = () => {
      navigate(`/details/${id}`);
    }

    WebApp.MainButton.onClick(handleMainButtonClick);
    WebApp.BackButton.onClick(handleBackButtonClick);
    WebApp.onEvent('invoiceClosed', handleInvoiceClosed);

    return () => {
      // Clean up
      WebApp.MainButton.hide();
      WebApp.BackButton.hide();
      WebApp.MainButton.offClick(handleMainButtonClick);
      WebApp.BackButton.offClick(handleBackButtonClick);
      WebApp.offEvent('invoiceClosed', handleInvoiceClosed);
    }
  }, [WebApp, navigate]);

  return (
    <section className="booking-confirmation">
      <ConfirmationHeader venue={venue} />
      <GetawaySnapshot
        selectedDates={selectedDates}
        guestDetails={guestDetails}
        isEditingDates={isEditingDates}
        setIsEditingDates={setIsEditingDates}
        isEditingGuests={isEditingGuests}
        setIsEditingGuests={setIsEditingGuests}
        setSelectedDates={setSelectedDates}
        setGuestDetails={setGuestDetails}
        isSingleDate={isSingleDate}
      />
      <PriceDetails venue={venue} numberOfNights={numberOfNights} totalPrice={totalPrice} />
    </section>
  );
};

export default BookingConfirmationView;
