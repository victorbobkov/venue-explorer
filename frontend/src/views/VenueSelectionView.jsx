import { useEffect, useState } from 'react';
import useAppStore from '../store.js';
import useTelegram from '../hooks/useTelegram.js';
import VenueType from '../components/VenueType.jsx';
import VenueList from '../components/VenueList.jsx';
import { venueTypes, venues } from '../constants/index.js';
import '../styles/VenueSelectionView.css';

// Component renders a list of Venue Types and their corresponding Venues
const VenueSelectionView = () => {
  const { scrollY, setScrollY } = useAppStore();
  const { WebApp, onToggleMainButton } = useTelegram();
  const [selectedType, setSelectedType] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

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
