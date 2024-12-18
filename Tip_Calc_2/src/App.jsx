import { useState, useEffect } from 'react';
import './App.css';
import hours from './hours.jsx';
import Rounding from './Rounding.jsx';
import Results from './Results.jsx';

function App() {
  const [step, setStep] = useState(1);
  const [employeeData, setEmployeeData] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalTips, setTotalTips] = useState(0);

  // Centralize data handling
  useEffect(() => {
    const storedState = localStorage.getItem('appState');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setStep(parsedState.step || 1);
      setEmployeeData(parsedState.employeeData || []);
      setTotalHours(parsedState.totalHours || 0);
      setTotalTips(parsedState.totalTips || 0);
    }
  }, []);

  useEffect(() => {
    const appState = {
      step,
      employeeData,
      totalHours,
      totalTips,
    };
    localStorage.setItem('appState', JSON.stringify(appState));
  }, [step, employeeData, totalHours, totalTips]);

  const handleDoneInHours = (data) => {
    const hoursSum = data.reduce((sum, emp) => sum + emp.hoursWorked, 0);
    setEmployeeData(data);
    setTotalHours(hoursSum);
    setStep(2);
  };

  const handleDoneInRounding = (updatedEmployeeData) => {
    const totalTipsSum = updatedEmployeeData.reduce((sum, emp) => sum + (emp.exactTips || 0), 0);
    setEmployeeData(updatedEmployeeData);
    setTotalTips(totalTipsSum);
    setStep(3);
  };

  const handleRestart = () => {
    localStorage.removeItem('appState');
    setStep(1);
    setEmployeeData([]);
    setTotalHours(0);
    setTotalTips(0);
  };

  const handleReturnToRounding = () => {
    setStep(2);
  };

  return (
    <div id="app">
      <h1>Tip Calculator</h1>
      <button onClick={handleRestart} id="restartButton">Restart</button>

      {step === 1 && <hours onDone={handleDoneInHours} />}
      {step === 2 && (
        <Rounding
          employeeData={employeeData}
          totalTips={totalTips}
          onDone={handleDoneInRounding}
        />
      )}
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
