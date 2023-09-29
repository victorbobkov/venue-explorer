import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import useTelegram from '../hooks/useTelegram.js';
import CustomDatePicker from '../components/CustomDatePicker.jsx';
import ScrollableContainer from '../components/ScrollableContainer.jsx';
import { venues } from '../constants/index.js';
import '../styles/VenueDetailsView.css';

// Component rendering detailed information about a specific venue
const VenueDetailsView = () => {
  const { id } = useParams();
  const { WebApp } = useTelegram();
  const navigate = useNavigate();

  const venue = venues.find((v) => v.id.toString() === id) || {};

  useEffect(() => {
    WebApp.MainButton.show();
    WebApp.MainButton.setParams({ text: 'BOOK NOW' });
    WebApp.BackButton.show();

    const handleMainButtonClick = () => {
      //todo Perform booking
      console.log('Main Button Clicked!');
    }

    const handleBackButtonClick = () => {
      navigate('/');
    }

    WebApp.MainButton.onClick(handleMainButtonClick);
    WebApp.BackButton.onClick(handleBackButtonClick);

    return () => {
      // Clean up
      WebApp.MainButton.hide();
      WebApp.MainButton.offClick(handleMainButtonClick);
      WebApp.BackButton.offClick(handleBackButtonClick);
    }
  }, [WebApp, navigate]);

  const handleDateChange = (date) => {
    console.log('Selected date: ', format(date, 'yyyy-MM-dd'))
  }

  const handleDateRangeChange = ({ startDate, endDate }) => {
    console.log('Selected date range: ', format(startDate, 'yyyy-MM-dd'), 'to', format(endDate, 'yyyy-MM-dd'));
  }

  return (
    <section className="venue-details">
      <img src={venue.imageUrl} alt={`${venue.name} venue`} className="venue-details__image" />
      <div className="venue-details__info">
        <h1 className="venue-details__name">{venue.name}</h1>
        <div className="venue-details__metadata">
          <span className="venue-details__rating">⭐ {venue.rating} •</span>
          <span className="venue-details__type">{venue.type} •</span>
          <span className="venue-details__price">{venue.price}/night</span>
        </div>
        <ScrollableContainer>
          {
            venue.amenities && venue.amenities.map((amenity, index) => (
              <span key={index} className="venue-details__amenity">{amenity}</span>
            ))
          }
        </ScrollableContainer>
        <p className="venue-details__description">{venue.description}</p>
        <CustomDatePicker
          isSingleDate={venue.type === 'Amusement'}
          onDateChange={handleDateChange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
    </section>
  );
};

export default VenueDetailsView;
