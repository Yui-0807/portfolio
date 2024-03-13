import React, { useState, useEffect } from 'react';
import PetButton from './PetButton';
import PetPopup from './PetPopup';

const PetManager = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [dogHunger, setDogHunger] = useState(10); 
  const [dogHappiness, setDogHappiness] = useState(10);
  const [isActive, setIsActive] = useState(true); // Whether the user is active on the site

  useEffect(() => {
    // Decrease dog's hunger level every second if the user is active
    const interval = setInterval(() => {
      if (isActive && dogHunger > 0) {
        setDogHunger(prevHunger => prevHunger - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, dogHunger]);

  useEffect(() => {
    let decreaseHappinessInterval;
    
    // Check if dog's hunger stays at 0 for over 5 seconds
    if (dogHunger === 0) {
      decreaseHappinessInterval = setInterval(() => {
        // Decrease dog's happiness every 30 seconds
        setDogHappiness(prevHappiness => Math.max(prevHappiness - 1, 0));
      }, 2000); // 30 seconds :30000
    } else {
      clearInterval(decreaseHappinessInterval);
    }

    return () => clearInterval(decreaseHappinessInterval);
  }, [dogHunger]);

  // Function to feed the dog
  const feedDog = () => {
    setDogHunger(prevHunger => Math.min(prevHunger + 3, 10)); // Increase hunger level by 3 (up to max 10)
  };

  // Function to pet the dog
  const petDog = () => {
    setDogHappiness(prevHappiness => Math.min(prevHappiness + 5, 10));
  };

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Show badge when hunger level is below 7
  const showBadge = dogHunger < 7;

  return (
    <div>
      
      <PetButton onClick={handleButtonClick} showBadge={showBadge} />
      <PetPopup
        show={showPopup}
        onClose={handleClosePopup}
        onFeed={feedDog}
        onPet={petDog}
        hunger={dogHunger}
        happiness={dogHappiness}
      />
    </div>
  );
};

export default PetManager;
