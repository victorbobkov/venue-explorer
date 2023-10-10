import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAppStore from '../../store.js';
import { addDays } from 'date-fns';
import useTelegram from '../../hooks/useTelegram.js';
import DetailsHeader from '../../components/layout/VenueDetails/DetailsHeader';
import DetailsInfo from '../../components/layout/VenueDetails/DetailsInfo';
import './VenueDetailsView.css';

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

  useEffect(() => {
    if (!venue.id) {
      navigate('/', { replace: true });
    }
  }, [venue, navigate]);

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
    setSelectedDates(date, addDays(date, 1));
  }

  const handleDateRangeChange = ({ startDate, endDate }) => {
    setSelectedDates(startDate, endDate);
  };

  if (!venue.id) return <div>Venue not found!</div>

  return (
    <section className="venue-details">
      <DetailsHeader
        venue={venue}
        isFavorited={isFavorited}
        onToggleFavorite={handleFavoriteToggle}
      />
      <DetailsInfo
        venue={{...venue, type: typeName}}
        selectedDates={selectedDates}
        onDateChange={handleDateChange}
        onDateRangeChange={handleDateRangeChange}
      />
    </section>
  );
};

export default VenueDetailsView;
