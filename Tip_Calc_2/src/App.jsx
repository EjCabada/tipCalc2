import { useState, useEffect } from 'react';
import './App.css';
import Hours from './Hours.jsx';
import Rounding from './Rounding.jsx';
import Results from './Results.jsx';

function App() {
  const [step, setStep] = useState(() => Number(localStorage.getItem('step')) || 1);
  const [employeeData, setEmployeeData] = useState(() => JSON.parse(localStorage.getItem('employeeData')) || []);
  const [totalHours, setTotalHours] = useState(() => Number(localStorage.getItem('totalHours')) || 0);
  const [totalTips, setTotalTips] = useState(() => Number(localStorage.getItem('totalTips')) || 0);
  const [fade, setFade] = useState(true); // Control fade animations

  // Save data to localStorage whenever relevant state changes
  useEffect(() => {
    localStorage.setItem('step', step);
    localStorage.setItem('employeeData', JSON.stringify(employeeData));
    localStorage.setItem('totalHours', totalHours);
    localStorage.setItem('totalTips', totalTips);
  }, [step, employeeData, totalHours, totalTips]);

  const triggerStepChange = (newStep) => {
    setFade(false); // Start fade-out
    setTimeout(() => {
      setStep(newStep); // Change the step after fade-out is complete
      setFade(true); // Start fade-in
    }, 300); // Match this timeout to the fade-out duration in CSS
  };

  const handleDoneInHours = (data, hours) => {
    setEmployeeData(data);
    setTotalHours(hours);
    triggerStepChange(2); // Smooth transition to Step 2
  };

  const handleDoneInRounding = (data, tips) => {
    setEmployeeData(data);
    setTotalTips(tips);
    triggerStepChange(3); // Smooth transition to Step 3
  };

  const handleRestart = () => {
    setStep(1);
    setEmployeeData([]);
    setTotalHours(0);
    setTotalTips(0);
    localStorage.clear();
    triggerStepChange(1); // Restart to Step 1 with animation
  };

  const handleReturnToRounding = () => {
    triggerStepChange(2); // Smooth transition back to Step 2
  };

  return (
    <div id="app" className={`fade ${fade ? 'show' : ''}`}>
      <h1>Tip Calculator</h1>

      {step === 1 && (
        <Hours
          onDone={handleDoneInHours}
          onRestart={handleRestart}
          initialData={employeeData}
          initialTotalHours={totalHours}
        />
      )}
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
