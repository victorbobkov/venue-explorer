import { useEffect } from 'react';
import VenueSelectionView from './views/VenueSelectionView.jsx';

const tg = window.Telegram.WebApp;

function App() {
  // A method that informs the Telegram app that the Mini App is ready to be displayed
  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      <VenueSelectionView />
    </div>
  )
}

export default App
