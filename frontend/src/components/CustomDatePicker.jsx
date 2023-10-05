import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDate, parseDate, addDays } from '../constants/dateUtilities';

// Component renders date pickers, single date for venue type 'Amusement' and date range for another types
const CustomDatePicker = ({ isSingleDate, onDateChange, onDateRangeChange, startDate, endDate }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(formatDate(startDate));
  const [selectedEndDate, setSelectedEndDate] = useState(formatDate(endDate));
  const today = new Date();

  const handleStartDateChange = (e) => {
    const dateStr = e.target.value;
    const date = parseDate(dateStr);
    setSelectedStartDate(dateStr);

    // Ensuring endDate is at least +1 day from startDate
    const minimumEndDate = addDays(date, 1);

    if (isSingleDate) {
      onDateChange(date);
    } else {
      if (!selectedEndDate || parseDate(selectedEndDate) < minimumEndDate) {
        const newEndDateStr = formatDate(minimumEndDate);
        setSelectedEndDate(newEndDateStr);
        onDateRangeChange({ startDate: date, endDate: minimumEndDate });
      } else {
        onDateRangeChange({ startDate: date, endDate: parseDate(selectedEndDate) });
      }
    }
  };

  const handleEndDateChange = (e) => {
    const dateStr = e.target.value;
    const date = parseDate(dateStr);
    setSelectedEndDate(dateStr);

    if (selectedStartDate && parseDate(selectedStartDate) >= date) {
      const newStartDateStr = formatDate(addDays(date, -1));
      setSelectedStartDate(newStartDateStr);
      onDateRangeChange({ startDate: parseDate(newStartDateStr), endDate: date });
    } else {
      onDateRangeChange({ startDate: parseDate(selectedStartDate), endDate: date });
    }
  };

  return (
    <div className="venue-details__booking">
      <label className="venue-details__label">
        {isSingleDate ? 'Choose Date:' : 'Start date:'}
        <input
          className="venue-details__input"
          type="date"
          value={selectedStartDate}
          min={formatDate(today)}
          onChange={handleStartDateChange}
        />
      </label>
      {!isSingleDate && (
        <label className="venue-details__label">
          End Date:
          <input
            className="venue-details__input"
            type="date"
            value={selectedEndDate}
            min={isSingleDate
              ? formatDate(new Date())
              : formatDate(addDays(parseDate(selectedStartDate), 1))
            }
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
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
};

export default CustomDatePicker;
