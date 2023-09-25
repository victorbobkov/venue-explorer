import VenueType from '../components/VenueType.jsx';
import VenueList from '../components/VenueList.jsx';
import '../styles/VenueSelectionView.css';

// Component for rendering venue types and their available venues
const VenueSelectionView = () => {
  const venueTypes = [
    { type: 'Apartment', iconPath: '/assets/lotties/House.json' },
    { type: 'Resort', iconPath: '/assets/lotties/Resort.json' },
    { type: 'Camping', iconPath: '/assets/lotties/Camping.json' },
    { type: 'Amusement', iconPath: '/assets/lotties/RollerCoaster.json' },
  ];

  const venues = [
    { id: 1, name: 'Name 1', type: 'Apartment', rating: 4.5, price: '$150', imageUrl: '/assets/images/art1.jpg' },
    { id: 2, name: 'Name 2', type: 'Resort', rating: 4.5, price: '$150', imageUrl: '/assets/images/art2.jpg' },
    { id: 3, name: 'Name 3', type: 'Camping', rating: 4.5, price: '$150', imageUrl: '/assets/images/art3.jpg' },
    { id: 4, name: 'Name 4', type: 'Amusement', rating: 4.5, price: '$150', imageUrl: '/assets/images/art4.jpg' },
  ];

  // Handles venue type selections
  const handleTypeClick = (type) => {
    console.log('Venue Type Clicked:', type);
  };

  return (
    <section className="venue-selection">
      <div className="venue-selection__types">
        {venueTypes.map((type) => (
          <VenueType key={type.type} {...type} onTypeClick={() => handleTypeClick(type.type)} />
        ))}
      </div>
      <VenueList venues={venues} />
    </section>
  );
};

export default VenueSelectionView;
