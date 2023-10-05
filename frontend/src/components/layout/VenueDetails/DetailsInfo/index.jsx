import PropTypes from 'prop-types';
import CustomDatePicker from '../../../../components/common/CustomDatePicker';
import ScrollableContainer from '../../../../components/common/ScrollableContainer';
import { VENUE_TYPES } from '../../../../constants/constants.js';
import './DetailsInfo.css';

const DetailsInfo = ({ venue, selectedDates, onDateChange, onDateRangeChange }) => (
  <div className="venue-details__info">
    <h1 className="venue-details__name">{venue.name}</h1>
    <div className="venue-details__metadata">
      <span className="venue-details__rating">
        <img src="/assets/icons/icons8-star-50.png" alt="Star icon" className="venue-details__icon"/> {venue.rating} •
      </span>
      <span className="venue-details__type">{venue.type} •</span>
      <span className="venue-details__price">
        ${venue.price}{venue.typeId === VENUE_TYPES.AMUSEMENT ? '/visit' : '/night'}
      </span>
    </div>
    <ScrollableContainer>
      {
        venue.amenities && venue.amenities.map((amenity, index) => (
          <span key={index} className="venue-details__amenity">{amenity}</span>
        ))
      }
    </ScrollableContainer>
    <p className="venue-details__description">{venue.description}</p>
    <CustomDatePicker
      isSingleDate={venue.typeId === VENUE_TYPES.AMUSEMENT}
      onDateChange={onDateChange}
      onDateRangeChange={onDateRangeChange}
      startDate={selectedDates.start}
      endDate={selectedDates.end}
    />
  </div>
);

DetailsInfo.propTypes = {
  venue: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.number,
    type: PropTypes.string,
    price: PropTypes.number,
    typeId: PropTypes.number,
    amenities: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
  }).isRequired,
  selectedDates: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  onDateChange: PropTypes.func.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
};

export default DetailsInfo;
