import { useEffect, useState } from 'react';
import useAppStore from '../../store.js';
import useTelegram from '../../hooks/useTelegram.js';
import VenueType from '../../components/layout/VenueSelection/VenueType';
import VenueList from '../../components/layout/VenueSelection/VenueList';
import { useQuery } from '@tanstack/react-query';
import { fetchVenues, fetchVenueTypes } from '../../fetchers/venueFetchers.js';
import './VenueSelectionView.css';

// Component renders a list of Venue Types and their corresponding Venues
const VenueSelectionView = () => {
  const { scrollY, setScrollY, selectedType, setSelectedType } = useAppStore();
  const { WebApp, onToggleMainButton } = useTelegram();
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: venueTypes, isError: isErrorVenueTypes, isLoading: isLoadingVenueTypes } = useQuery(
    ['venueTypes'],
    fetchVenueTypes, {
      staleTime: 10 * 60 * 1000 // cache for 10 minutes
    }
  );

  const { data: venues, isError: isErrorVenues, isLoading: isLoadingVenues } = useQuery(
    ['venues'],
    fetchVenues, {
      staleTime: 10 * 60 * 1000 // cache for 10 minutes
    }
  );

  useEffect(() => {
    if (venueTypes) {
      useAppStore.getState().setVenueTypes(venueTypes);
    }

    if (venues) {
      useAppStore.getState().setVenues(venues);
    }
  }, [venueTypes, venues]);

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

  if (isLoadingVenueTypes || isLoadingVenues) {
    return <div className="loading">Loading...</div>;
  }

  if (isErrorVenueTypes || isErrorVenues) {
    return (
      <div>
        <p>Error fetching data. Please check your internet connection.</p>
      </div>
    )
  }

  // Handle the click event for a Venue Type
  const handleTypeClick = (typeId) => {
    if (selectedType === typeId) {
      setSelectedType('');
      onToggleMainButton();
      setIsAnimating(false);
    } else {
      setSelectedType(typeId)
      WebApp.MainButton.show();
      WebApp.MainButton.setParams({ text: 'SHOW ALL' });
      setIsAnimating(true);
    }
  };

  const displayedVenues = selectedType
    ? venues.filter((venue) => venue.typeId === selectedType)
    : venues;

  return (
    <section className="venue-selection">
      <div className="venue-selection__types">
        {venueTypes.map((type) => (
          <VenueType
            key={type.id}
            {...type}
            onTypeClick={() => handleTypeClick(type.id)}
            isActive={selectedType === type.id}
            shouldAnimate={isAnimating && selectedType === type.id}
          />
        ))}
      </div>
      <VenueList venues={displayedVenues} />
    </section>
  );
};

export default VenueSelectionView;
