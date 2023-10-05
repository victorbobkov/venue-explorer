import { useCallback } from 'react';
import useAppStore from '../store.js';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const VenueItem = ({ id, name, typeId, rating, price, imageUrl }) => {
  const isFavorited = useAppStore((state) => !!state.favorites[id]);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const venueTypes = useAppStore((state) => state.venueTypes);

  const type = venueTypes.find((t) => t.id === typeId);
  const typeName = type ? type.type : 'Unknown Type';

  // Callback to handle favorite toggle
  const handleFavoriteToggle = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(id);
    console.log(isFavorited)
  }, [toggleFavorite, id]);

  return (
    <li className="venue">
      <Link to={`/details/${id}`} className="venue__link" aria-label={`Link to ${name} details`}>
        <div className="venue__top">
          <img src={imageUrl} alt={`${name} venue`} className="venue__image" />
          <button
            className="venue__favorite-btn"
            aria-label="Add to favorite"
            aria-pressed={isFavorited}
            onClick={handleFavoriteToggle}
          >
            <img
              src={isFavorited ? "/assets/icons/icons8-red-heart-50.png" : "/assets/icons/icons8-heart-50.png"}
              alt="Add to favorite icon"
              className={`venue__favorite-icon ${isFavorited ? 'favorited' : ''}`}
            />
          </button>
        </div>
        <div className="venue__details">
          <div className="venue__name-price">
            <span className="venue__details--name">{name}</span>
            <span className="venue__details--price">
              ${price}{typeId === 4 ? '/visit' : '/night'}
            </span>
          </div>
          <div className="venue__metadata">
            <span className="venue__details--rating">
              <img src="/assets/icons/icons8-star-50.png" alt="Star icon" className="venue__details--icon"/> {rating} •
            </span>
            <span className="venue__details--type">{typeName}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

VenueItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  typeId: PropTypes.number.isRequired,
};

export default VenueItem;
