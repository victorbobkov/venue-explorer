import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useTelegram from './hooks/useTelegram.js';
import VenueSelectionView from './views/VenueSelectionView';
import VenueDetailsView from './views/VenueDetailsView';
import BookingConfirmationView from './views/BookingConfirmationView';

const queryClient = new QueryClient();

function App() {
  const { WebApp } = useTelegram();

  // A method that informs the Telegram app that the Mini App is ready to be displayed
  useEffect(() => {
    WebApp.ready()
  });

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<VenueSelectionView />}/>
            <Route path="/details/:id" element={<VenueDetailsView />}/>
            <Route path="/booking-confirmation/:id" element={<BookingConfirmationView />}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App
