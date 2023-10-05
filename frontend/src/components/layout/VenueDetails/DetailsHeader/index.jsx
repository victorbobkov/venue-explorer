import PropTypes from 'prop-types';
import FavoriteButton from '../../../common/FavoriteButton/index.jsx';
import './DetailsHeader.css';

const DetailsHeader = ({ venue, isFavorited, onToggleFavorite }) => {
  return (
    <div className="venue-details__top">
      <img src={venue.imageUrl} alt={`${venue.name} venue`} className="venue-details__image" />
      <FavoriteButton
        isFavorited={isFavorited}
        onToggleFavorite={onToggleFavorite}
        className="venue-details-favorite-btn"
      />
    </div>
  );
};

DetailsHeader.propTypes = {
  venue: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  isFavorited: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default DetailsHeader;
