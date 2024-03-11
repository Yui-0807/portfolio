// PetPopup.js
import React from 'react';

const PetPopup = ({ onClose, onFeed, onPet,hunger,happiness }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        <p>Hunger: {hunger}</p>
        <p>Happiness: {happiness}</p>
        <p>What would you like to do?</p>
        <button onClick={onFeed}>Feed</button>
        <button onClick={onPet}>Pet</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PetPopup;
