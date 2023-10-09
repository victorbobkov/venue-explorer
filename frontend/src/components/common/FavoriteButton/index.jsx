import PropTypes from 'prop-types';
import './FavoriteButton.css';

const FavoriteButton = ({ isFavorited, onToggleFavorite, className = '' }) => {
  return (
    <button
      className={`favorite-btn ${className}`}
      aria-label="Add to favorite"
      aria-pressed={isFavorited}
      onClick={onToggleFavorite}
    >
      <img
        src={isFavorited ? "/assets/icons/icons8-red-heart-50.png" : "/assets/icons/icons8-heart-50.png"}
        alt="Add to favorite icon"
        className="favorite-icon"
      />
    </button>
  );
};

FavoriteButton.propTypes = {
  isFavorited: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default FavoriteButton;
