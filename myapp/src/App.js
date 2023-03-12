import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [points, setPoints] = useState(null);

  async function handleSearch() {
    const response = await fetch(`http://127.0.0.1:5000/users?name=${name}`);
    const data = await response.json();
    setPoints(null);
    console.log(data)
    if (data.length > 0) {
      const user = data.find(u => u.name === name);
      if (user) {
        setPoints(user.points);
      } else {
        setPoints(null);
      }
    } else {
      setPoints(null);
    }
  }
  
  async function handleCreate() {
    const response = await fetch("http://127.0.0.1:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        points: points
      })
    });
    if (response.ok) {
      alert("User created successfully");
    } else {
      alert("Error creating user");
    }
  }
  
  async function handleDelete() {
    const response = await fetch(`http://127.0.0.1:5000/users/${name}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert("User deleted successfully");
    } else {
      alert("Error deleting user");
    }
  }
  

  return (
    <div>
      <h1>Retrieve Points from User by Name</h1>
      <div>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div id="pointsDisplay">
        {points !== null && <p>Points: {points}</p>}
      </div>
      <h1>Create User</h1>
      <div>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Points: </label>
        <input type="number" value={points} onChange={(e) => setPoints(e.target.value)} />
        <button onClick={handleCreate}>Create</button>
      </div>
  
      <h1>Delete User</h1>
      <div>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}  

export default App;

