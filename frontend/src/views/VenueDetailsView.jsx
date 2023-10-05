import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppStore from '../store.js';
import { format } from 'date-fns';
import useTelegram from '../hooks/useTelegram.js';
import CustomDatePicker from '../components/CustomDatePicker.jsx';
import ScrollableContainer from '../components/ScrollableContainer.jsx';
import '../styles/VenueDetailsView.css';

// Component renders detailed information about a specific venue
const VenueDetailsView = () => {
  const { selectedDates, setSelectedDates } = useAppStore();
  const { id } = useParams();
  const { WebApp } = useTelegram();
  const navigate = useNavigate();

  const venueTypes = useAppStore((state) => state.venueTypes);
  const venue = useAppStore((state) => state.venues.find((v) => v.id.toString() === id) || {});
  const isFavorited = useAppStore((state) => !!state.favorites[id]);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);

  // Find corresponding type name
  const type = venueTypes.find((t) => t.id === venue.typeId);
  const typeName = type ? type.type : 'Unknown Type';

  // Callback to handle favorite toggle
  const handleFavoriteToggle = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(id);
  }, [toggleFavorite, id]);

  // Configure Main Button and Back Button when component mounts and clean up when it unmounts
  useEffect(() => {
    WebApp.MainButton.show();
    WebApp.MainButton.setParams({ text: 'RESERVE' });
    WebApp.BackButton.show();

    const handleMainButtonClick = () => {
      navigate(`/booking-confirmation/${id}`);
    }

    const handleBackButtonClick = () => {
      navigate('/');
    }

    WebApp.MainButton.onClick(handleMainButtonClick);
    WebApp.BackButton.onClick(handleBackButtonClick);

    return () => {
      // Clean up
      WebApp.MainButton.hide();
      WebApp.BackButton.hide();
      WebApp.MainButton.offClick(handleMainButtonClick);
      WebApp.BackButton.offClick(handleBackButtonClick);
    }
  }, [WebApp, navigate]);

  const handleDateChange = (date) => {
    console.log('Selected date: ', format(date, 'yyyy-MM-dd'))
  }

  const handleDateRangeChange = ({ startDate, endDate }) => {
    console.log('Selected date range: ', format(startDate, 'yyyy-MM-dd'), 'to', format(endDate, 'yyyy-MM-dd'));
    setSelectedDates(startDate, endDate);
  };

  if (!venue.id) return <div>Venue not found!</div>

  return (
    <section className="venue-details">
      <div className="venue-details__top">
        <img src={venue.imageUrl} alt={`${venue.name} venue`} className="venue-details__image" />
        <button
          className="venue-details__favorite-btn"
          aria-label="Add to favorite"
          aria-pressed={isFavorited}
          onClick={handleFavoriteToggle}
        >
          <img
            src={isFavorited ? "/assets/icons/icons8-red-heart-50.png" : "/assets/icons/icons8-heart-50.png"}
            alt="Add to favorite icon"
            className={`venue-details__favorite-icon ${isFavorited ? 'favorited' : ''}`}
          />
        </button>
      </div>

      <div className="venue-details__info">
        <h1 className="venue-details__name">{venue.name}</h1>
        <div className="venue-details__metadata">
          <span className="venue-details__rating">
            <img src="/assets/icons/icons8-star-50.png" alt="Star icon" className="venue-details__icon"/> {venue.rating} •
          </span>
          <span className="venue-details__type">{typeName} •</span>
          <span className="venue-details__price">
            ${venue.price}{venue.typeId === 4 ? '/visit' : '/night'}
          </span>
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
          isSingleDate={venue.typeId === 4}
          onDateChange={handleDateChange}
          onDateRangeChange={handleDateRangeChange}
          startDate={selectedDates.start}
          endDate={selectedDates.end}
        />
      </div>
      {/*<button onClick={() => navigate(`/booking-confirmation/${id}`)}>test</button>*/}
    </section>
  );
};

export default VenueDetailsView;
