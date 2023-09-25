import PropTypes from 'prop-types';
import VenueItem from './VenueItem.jsx';

const VenueList = ({ venues }) => {
  return (
    <div className="venue-selection__list">
      {venues.map(venue => (
        <VenueItem key={venue.id} {...venue} />
      ))}
    </div>
  );
};

VenueList.propTypes = {
  venues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default VenueList;
