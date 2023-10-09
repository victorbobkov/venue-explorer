import PropTypes from 'prop-types';
import { format } from 'date-fns';
import EditGuestsModal from '../../../common/EditGuestsModal';
import EditDatesModal from '../../../common/EditDatesModal';
import './GetawaySnapshot.css'

const GetawaySnapshot = ({
  selectedDates,
  guestDetails,
  isEditingDates,
  setIsEditingDates,
  isEditingGuests,
  setIsEditingGuests,
  setSelectedDates,
  setGuestDetails,
  isSingleDate
}) => {
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

  let formattedDates;
  if (selectedDates.start && selectedDates.end) {
    isSingleDate
      ? formattedDates = `${format(selectedDates.start, 'MMM d')}`
      : formattedDates = `${format(selectedDates.start, 'MMM d')} - ${format(selectedDates.end, 'd')}`;
  } else {
    formattedDates = "Dates not selected";
  }

  return (
    <>
      <div className="booking-confirmation__trip-details">
        <h2 className="booking-confirmation__trip-details--header">
          Getaway Snapshot
        </h2>
        <div className="booking-confirmation__item">
          <span>Dates: <br/> {formattedDates}</span>
          <button onClick={handleEditDates} className="booking-confirmation__item--button">Edit</button>
        </div>
        <div className="booking-confirmation__item">
          <span>Guests: <br/> {guestDetails.adults + guestDetails.children} guests, {guestDetails.pets} pets</span>
          <button onClick={handleEditGuests} className="booking-confirmation__item--button">Edit</button>
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
    </>
  );
};

GetawaySnapshot.propTypes = {
  selectedDates: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  guestDetails: PropTypes.shape({
    adults: PropTypes.number,
    children: PropTypes.number,
    pets: PropTypes.number
  }).isRequired,
  isEditingDates: PropTypes.bool.isRequired,
  setIsEditingDates: PropTypes.func.isRequired,
  isEditingGuests: PropTypes.bool.isRequired,
  setIsEditingGuests: PropTypes.func.isRequired,
  setSelectedDates: PropTypes.func.isRequired,
  setGuestDetails: PropTypes.func.isRequired,
  isSingleDate: PropTypes.bool.isRequired
};

export default GetawaySnapshot;
