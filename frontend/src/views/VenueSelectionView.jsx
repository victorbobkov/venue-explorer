import { useEffect, useState } from 'react';
import VenueType from '../components/VenueType.jsx';
import VenueList from '../components/VenueList.jsx';
import '../styles/VenueSelectionView.css';

const tg = window.Telegram.WebApp;

// Component for rendering venue types and their available venues
const VenueSelectionView = () => {
  const venueTypes = [
    { type: 'Apartment', iconPath: '/assets/lotties/House.json' },
    { type: 'Resort', iconPath: '/assets/lotties/Resort.json' },
    { type: 'Camping', iconPath: '/assets/lotties/Camping.json' },
    { type: 'Amusement', iconPath: '/assets/lotties/RollerCoaster.json' },
  ];

  const venues = [
    { id: 1, name: 'Urbanite High-Rise', type: 'Apartment', rating: 4.7, price: '$130', imageUrl: '/assets/images/art1.jpg', description: '' },
    { id: 2, name: 'Sapphire Shores', type: 'Resort', rating: 5.0, price: '$325', imageUrl: '/assets/images/art2.jpg', description: '' },
    { id: 3, name: 'Crestwood Grounds', type: 'Camping', rating: 4.4, price: '$45', imageUrl: '/assets/images/art3.jpg', description: '' },
    { id: 4, name: 'Whimsical Wonderland', type: 'Amusement', rating: 4.5, price: '$80', imageUrl: '/assets/images/art4.jpg', description: '' },
  ];

  const [selectedType, setSelectedType] = useState('');

  // Set Main Button text and show it when a type is clicked
  useEffect(() => {
    const handleMainButtonClick = () => {
      setSelectedType('');
      tg.MainButton.hide();
    }

    tg.MainButton.onClick(handleMainButtonClick);

    return () => {
      tg.MainButton.offClick(handleMainButtonClick);
    }
  }, []);

  const handleTypeClick = (type) => {
    if (selectedType === type) {
      setSelectedType('');
      tg.MainButton.hide();
    } else {
      setSelectedType(type);
      tg.MainButton.show();
      tg.MainButton.setParams({ text: 'Show All' });
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
