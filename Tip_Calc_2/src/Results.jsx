import React, { useEffect, useState } from 'react';

function Results({ employeeData, totalHours, totalTips, onRestart, onReturnToRounding }) {
  const [roundedTotalTips, setRoundedTotalTips] = useState(0);
  const [roundedTotalHours, setRoundedTotalHours] = useState(0);

  useEffect(() => {
    if (employeeData.length > 0) {
      const roundedTips = employeeData.reduce((sum, emp) => sum + (emp.roundedTips || 0), 0);
      const roundedHours = employeeData.reduce((sum, emp) => sum + (emp.adjustedHours || emp.hoursWorked), 0);

      setRoundedTotalTips(roundedTips);
      setRoundedTotalHours(roundedHours);
    }
  }, [employeeData]);

  return (
    <div>
      <button onClick={onRestart}>Restart</button>
      <button onClick={onReturnToRounding}>Return to Rounding</button>
      <div className='statsBox'>
        <h3>Overall Stats</h3>
        <p><strong>Total Hours Worked (Rounded):</strong> {roundedTotalHours.toFixed(4)}</p>
        <p><strong>Total Exact Tips:</strong> ${totalTips.toFixed(2)}</p>
        <p><strong>Total Tips Earned after Rounding:</strong> ${roundedTotalTips.toFixed(2)}</p>
        <p><strong>Tips per Hr:</strong> ${(roundedTotalHours ? totalTips / roundedTotalHours : 0).toFixed(4)}</p>
      </div>

      <h3>Partner Tips Breakdown</h3>
      <table>
        <thead>
          <tr>
            <th>Partner #</th>
            <th>Hrs Worked</th>
            <th>Exact Tips</th>
            <th>Rounded Tips</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((emp, index) => (
            <tr key={index}>
              <td>{emp.employeeNumber}</td>
              <td>{emp.adjustedHours || (emp.hoursWorked? emp.hoursWorked : 0)}</td>
              <td>${(emp.exactTips || 0).toFixed(2)}</td>
              <td>${(emp.roundedTips || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
