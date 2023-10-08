import PropTypes from 'prop-types';
import FavoriteButton from '../../../common/FavoriteButton';
import CustomSlider from '../../../common/CustomSlider';
import './styles.css';

const DetailsHeader = ({ venue, isFavorited, onToggleFavorite }) => {
  return (
    <div className="venue-details__top">
      <CustomSlider images={venue.imageUrls} />
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
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string,
  }).isRequired,
  isFavorited: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default DetailsHeader;
