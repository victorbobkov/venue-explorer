import { useEffect, useState } from 'react';
import useTelegram from '../hooks/useTelegram.js';
import VenueType from '../components/VenueType.jsx';
import VenueList from '../components/VenueList.jsx';
import { venueTypes, venues } from '../constants/index.js';
import '../styles/VenueSelectionView.css';

// Component for rendering venue types and their available venues
const VenueSelectionView = () => {
  const { WebApp, onToggleButton } = useTelegram();
  const [selectedType, setSelectedType] = useState('');

  // Set Main Button text and show it when a type is clicked
  useEffect(() => {
    const handleMainButtonClick = () => {
      setSelectedType('');
      onToggleButton();
    }

    WebApp.MainButton.onClick(handleMainButtonClick);

    return () => {
      WebApp.MainButton.offClick(handleMainButtonClick);
    }
  }, [WebApp, onToggleButton]);

  const handleTypeClick = (type) => {
    if (selectedType === type) {
      setSelectedType('');
      onToggleButton();
    } else {
      setSelectedType(type);
      WebApp.MainButton.show();
      WebApp.MainButton.setParams({ text: 'SHOW ALL' });
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
          />
        ))}
      </div>
      <VenueList venues={displayedVenues} />
    </section>
  );
};

export default VenueSelectionView;
