import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTelegram from '../hooks/useTelegram.js';
import { venues } from '../constants/index.js';
import '../styles/VenueDetailsView.css';

const VenueDetailsView = () => {
  const { id } = useParams();
  const { WebApp, onToggleBackButton } = useTelegram();
  const venue = venues.find((v) => v.id.toString() === id) || {};
  const navigate = useNavigate();

  useEffect(() => {
    WebApp.MainButton.show();
    WebApp.MainButton.setParams({ text: 'BOOK NOW' });

    const handleMainButtonClick = () => {
      console.log('Main Button Clicked!');
      //todo Perform booking
    }

    const handleBackButtonClick = () => {
      navigate('/');
    }

    WebApp.MainButton.onClick(handleMainButtonClick);
    WebApp.BackButton.onClick(handleBackButtonClick);
    onToggleBackButton();

    return () => {
      // Clean up
      WebApp.MainButton.hide();
      WebApp.MainButton.offClick(handleMainButtonClick);
      WebApp.BackButton.offClick(handleBackButtonClick);
      onToggleBackButton();
    }
  }, [WebApp, onToggleBackButton, navigate]);

  return (
    <section className="venue-details">
      <img src={venue.imageUrl} alt={`${venue.name} venue`} className="venue-details__image" />
      <div className="venue-details__info">
        <h1 className="venue-details__name">{venue.name}</h1>
        <span className="venue-details__type">{venue.type}</span>
        <span className="venue-details__rating">{venue.rating}</span>
        <span className="venue-details__price">{venue.price}/night</span>
        <p className="venue-details__description">{venue.description}</p>
      </div>
    </section>
  );
};

export default VenueDetailsView;
