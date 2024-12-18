import { useState, useEffect } from 'react';
import './App.css';

function hours({ onDone }) {
  const [employeeNumber, setEmployeeNumber] = useState(1);
  const [workedHours, setWorkedHours] = useState(0);
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const storedEmployeeData = localStorage.getItem('employeeData');
    if (storedEmployeeData) {
      setEmployeeData(JSON.parse(storedEmployeeData));
    }
  }, []);

  const handleHoursChange = (event) => {
    setWorkedHours(Number(event.target.value));
  };

  const nextEmployee = () => {
    if (workedHours <= 0) {
      alert("Please enter valid hours for the employee.");
      return;
    }

    const updatedData = [
      ...employeeData,
      { employeeNumber, hoursWorked: workedHours, roundedHours: null },
    ];
    setEmployeeData(updatedData);
    setWorkedHours(0);
    setEmployeeNumber(employeeNumber + 1);
  };

  const prevEmployee = () => {
    if (employeeNumber <= 1) return;

    const lastEmployee = employeeData.pop();
    setEmployeeData([...employeeData]);
    setEmployeeNumber(employeeNumber - 1);
    setWorkedHours(lastEmployee.hoursWorked);
  };

  const handleDone = () => {
    if (workedHours > 0) {
      const updatedData = [
        ...employeeData,
        { employeeNumber, hoursWorked: workedHours, roundedHours: null },
      ];
      setEmployeeData(updatedData);
      onDone(updatedData);
    } else {
      onDone(employeeData);
    }
  };

  return (
    <div id="employeeVals">
      <div id="employeeText">How many hours did employee {employeeNumber} work?</div>
      <input
        type="number"
        name="workedHours"
        id="hoursInput"
        min="0"
        placeholder="0"
        value={workedHours}
        onChange={handleHoursChange}
      />

      <div className="buttonArea">
        <button onClick={prevEmployee} id="prevEmployeeBtn">Back</button>
        <button onClick={handleDone} id="done">Done</button>
        <button onClick={nextEmployee} id="nextEmployeeBtn">Next</button>
      </div>

      <div>
        <strong>Debug Info:</strong>
        <p>Worked Hours: {workedHours}</p>
        <p>Total Employees Recorded: {employeeData.length}</p>
      </div>
    </div>
  );
}

export default hours;
