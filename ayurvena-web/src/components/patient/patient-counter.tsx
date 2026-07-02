"use client";
import { useState } from "react";
interface PatientCounterProps {
  department: string;
}

export function PatientCounter({ department }: PatientCounterProps) {
  const [count, setCount] = useState(0);
  const [waitingList, setWaitingList] = useState<string[]>([]);
  const [patientName, setPatientName] = useState("");

  const addPatient = () => {
    if (patientName.trim()) {
      setWaitingList([...waitingList, patientName.trim()]);
      setCount(count + 1);
      setPatientName("");
    }
  };

  const removePatient = (index: number) => {
    const updated = waitingList.filter((_, i) => i !== index);
    setWaitingList(updated);
    setCount(count - 1);
  };

  return (
    <div>
      <h2>{department} — Waiting Room</h2>
      <p>Total patients: {count}</p>

      <div>
        <input
          type="text"
          placeholder="Enter patient name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <button onClick={addPatient}>Add Patient</button>
      </div>

      <ul>
        {waitingList.map((name, index) => (
          <li key={index}>
            {name}
            <button onClick={() => removePatient(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}