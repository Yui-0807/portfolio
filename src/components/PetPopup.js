import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';


const PetPopup = ({ show, onClose, onFeed, onPet, hunger, happiness }) => {
  return (
    <Offcanvas show={show} onHide={onClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>What do you like to do?</Offcanvas.Title>

      </Offcanvas.Header>
      <Offcanvas.Body>
        <p>Hunger: {hunger}</p>
        <p>Happiness: {happiness}</p>
        
        <button onClick={onFeed}>Feed</button>
        <button onClick={onPet}>Pet</button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default PetPopup;
