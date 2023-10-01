import { useEffect, useState } from 'react';
import useTelegram from '../hooks/useTelegram.js';
import VenueType from '../components/VenueType.jsx';
import VenueList from '../components/VenueList.jsx';
import { venueTypes, venues } from '../constants/index.js';
import '../styles/VenueSelectionView.css';

// Component for rendering venue types and their available venues
const VenueSelectionView = () => {
  const { WebApp, onToggleMainButton } = useTelegram();
  const [selectedType, setSelectedType] = useState('');

  const [shouldAnimate, setShouldAnimate] = useState(false);

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

  const handleTypeClick = (type) => {
    if (selectedType === type) {
      setSelectedType('');
      onToggleMainButton();
      setShouldAnimate(false);
    } else {
      setSelectedType(type)
      WebApp.MainButton.show();
      WebApp.MainButton.setParams({ text: 'SHOW ALL' });
      setShouldAnimate(true);
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
            shouldAnimate={shouldAnimate && selectedType === type.type}
          />
        ))}
      </div>
      <VenueList venues={displayedVenues} />
    </section>
  );
};

export default VenueSelectionView;
