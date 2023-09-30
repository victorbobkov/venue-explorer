import { useState } from 'react';
import { format, parse } from 'date-fns';
import PropTypes from 'prop-types';

const CustomDatePicker = ({ isSingleDate, onDateChange, onDateRangeChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const today = format(new Date(), 'yyyy-MM-dd');

  const handleStartDateChange = (e) => {
    const dateStr = e.target.value;
    const date = parse(dateStr, 'yyyy-MM-dd', new Date());
    setStartDate(dateStr);
    if (isSingleDate) onDateChange(date);
    else if (endDate) onDateRangeChange({ startDate: date, endDate: parse(endDate, 'yyyy-MM-dd', new Date()) });
  };

  const handleEndDateChange = (e) => {
    const dateStr = e.target.value;
    const date = parse(dateStr, 'yyyy-MM-dd', new Date());
    setEndDate(dateStr);
    if (startDate) onDateRangeChange({ startDate: parse(startDate, 'yyyy-MM-dd', new Date()), endDate: date });
  };

  return (
    <div className="venue-details__booking">
      <label className="venue-details__label">
        {isSingleDate ? 'Choose Date:' : 'Start date:'}
        <input
          className="venue-details__input"
          type="date"
          value={startDate}
          min={today}
          onChange={handleStartDateChange}
        />
      </label>
      {!isSingleDate && (
        <label className="venue-details__label">
          End Date:
          <input
            className="venue-details__input"
            type="date"
            value={endDate}
            min={startDate || today}
            onChange={handleEndDateChange}
          />
        </label>
      )}
    </div>
  );
};

CustomDatePicker.propTypes = {
  isSingleDate: PropTypes.bool,
  onDateChange: PropTypes.func,
  onDateRangeChange: PropTypes.func,
};

export default CustomDatePicker;
