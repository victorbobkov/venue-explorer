import PropTypes from 'prop-types';

const VenueItem = ({ name, rating, price, imageUrl}) => {
  // test
  return (
    <div>
      <div className="venue" style={{ backgroundImage: `url('${imageUrl}')` }}>
        <span className="venue__name">{name}</span>
        <span className="venue__rating">{rating}</span>
        <span className="venue__price">{price}/night</span>
        <button className="venue__favorite-btn">♥</button>
      </div>
    </div>
  );
};

VenueItem.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default VenueItem;
