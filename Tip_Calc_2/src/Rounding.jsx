import React, { useState, useEffect } from 'react';

function Rounding({ employeeData, onDone }) {
  const [totalTips, setTotalTips] = useState(0);
  const [step, setStep] = useState(1); // Step 1: Enter total tips, Step 2: Rounding options for hours, Step 3: Rounding options for tips
  const [fade, setFade] = useState(true); // Initially true for fade-in
  const [roundingOption, setRoundingOption] = useState('exact');

  const triggerStepChange = (newStep) => {
    setFade(false); // Fade out
    setTimeout(() => {
      setStep(newStep);
      setFade(true); // Fade in after step change
    }, 300); // Match this timeout with the fade-out duration in CSS
  };

  const handleTipsChange = (event) => {
    setTotalTips(Number(event.target.value));
  };

  const proceedToHoursRounding = () => {
    if (totalTips <= 0) {
      alert('Please enter a valid total tips amount greater than 0.');
      return;
    }
    triggerStepChange(2); // Trigger animation and transition to Step 2
  };

  const applyHoursRounding = (option) => {
    setRoundingOption(option);
    triggerStepChange(3); // Trigger animation and transition to Step 3
  };

  const applyTipsRounding = (tipRoundingOption) => {
    let adjustedData = employeeData.map((emp) => {
      let adjustedHours = emp.hoursWorked;

      // Round hours based on the selected option
      if (roundingOption === 'up') {
        adjustedHours = Math.ceil(emp.hoursWorked);
      } else if (roundingOption === 'down') {
        adjustedHours = Math.floor(emp.hoursWorked);
      } else if (roundingOption === 'nearest') {
        adjustedHours = Math.round(emp.hoursWorked);
      }

      return {
        ...emp,
        adjustedHours,
      };
    });

    const totalAdjustedHours = adjustedData.reduce((sum, emp) => sum + emp.adjustedHours, 0);

    adjustedData = adjustedData.map((emp) => {
      const exactTips = (totalTips * emp.adjustedHours) / totalAdjustedHours;
      let roundedTips = exactTips;

      // Round tips based on the selected option
      if (tipRoundingOption === 'up') {
        roundedTips = Math.ceil(exactTips);
      } else if (tipRoundingOption === 'nearest') {
        roundedTips = Math.round(exactTips);
      }

      return {
        ...emp,
        exactTips,
        roundedTips,
      };
    });

    onDone(adjustedData, totalTips);
  };

  return (
    <div className={`fade ${fade ? 'show' : ''}`}>
      {step === 1 && (
        <div>
          <h2>Enter Total Tips for the Week</h2>
          <input
            type="number"
            // value={totalTips}
            onChange={handleTipsChange}
            //placeholder="Enter total tips"
          />
          <button onClick={proceedToHoursRounding}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Round Employee Hours (before multiplying tips)?</h2>
          <button onClick={() => applyHoursRounding('up')}>Round Up</button>
          <button onClick={() => applyHoursRounding('down')}>Round Down</button>
          <button onClick={() => applyHoursRounding('nearest')}>Round to Nearest</button>
          <button onClick={() => applyHoursRounding('exact')}>Keep Exact</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Round Employee Tips (after multiplying by tips)?</h2>
          <button onClick={() => applyTipsRounding('up')}>Round Up</button>
          <button onClick={() => applyTipsRounding('nearest')}>Round to Nearest</button>
          <button onClick={() => applyTipsRounding('exact')}>Don't Round</button>
        </div>
      )}
    </div>
  );
}

export default Rounding;
