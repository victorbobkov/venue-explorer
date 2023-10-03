import { useEffect, useState } from 'react';
import useAppStore from '../store.js';
import useTelegram from '../hooks/useTelegram.js';
import VenueType from '../components/VenueType.jsx';
import VenueList from '../components/VenueList.jsx';
// import { venueTypes, venues,} from '../constants/index.js';
import {  API_BASE_URL } from '../constants/index.js';
import '../styles/VenueSelectionView.css';

// Component renders a list of Venue Types and their corresponding Venues
const VenueSelectionView = () => {
  const { scrollY, setScrollY, selectedType, setSelectedType } = useAppStore();
  const { WebApp, onToggleMainButton } = useTelegram();
  const [isAnimating, setIsAnimating] = useState(false);
  const venueTypes = useAppStore((state) => state.venueTypes);
  const venues = useAppStore((state) => state.venues);

  // Set the scroll position before navigating to another page
  const handleScroll = () => setScrollY(window.scrollY);

  useEffect(() => {
    // Set up an event listener for the scroll event to update the scroll position
    window.addEventListener('scroll', handleScroll);
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Restore scroll position when coming back to this page
    window.scrollTo(0, scrollY);
  }, [scrollY]);

  // Set Main Button text and show it when a type is clicked
  useEffect(() => {
    const handleMainButtonClick = () => {
      setSelectedType('');
      onToggleMainButton();
    }

    WebApp.MainButton.onClick(handleMainButtonClick);

    return () => {
      WebApp.MainButton.offClick(handleMainButtonClick);
    }
  }, [WebApp, onToggleMainButton]);

  // Handle the click event for a Venue Type
  const handleTypeClick = (type) => {
    if (selectedType === type) {
      setSelectedType('');
      onToggleMainButton();
      setIsAnimating(false);
    } else {
      setSelectedType(type)
      WebApp.MainButton.show();
      WebApp.MainButton.setParams({ text: 'SHOW ALL' });
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    // Fetch venue types
    fetch(`${API_BASE_URL}/venueTypes`)
      .then(response => response.json())
      .then(data => useAppStore.getState().setVenueTypes(data));

    // Fetch venues
    fetch(`${API_BASE_URL}/venues`)
      .then(response => response.json())
      .then(data => useAppStore.getState().setVenues(data));

  }, []);

  const displayedVenues = selectedType
    ? venues.filter((venue) => venue.type === selectedType)
    : venues;

  return (
    <section className="venue-selection">
      <div className="venue-selection__types">
        {venueTypes.map((type) => (
          <VenueType
            key={type.type}
            {...type}
            onTypeClick={() => handleTypeClick(type.type)}
            isActive={selectedType === type.type}
            shouldAnimate={isAnimating && selectedType === type.type}
          />
        ))}
      </div>
      <VenueList venues={displayedVenues} />
    </section>
  );
};

export default VenueSelectionView;
