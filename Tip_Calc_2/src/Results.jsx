import React, { useEffect, useState } from 'react';

function Results({ employeeData, totalHours, totalTips, onRestart, onReturnToRounding }) {
  const [exactTotalHours, setExactTotalHours] = useState(totalHours);
  const [roundedTotalHours, setRoundedTotalHours] = useState(0);
  const [exactTotalTips, setExactTotalTips] = useState(totalTips);
  const [roundedTotalTips, setRoundedTotalTips] = useState(0);

  useEffect(() => {
    if (employeeData.length > 0) {
      const roundedHours = employeeData.reduce((sum, emp) => sum + (emp.roundedHours || emp.hoursWorked), 0);
      const roundedTips = employeeData.reduce((sum, emp) => sum + (emp.roundedTips || 0), 0);

      setRoundedTotalHours(roundedHours);
      setRoundedTotalTips(roundedTips);
    }
  }, [employeeData]);

  return (
    <div>
      <h2>Results</h2>

      {/* Stats Section */}
      <div>
        <h3>Stats</h3>
        <p><strong>Total Exact Hours Worked:</strong> {exactTotalHours}</p>
        <p><strong>Total Rounded Hours Worked:</strong> {roundedTotalHours}</p>
        <p><strong>Total Exact Tips Earned:</strong> ${exactTotalTips.toFixed(2)}</p>
        <p><strong>Total Rounded Tips Earned:</strong> ${roundedTotalTips.toFixed(2)}</p>
      </div>

      {/* Employee Breakdown */}
      <h3>Employee Breakdown</h3>
      <table>
        <thead>
          <tr>
            <th>Employee #</th>
            <th>Exact Hrs Worked</th>
            <th>Rounded Tips</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((emp, index) => (
            <tr key={index}>
              <td>{emp.employeeNumber}</td>
              <td>{emp.hoursWorked}</td>
              <td>${(emp.roundedTips || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Buttons */}
      <div>
        <button onClick={onRestart}>Restart</button>
        <button onClick={onReturnToRounding}>Return to Rounding</button>
      </div>

      <div>
        <strong>Debug Info:</strong>
        <p>Number of Employees: {employeeData.length}</p>
      </div>
    </div>
  );
}

export default Results;