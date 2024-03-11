// PetButton.js
import React from 'react';

const PetButton = ({ onClick, showBadge }) => {
  return (
    <button className={showBadge ? "pet-button has-badge" : "pet-button"} onClick={onClick}>
      Pet
      {showBadge && <div className="badge">!</div>}
    </button>
  );
};

export default PetButton;
