import React, { useState, useEffect } from 'react';
import PetButton from './PetButton';
import Offcanvas from 'react-bootstrap/Offcanvas';
import catImage from "../styles/cat.svg";
import dogImage from "../styles/dog.svg";

const steps = [
  {
    label: 'Select Your Pet',
    options: [
      { label: 'Dog', image: dogImage },
      { label: 'Cat', image: catImage }
    ],
    description: `Choose whether you want to manage a dog or a cat.`,
  },
  {
    label: 'Start manage your pet',
    description:
      'You can feed or pet it',
  }
];


const PetManager = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isActive, setIsActive] = useState(true); // Whether the user is active on the site
  const [activeStep, setActiveStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hunger, setHunger] = useState(10);
  const [happiness, setHappiness] = useState(10);


  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleNext = () => {
    if (activeStep === 0 && selectedOption === null) {
      alert('Please select a pet.');
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedOption(null);
    setHunger(10); // Reset hunger to 10
    setHappiness(10); // Reset happiness to 10
  };

  useEffect(() => {
    // Decrease dog's hunger level every second if the user is active
    const interval = setInterval(() => {
      if (activeStep !== 0 && hunger > 0) {
        setHunger(prevHunger => prevHunger - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeStep, hunger]);

  useEffect(() => {
    let decreaseHappinessInterval;

    // Check if dog's hunger stays at 0 for over 5 seconds
    if (hunger === 0) {
      decreaseHappinessInterval = setInterval(() => {
        // Decrease dog's happiness every 30 seconds
        setHappiness(prevHappiness => Math.max(prevHappiness - 1, 0));
      }, 2000); // 30 seconds :30000
    } else {
      clearInterval(decreaseHappinessInterval);
    }

    return () => clearInterval(decreaseHappinessInterval);
  }, [hunger]);

  // Function to feed the dog
  const feed = () => {
    setHunger(prevHunger => Math.min(prevHunger + 3, 10)); // Increase hunger level by 3 (up to max 10)
  };

  // Function to pet the dog
  const pet = () => {
    setHappiness(prevHappiness => Math.min(prevHappiness + 5, 10));
  };

  const currentStep = steps[activeStep];

  // Show badge when hunger level is below 7
  const showBadge = hunger < 7;

  return (
    <div className='sidebar-right'>

      <PetButton onClick={handleButtonClick} showBadge={showBadge} />
      <Offcanvas show={showPopup} onHide={handleClosePopup} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{currentStep.label}</Offcanvas.Title>

        </Offcanvas.Header>
        <Offcanvas.Body>
          {activeStep === 0 && (
            <div>
              <p>{currentStep.description}</p>
              <div>
                {currentStep.options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      value={option.label}
                      checked={selectedOption === option.label}
                      onChange={() => setSelectedOption(option.label)}
                    />
                    {option.label}
                    <img src={option.image} alt={option.label} />
                  </label>
                ))}
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div>
              <p>{currentStep.description}</p>
              <p>{selectedOption}</p>
              <p>Hunger&#40;max:10&#41;: {hunger}</p>
              <p>Happiness&#40;max:10&#41;: {happiness}</p>
              <button onClick={feed}>Feed</button>
              <button onClick={pet}>Pet</button>
              <img src={steps[0].options.find(option => option.label === selectedOption)?.image} alt={selectedOption} />
            </div>
          )}

          {/* Step navigation buttons */}
          {activeStep < steps.length - 1 && (
            <button onClick={handleNext}>Next</button>
          )}
          {activeStep === steps.length - 1 && (
            <button onClick={handleReset}>Reset</button>
          )}


        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default PetManager;
