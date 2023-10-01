import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

const VenueItem = ({ id, name, type, rating, price, imageUrl }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  }

  return (
    <li className="venue">
      <Link to={`/details/${id}`} className="venue__link" aria-label={`Link to ${name} details`}>
        <div className="venue__top">
          <img src={imageUrl} alt={`${name} venue`} className="venue__image" loading="lazy" />
          <button
            className="venue__favorite-btn"
            aria-label="Add to favorite"
            aria-pressed={isFavorited}
            onClick={toggleFavorite}
          >♥</button>
        </div>
        <div className="venue__details">
          <div className="venue__name-price">
            <span className="venue__details--name">{name}</span>
            <span className="venue__details--price">
              {price}{type === 'Amusement' ? '/visit' : '/night'}
            </span>
          </div>
          <div className="venue__metadata">
            <span className="venue__details--rating">⭐ {rating} •</span>
            <span className="venue__details--type">{type}</span>
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
  price: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default VenueItem;
