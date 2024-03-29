import React, { useState, useEffect } from 'react';
import PetButton from './PetButton';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';

import catImage from "../images/cat.svg";
import dogImage from "../images/dog.svg";

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
    label: 'Welcome to Pet Manager',
    description:
      'Take care of your cute virtual pet by watching its hunger and happiness. Hunger goes down every 3 seconds. When it hits 0, happiness drops every 5 seconds. If either gets too low, a red dot appears. Keep an eye out and make your pet happy!',
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
    }, 3000);

    return () => clearInterval(interval);
  }, [activeStep, hunger]);

  useEffect(() => {
    let decreaseHappinessInterval;

    // Check if dog's hunger stays at 0 for over 5 seconds
    if (hunger === 0) {
      decreaseHappinessInterval = setInterval(() => {
        
        setHappiness(prevHappiness => Math.max(prevHappiness - 1, 0));
      }, 5000); // 30 seconds :30000
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

  const showBadge = hunger < 6 || happiness < 6;

  return (
    <div className='sidebar-right'>

      <PetButton onClick={handleButtonClick} showBadge={showBadge} />
      <Offcanvas show={showPopup} onHide={handleClosePopup} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{currentStep.label}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {activeStep === 0 && (
            <div className='step-one'>
              <p>{currentStep.description}</p>
              <div className='options'>
                {currentStep.options.map((option, index) => (
                  <label key={index} className={selectedOption === option.label ? 'checked' : ''}>
                    <p><input
                      type="radio"
                      value={option.label}
                      checked={selectedOption === option.label}
                      onChange={() => setSelectedOption(option.label)}
                    />
                      <span className='value'>{option.label}</span></p>
                    <img src={option.image} alt={option.label} />
                  </label>
                ))}
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className='step-two'>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>How to play</Accordion.Header>
                  <Accordion.Body>
                    <p>{currentStep.description}</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <section className='pet-info'>
                <p className='selected'>Selected: <span>{selectedOption}</span> </p>
                <p>Hunger&#40;max:10&#41;: <span>{hunger}</span></p>
                <p>Happiness&#40;max:10&#41;: <span>{happiness}</span></p>
              </section>
              <section className='pet-btns'>
                <button className='feed-btn' onClick={feed}>Feed</button>
                <button className='pet-btn' onClick={pet}>Pet</button>
              </section>
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
