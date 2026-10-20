/*npm create vite@latest my-app -- --template react
cd my-app
npm install
src app.jsx
npm run dev*/
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [show, setShow] = useState(false);

  return (
    <div>
      <h1>Student Details</h1>

      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <input
        type="text"
        placeholder="Enter Course"
        onChange={(e) => setCourse(e.target.value)}
      />
      <br /><br />

      <button onClick={() => setShow(true)}>
        Submit
      </button>

      {show && (
        <div>
          <h2>Student Information</h2>
          <p>Name: {name}</p>
          <p>Course: {course}</p>
        </div>
      )}
    </div>
  );
}

export default App;
