import { useState, useEffect } from 'react';
import './App.css';

function Hours({ onDone }) {
  const [employee, setEmployees] = useState(1);
  const [workedHours, setWorkedHours] = useState(0);
  const [employeeData, setEmployeeData] = useState([]);
  const [totalHours, setTotalHours] = useState(0);

  // Load data from localStorage if it exists
  useEffect(() => {
    const storedEmployeeData = localStorage.getItem('employeeData');
    const storedTotalHours = localStorage.getItem('totalHours');
    const storedEmployee = localStorage.getItem('employee');

    if (storedEmployeeData) {
      setEmployeeData(JSON.parse(storedEmployeeData));
    }
    if (storedTotalHours) {
      setTotalHours(Number(storedTotalHours));
    }
    if (storedEmployee) {
      setEmployees(Number(storedEmployee));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('employeeData', JSON.stringify(employeeData));
    localStorage.setItem('totalHours', totalHours);
    localStorage.setItem('employee', employee);
  }, [employeeData, totalHours, employee]);

  const handleHoursChange = (event) => {
    setWorkedHours(Number(event.target.value));
  };

  const nextEmployee = () => {
    // Save current employee data before moving to next employee
    setEmployeeData((prevData) => [
      ...prevData,
      { employeeNumber: employee, hoursWorked: workedHours, roundedHours: null },
    ]);
    setTotalHours((prevTotal) => prevTotal + workedHours);
    setEmployees((prevEmployee) => prevEmployee + 1);
    setWorkedHours(0);
  };

  const prevEmployee = () => {
    if (employee > 1) {
      setEmployees((prevEmployee) => prevEmployee - 1);
      const removedEmployee = employeeData.pop();
      setEmployeeData([...employeeData]);
      setTotalHours((prevTotal) => prevTotal - removedEmployee.hoursWorked);
      setWorkedHours(removedEmployee.hoursWorked);
    }
  };

  const handleDone = () => {
    // Save the last employee's data
    setEmployeeData((prevData) => [
      ...prevData,
      { employeeNumber: employee, hoursWorked: workedHours, roundedHours: null },
    ]);
    setTotalHours((prevTotal) => prevTotal + workedHours);
    onDone(employeeData); // Pass employee data to App.jsx
  };

  return (
    <div id="employeeVals">
      <div id="employeeText">How many hours did employee {employee} work?</div>
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
        workedHours = {workedHours}, totalHours = {totalHours}, employee = {employee}
      </div>
    </div>
  );
}

export default Hours;