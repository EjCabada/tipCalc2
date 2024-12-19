import { useState, useEffect } from 'react';
import './App.css';
import Hours from './Hours.jsx';
import Rounding from './Rounding.jsx';
import Results from './Results.jsx';

function App() {
  const [step, setStep] = useState(1);
  const [employeeData, setEmployeeData] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalTips, setTotalTips] = useState(0);

  // Load data from localStorage if it exists
  useEffect(() => {
    const storedStep = localStorage.getItem('step');
    const storedEmployeeData = localStorage.getItem('employeeData');
    const storedTotalHours = localStorage.getItem('totalHours');
    const storedTotalTips = localStorage.getItem('totalTips');

    if (storedStep) {
      setStep(Number(storedStep));
    }
    if (storedEmployeeData) {
      setEmployeeData(JSON.parse(storedEmployeeData));
    }
    if (storedTotalHours) {
      setTotalHours(Number(storedTotalHours));
    }
    if (storedTotalTips) {
      setTotalTips(Number(storedTotalTips));
    }
  }, []);

  // Save data to localStorage whenever relevant state changes
  useEffect(() => {
    localStorage.setItem('step', step);
    localStorage.setItem('employeeData', JSON.stringify(employeeData));
    localStorage.setItem('totalHours', totalHours);
    localStorage.setItem('totalTips', totalTips);
  }, [step, employeeData, totalHours, totalTips]);

  // Handle the "Done" button in Hours.jsx
  const handleDoneInHours = (data) => {
    setEmployeeData(data);
    setStep(2); // Move to rounding step
  };

  // Handle the "Done" button in Rounding.jsx
  const handleDoneInRounding = (tips) => {
    setTotalTips(tips); // Set total tips
    setStep(3); // Move to results step
  };

  // Restart the app (clear localStorage and reset state)
  const handleRestart = () => {
    localStorage.clear(); // Clear all data in localStorage
    setStep(1); // Reset to Step 1
    setEmployeeData([]); // Reset employee data
    setTotalHours(0); // Reset total hours
    setTotalTips(0); // Reset total tips
  };

  // Return to Rounding step
  const handleReturnToRounding = () => {
    setStep(2); // Go back to the rounding step
  };

  return (
    <div id='app'>
      <h1>Tip Calculator</h1>

      {/* Show the Restart button on all steps */}
      <button onClick={handleRestart} id="restartButton">Restart</button>

      {step === 1 && <Hours onDone={handleDoneInHours} />}
      {step === 2 && <Rounding employeeData={employeeData} onDone={handleDoneInRounding} />}
      {step === 3 && (
        <Results
          employeeData={employeeData}
          totalHours={totalHours}
          totalTips={totalTips}
          onRestart={handleRestart}
          onReturnToRounding={handleReturnToRounding}
        />
      )}
    </div>
  );
}

export default App;