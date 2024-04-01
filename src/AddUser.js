import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';


function NewUser({ onAddUser }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { id: Date.now(), firstName, lastName, username, email, password};
        onAddUser(newUser);
        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');
        setPassword('');
    };

    function onAddUser(newUser) {
        fetch('http://localhost:3001/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 400) {
                throw new Error('Username already exists');
            }
            else if (res.status === 500) {
                throw new Error('Failed to create user');
            }
          }
          return res.json();
        })
        .then((data) => {
          alert('User added successfully!');
        })
        .catch((error) => {
          console.error('Error adding user:', error);
          setError(error.message);
        });
    }
    
        return (
            <div>
                <h2>Add a New User</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>FirstName:</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div>
                        <label>LastName:</label>
                        <textarea value={lastName} onChange={(e) => setLastName(e.target.value)}></textarea>
                    </div>
                    <div>
                    <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                    <label>Email:</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                    <label>Password:</label>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Add User</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        );
    }

    export default NewUser;