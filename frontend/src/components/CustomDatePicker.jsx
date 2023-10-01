import { useState } from 'react';
import { format, parse, add } from 'date-fns';
import PropTypes from 'prop-types';

// Component renders date pickers, single date for venue type 'Amusement' and date range for another types
const CustomDatePicker = ({ isSingleDate, onDateChange, onDateRangeChange }) => {
  const today = new Date();
  const tomorrow = add(today, { days: 1 });

  const [startDate, setStartDate] = useState(format(today, 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(tomorrow, 'yyyy-MM-dd'));

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
          min={format(today, 'yyyy-MM-dd')}
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
            min={format(tomorrow, 'yyyy-MM-dd')}
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
