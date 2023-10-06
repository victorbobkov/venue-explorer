import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAppStore from '../../store.js';
import useTelegram from '../../hooks/useTelegram.js';
import ConfirmationHeader from '../../components/layout/BookingConfirmation/ConfirmationHeader';
import GetawaySnapshot from '../../components/layout/BookingConfirmation/GetawaySnapshot';
import PriceDetails from '../../components/layout/BookingConfirmation/PriceDetails';
import { VENUE_TYPES } from '../../constants/constants.js';
import { getDifferenceInDays } from '../../constants/dateUtilities.js';
import './BookingConfirmationView.css';
import { API_BASE_URL } from '../../constants/constants.js';

const BookingConfirmationView = () => {
  const { id } = useParams();
  const { WebApp } = useTelegram();
  const navigate = useNavigate();
  const { selectedDates, setSelectedDates } = useAppStore();

  const venue = useAppStore(state => state.venues.find(v => v.id.toString() === id)) || {};
  const [guestDetails, setGuestDetails] = useState({ adults: 1, children: 0, pets: 0 });
  const [isEditingGuests, setIsEditingGuests] = useState(false);
  const [isEditingDates, setIsEditingDates] = useState(false);

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

    const handleMainButtonClick = async () => {
      try {
        // Construct URL for request to the server
        const invoiceRequestUrl = new URL(`${API_BASE_URL}/create-invoice-link`);

        // Set parameters
        invoiceRequestUrl.searchParams.set('description', 'Description');
        invoiceRequestUrl.searchParams.set('payload', 'Payload');
        invoiceRequestUrl.searchParams.set('prices', JSON.stringify([{
          label: "Booking Cost",
          amount: 10000 // in cents
        }]));

        // Fetch the invoice link from the server
        const response = await fetch(invoiceRequestUrl.toString());
        const data = await response.json();

        // Open the invoice link using WebApp
        if(data && data.result) {
          WebApp.openInvoice(data.result);
        } else {
          console.error("Failed to retrieve payment link", data);
        }

      } catch (error) {
        console.error("Error fetching the payment URL:", error);
      }
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
