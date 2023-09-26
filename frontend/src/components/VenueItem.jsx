import PropTypes from 'prop-types';

const VenueItem = ({ name, type, rating, price, imageUrl }) => {

  return (
    <li className="venue">
      <div className="venue__top">
        <img src={imageUrl} alt={`${name} venue`} className="venue__image" />
        <button className="venue__favorite-btn" role="button" aria-label="Add to favorite">♥</button>
      </div>
      <div className="venue__details">
        <div className="venue__name-price">
          <span className="venue__details--name">{name}</span>
          <span className="venue__details--price">{price}/night</span>
        </div>
        <div className="venue__metadata">
          <span className="venue__details--type">{type}</span>
          <span className="venue__details--rating">{rating}</span>
        </div>
      </div>
    </li>
  );
};


VenueItem.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default VenueItem;
