import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/EditGuestsModal.css'

const EditGuestsModal = ({ isVisible, onSave, onCancel }) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);

  const canIncreaseGuests = adults + children < 5;

  const canDecreaseGuests = type => {
    if (type === 'adults') return adults > 1;
    if (type === 'children') return children > 0;
    return true;
  };

  const updateCount = (type, increment) => {
    if (type === 'adults' && (increment ? canIncreaseGuests : canDecreaseGuests(type))) {
      setAdults(adults + (increment ? 1 : -1));
    }
    else if (type === 'children' && (increment ? canIncreaseGuests : canDecreaseGuests(type))) {
      setChildren(children + (increment ? 1 : -1));
    }
    else if (type === 'pets' && (increment ? pets < 3 : pets > 0)) {
      setPets(pets + (increment ? 1 : -1));
    }
  };

  const handleSave = () => {
    onSave({ adults, children, pets });
  };

  return isVisible ? (
    <div className="modal">
      <h2>Guests</h2>
      <div className="modal__guest-item">
        <div className="modal__guest-info">
          <span>Adults: {adults}</span>
          <span className="modal__age-info">Age 13+</span>
        </div>
        <div className="modal__guest-buttons">
          <button onClick={() => updateCount('adults', false)} disabled={!canDecreaseGuests('adults')}>-</button>
          <button onClick={() => updateCount('adults', true)} disabled={!canIncreaseGuests}>+</button>
        </div>
      </div>

      <div className="modal__guest-item">
        <div className="modal__guest-info">
          <span>Children: {children}</span>
          <span className="modal__age-info">Ages 2-12</span>
        </div>
        <div className="modal__guest-buttons">
          <button onClick={() => updateCount('children', false)} disabled={!canDecreaseGuests('children')}>-</button>
          <button onClick={() => updateCount('children', true)} disabled={!canIncreaseGuests}>+</button>
        </div>
      </div>

      <div className="modal__guest-item">
        <div className="modal__guest-info">
          <span>Pets: {pets}</span>
        </div>
        <div className="modal__guest-buttons">
          <button onClick={() => updateCount('pets', false)} disabled={pets === 0}>-</button>
          <button onClick={() => updateCount('pets', true)} disabled={pets === 3}>+</button>
        </div>
      </div>

      <div className="modal__buttons">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  ) : null;
};

EditGuestsModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default EditGuestsModal;
