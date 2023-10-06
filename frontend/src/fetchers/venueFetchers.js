import { API_BASE_URL } from '../constants/constants';

const fetchVenueTypes = async () => {
  const response = await fetch(`${API_BASE_URL}/venueTypes`);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  return response.json();
};

const fetchVenues = async () => {
  const response = await fetch(`${API_BASE_URL}/venues`);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  return response.json();
};

export { fetchVenueTypes, fetchVenues };
