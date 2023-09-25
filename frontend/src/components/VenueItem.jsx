import PropTypes from 'prop-types';

const VenueItem = ({ name, rating, price, imageUrl }) => {

  return (
    <li className="venue" style={{ backgroundImage: `url('${imageUrl}')` }}>
      <img src={imageUrl} alt={`${name} venue`} hidden />
      <span className="venue__name">{name}</span>
      <span className="venue__rating">{rating}</span>
      <span className="venue__price">{price}/night</span>
      <button className="venue__favorite-btn" role="button" aria-label="Add to favorite">♥</button>
    </li>
  );
};

VenueItem.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default VenueItem;
