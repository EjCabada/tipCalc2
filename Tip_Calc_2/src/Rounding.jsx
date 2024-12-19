import React, { useState, useEffect } from 'react';

function Rounding({ employeeData, onDone }) {
  const [totalTips, setTotalTips] = useState(0);
  const [roundingOption, setRoundingOption] = useState('');
  const [step, setStep] = useState(1);  // Step 1: Enter total tips, Step 2: Ask for rounding

  // Handle the total tips input
  const handleTipsChange = (event) => {
    setTotalTips(Number(event.target.value));
  };

  // Handle the rounding option selection
  const handleRoundingOption = (option) => {
    setRoundingOption(option);
    setStep(2); // Move to the next step after selecting a rounding option
  };

  // Handle rounding calculations after selecting the rounding option
  const applyRounding = () => {
    const totalTipsPerEmployee = totalTips / employeeData.length;
    const updatedData = employeeData.map(emp => {
      let roundedTips = totalTipsPerEmployee;
      if (roundingOption === 'up') {
        roundedTips = Math.ceil(totalTipsPerEmployee);
      } else if (roundingOption === 'nearest') {
        roundedTips = Math.round(totalTipsPerEmployee);
      }
      return {
        ...emp,
        roundedTips: roundedTips,
        exactTips: totalTipsPerEmployee
      };
    });

    // Save original and rounded data in localStorage
    localStorage.setItem('employeeDataOriginal', JSON.stringify(employeeData));
    localStorage.setItem('employeeData', JSON.stringify(updatedData));

    onDone(); // Call the done function to move to Step 3
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Enter Total Tips for the Week</h2>
          <input
            type="number"
            value={totalTips}
            onChange={handleTipsChange}
            placeholder="Enter total tips"
          />
          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Round Employee Tips?</h2>
          <button onClick={() => handleRoundingOption('up')}>Round Up</button>
          <button onClick={() => handleRoundingOption('nearest')}>Round Nearest Dollar</button>
          <button onClick={() => handleRoundingOption('none')}>Don't Round</button>
        </div>
      )}

      {/* After rounding option is selected, apply rounding */}
      {roundingOption && (
        <div>
          <button onClick={applyRounding}>Apply Rounding</button>
        </div>
      )}
    </div>
  );
}

export default Rounding;  