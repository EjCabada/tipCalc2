import React, { useState } from 'react';

function Rounding({ employeeData, totalTips, onDone }) {
  const [inputTips, setInputTips] = useState(totalTips);

  const handleTipsChange = (event) => {
    setInputTips(Number(event.target.value));
  };

  const handleRoundingOption = (option) => {
    if (employeeData.length === 0) {
      alert("No employees available for rounding tips.");
      return;
    }

    const tipsPerEmployee = inputTips / employeeData.length;
    const updatedData = employeeData.map((emp) => {
      let roundedTips;
      switch (option) {
        case 'up':
          roundedTips = Math.ceil(tipsPerEmployee);
          break;
        case 'nearest':
          roundedTips = Math.round(tipsPerEmployee);
          break;
        default:
          roundedTips = tipsPerEmployee;
      }

      return {
        ...emp,
        roundedTips,
        exactTips: tipsPerEmployee,
      };
    });

    onDone(updatedData);
  };

  return (
    <div>
      <h2>Enter Total Tips for the Week</h2>
      <input
        type="number"
        value={inputTips}
        onChange={handleTipsChange}
        placeholder="Enter total tips"
      />

      <h2>Round Employee Tips?</h2>
      <button onClick={() => handleRoundingOption('up')}>Round Up</button>
      <button onClick={() => handleRoundingOption('nearest')}>Round Nearest Dollar</button>
      <button onClick={() => handleRoundingOption('none')}>Don't Round</button>

      <div>
        <strong>Debug Info:</strong>
        <p>Total Tips Entered: {inputTips}</p>
        <p>Number of Employees: {employeeData.length}</p>
      </div>
    </div>
  );
}

export default Rounding;
