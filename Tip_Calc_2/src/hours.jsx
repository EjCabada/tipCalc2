import { useState, useEffect } from 'react';
import './App.css';

function Hours({ onDone, onRestart, initialData = [], initialTotalHours = 0 }) {
  const [employee, setEmployees] = useState(initialData.length + 1);
  const [workedHours, setWorkedHours] = useState(null); // Start with null to make the input empty
  const [employeeData, setEmployeeData] = useState(initialData);
  const [totalHours, setTotalHours] = useState(initialTotalHours);
  const [fade, setFade] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('employeeData')) || [];
    const savedTotalHours = JSON.parse(localStorage.getItem('totalHours')) || 0;

    if (savedData.length > 0) {
      setEmployeeData(savedData);
      setEmployees(savedData.length + 1);
      setTotalHours(savedTotalHours);
    }
  }, []);

  // Save data to localStorage whenever employeeData or totalHours changes
  useEffect(() => {
    localStorage.setItem('employeeData', JSON.stringify(employeeData));
    localStorage.setItem('totalHours', JSON.stringify(totalHours));
  }, [employeeData, totalHours]);

  const handleHoursChange = (event) => {
    setWorkedHours(Number(event.target.value)); // Set the worked hours when input changes
  };

  const transitionEmployee = (callback) => {
    setFade(false);
    setTimeout(() => {
      callback();
      setFade(true);
    }, 500); // Matches the fade duration
  };

  const nextEmployee = () => {
    transitionEmployee(() => {
      const updatedData = [...employeeData];
      if (employee > employeeData.length) {
        updatedData.push({
          employeeNumber: employee,
          hoursWorked: workedHours,
          roundedHours: null,
        });
      } else {
        const difference = workedHours - employeeData[employee - 1].hoursWorked;
        updatedData[employee - 1].hoursWorked = workedHours;
        setTotalHours(totalHours + difference);
      }
      setEmployeeData(updatedData);
      if (employee > employeeData.length) {
        setTotalHours(totalHours + workedHours);
      }
      setEmployees(employee + 1);
      setWorkedHours(null); // Reset workedHours after moving to next employee
    });
  };

  const prevEmployee = () => {
    transitionEmployee(() => {
      if (employee > 1) {
        const previousEmployee = employee - 1;
        setEmployees(previousEmployee);
        setWorkedHours(employeeData[previousEmployee - 1].hoursWorked || 0);
      }
    });
  };

  const handleDone = () => {
    const updatedData = [...employeeData];
    if (employee > employeeData.length) {
      updatedData.push({
        employeeNumber: employee,
        hoursWorked: workedHours,
        roundedHours: null,
      });
    } else {
      const difference = workedHours - employeeData[employee - 1].hoursWorked;
      updatedData[employee - 1].hoursWorked = workedHours;
      setTotalHours(totalHours + difference);
    }
    onDone(updatedData, totalHours + workedHours);
  };

  const handleReset = () => {
    setEmployeeData([]);
    setTotalHours(0);
    setEmployees(1);
    setWorkedHours(0);
    localStorage.removeItem('employeeData');
    localStorage.removeItem('totalHours');
    onRestart(); // Notify parent to reset as well
  };

  return (
    <div id="employeeVals" className={`fade ${fade ? 'show' : ''}`}>
      <div id="employeeText">How many hours did employee {employee} work?</div>
      <input
        type="number"
        name="workedHours"
        id="hoursInput"
        min="0"
        value={workedHours || ''} // Set to an empty string when workedHours is null
        placeholder=''
        onChange={handleHoursChange}
      />
      <div className="buttonArea">
        <button onClick={prevEmployee} id="back">Back</button>
        <button onClick={nextEmployee} id="nextEmployeeBtn">Next</button>
        <button onClick={handleDone} id="done">Done</button>
        <button onClick={handleReset} id="reset">Restart</button>
      </div>
    </div>
  );
}

export default Hours;
