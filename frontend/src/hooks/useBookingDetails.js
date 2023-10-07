import { VENUE_TYPES } from '../constants/constants.js';
import { getDifferenceInDays } from '../constants/dateUtilities.js';

export const useBookingDetails = (venue, selectedDates) => {
  const isSingleDate = venue.typeId === VENUE_TYPES.AMUSEMENT;

  let numberOfNights = 0;
  let totalPrice = 0;

  if (selectedDates.start && selectedDates.end && venue.price != null) {
    numberOfNights = isSingleDate
      ? 1
      : getDifferenceInDays(selectedDates.start, selectedDates.end);
    const pricePerNight = Number(venue.price);
    totalPrice = numberOfNights * pricePerNight;
  }

  return { numberOfNights, totalPrice, isSingleDate };
};
