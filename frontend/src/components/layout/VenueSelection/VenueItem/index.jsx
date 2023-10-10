import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useAppStore from '../../../../store.js';
import PropTypes from 'prop-types';
import CustomSlider from '../../../common/CustomSlider';
import FavoriteButton from '../../../common/FavoriteButton';
import { VENUE_TYPES } from '../../../../constants/constants.js';
import './VenueItem.css';
import useTelegram from '../../../../hooks/useTelegram.js';

const VenueItem = ({ id, name, typeId, rating, price, imageUrls = [] }) => {
  const isFavorited = useAppStore((state) => !!state.favorites[id]);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const venueTypes = useAppStore((state) => state.venueTypes);
  const { WebApp } = useTelegram();
  const lastToggledRef = useRef(null);

  const type = venueTypes.find((t) => t.id === typeId);
  const typeName = type ? type.type : 'Unknown Type';

  useEffect(() => {
    // Fetch favorite status from Cloud Storage
    if (WebApp.isVersionAtLeast('6.9')) {
      WebApp.CloudStorage.getItem(`favorite_${id}`, (err, value) => {
        if (err) {
          console.error("Error fetching from cloud storage", err);
        } else if (value !== null) {
          const storedFavorited = JSON.parse(value);
          const now = Date.now();
          const timeSinceLastToggle = now - (lastToggledRef.current || 0);

          if (storedFavorited !== isFavorited && timeSinceLastToggle > 2000) {
            toggleFavorite(id);
          }
        }
      });
    }
  }, [id, isFavorited, toggleFavorite]);

  // Callback to handle favorite toggle
  const handleFavoriteToggle = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    lastToggledRef.current = Date.now();
    toggleFavorite(id);
  }, [toggleFavorite, id]);

  return (
    <li className="venue">
      <Link to={`/details/${id}`} className="venue__link" aria-label={`Link to ${name} details`}>
        <div className="venue__top">
          <CustomSlider images={imageUrls} />
          <FavoriteButton isFavorited={isFavorited} onToggleFavorite={handleFavoriteToggle} />
        </div>
        <div className="venue__details">
          <div className="venue__name-price">
            <span className="venue__details--name">{name}</span>
            <span className="venue__details--price">
              ${price}{typeId === VENUE_TYPES.AMUSEMENT ? '/visit' : '/night'}
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
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  typeId: PropTypes.number.isRequired,
};

export default VenueItem;
