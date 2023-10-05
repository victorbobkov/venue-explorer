import { useState } from 'react';
import PropTypes from 'prop-types';
import CustomDatePicker from '../CustomDatePicker';
import './EditDatesModal.css';

const EditDatesModal = ({ isVisible, onSave, onCancel, startDate: initialStartDate, endDate: initialEndDate, isSingleDate }) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const handleDateChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return isVisible ? (
    <div className="modal">
      <h2>Select Dates</h2>
      <CustomDatePicker
        isSingleDate={isSingleDate}
        onDateChange={(newStartDate) => setStartDate(newStartDate)}
        onDateRangeChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
      />
      <div className="modal__buttons">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={() => { onSave(startDate, endDate) }}>Save</button>
      </div>
    </div>
  ) : null;
};

EditDatesModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  isSingleDate: PropTypes.bool.isRequired,
}

export default EditDatesModal;
