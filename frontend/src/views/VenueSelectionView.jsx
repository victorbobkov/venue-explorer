import VenueType from '../components/VenueType.jsx';
import VenueList from '../components/VenueList.jsx';
import '../styles/VenueSelectionView.css';


const VenueSelectionView = () => {
  const venueTypes = [
    { type: 'Apartment', iconPath: 'src/assets/lotties/House.json' },
    { type: 'Resort', iconPath: 'src/assets/lotties/Resort.json' },
    { type: 'Camping', iconPath: 'src/assets/lotties/Camping.json' },
    { type: 'Amusement', iconPath: 'src/assets/lotties/RollerCoaster.json' },
  ];

  const venues = [
    { id: 1, name: 'Name 1', rating: 4.5, price: '$150', imageUrl: 'src/assets/images/art1.jpg' },
    { id: 2, name: 'Name 2', rating: 4.5, price: '$150', imageUrl: 'src/assets/images/art2.jpg' },
    { id: 3, name: 'Name 3', rating: 4.5, price: '$150', imageUrl: 'src/assets/images/art3.jpg' },
    { id: 4, name: 'Name 4', rating: 4.5, price: '$150', imageUrl: 'src/assets/images/art4.jpg' },
  ];

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
