import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [hobbies, setHobbies] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // Your Render URL
  const API_URL = "https://hobbyback.onrender.com/api/hobby";

  // Fetch data on load
  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const res = await axios.get(`${API_URL}/showhobby`);
        setHobbies(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hobbies:", err);
        setLoading(false);
      }
    };
    fetchHobbies();
  }, []);

  const addHobby = async (e) => {
    e.preventDefault();
    if (!name) return;
    try {
      const res = await axios.post(`${API_URL}/createhobby`, { name });
      setHobbies([...hobbies, res.data]); // Update UI instantly
      setName("");
    } catch (err) {
      alert("Error adding hobby");
    }
  };

  const deleteHobby = async (id) => {
    try {
      await axios.delete(`${API_URL}/deletehobby/${id}`);
      setHobbies(hobbies.filter(hobby => hobby._id !== id)); // Remove from UI
    } catch (err) {
      alert("Error deleting hobby");
    }
  };

  return (
    <div className="hobby-container">
      <h1>Task Manager</h1>
      <form onSubmit={addHobby}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New task..." />
        <button type="submit">Add</button>
      </form>

      {loading ? <p>Waking up Render server...</p> : (
        <ul>
          {hobbies.map(hobby => (
            <li key={hobby._id}>
              {hobby.name}
              <button onClick={() => deleteHobby(hobby._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;