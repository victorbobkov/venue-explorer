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

    // Handle payment process on button click by sending request to server to create an invoice link
    const handleMainButtonClick = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/createInvoice`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: 'Description',
            payload: 'Payload',
            prices: [{
              label: "Booking Cost",
              amount: 10000 // in cents
            }]
          })
        });

        if(!response.ok) {
          console.error("Error: ", response.status, await response.text());
          return;
        }

        const data = await response.json();

        // If the data is valid, use the Telegram WebApp to open the invoice link for payment
        if (data && data.result) {
          WebApp.openInvoice(data.result);
        } else {
          console.error("Failed to retrieve payment link", data);
        }
      } catch (error) {
        console.error("Error fetching the payment URL:", error);
      }
    };

    // Handler for the event when the invoice UI is closed
    // Optionally handle different payment statuses: paid, cancelled, failed, pending
    const handleInvoiceClosed = (object) => {
      console.log("Invoice closed event received:", object);
      switch (object.status) {
        case 'paid':
          console.log("Payment successful");
          navigate(`/`);
          break;
        case 'cancelled':
          console.log("Payment was cancelled");
          alert("Payment was cancelled. Your booking is not confirmed.");
          break;
        case 'failed':
          console.log("Payment failed");
          alert("Don’t worry. We will keep your selection.");
          break;
        case 'pending':
          console.log("Payment is pending");
          alert("Payment is pending. We will notify you once the payment is confirmed.");
          break;
        default:
          console.log("Unexpected payment status:", object.status);
          alert("An unexpected status was returned. Please try again later.");
          break;
      }
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
