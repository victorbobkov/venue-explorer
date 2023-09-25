import LottieIcon from './LottieIcon.jsx';
import PropTypes from 'prop-types';

const VenueItem = ({ name, type, rating, price, imageUrl }) => {
  const handleFavoriteClick = () => {
    console.log(`${name} is favorited!`)
  }

  return (
    <li className="venue">
      <img src={imageUrl} alt={`${name} venue`} className="venue__image" />
      <div className="venue__details">
        <span className="venue__details--name">{name}</span>
        <span className="venue__details--type">{type}</span>
        <span className="venue__details--rating">{rating}</span>
        <span className="venue__details--price">{price}/night</span>
      </div>
      {/*<button className="venue__favorite-btn" role="button" aria-label="Add to favorite">*/}
      {/*  ♥*/}
      {/*</button>*/}
      <LottieIcon iconPath="/assets/lotties/Heart.json" onIconClick={handleFavoriteClick} />
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
