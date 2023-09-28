import PropTypes from 'prop-types';
import VenueItem from './VenueItem.jsx';

const VenueList = ({ venues }) => {
  return (
    <ul className="venue-selection__list">
        {venues.map(venue => (
          <VenueItem key={venue.id} {...venue} />
        ))}
    </ul>
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
