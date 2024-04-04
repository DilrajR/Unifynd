import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';

function Messages() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const fetchMessages = () => {
        fetch("http://localhost:3001/message")
            .then(response => response.json())
            .then(data => {
                setMessages(data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    function sendMessages() {
        fetch("http://localhost:3001/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Message sent successfully")
                    fetchMessages();
                } else if (response.status === 400) {
                    throw new Error("Cannot send message");
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    return (
        <>
            <Navbar />
            <div>
                <h1>Messages</h1>
                <div className="message-list">
                    {messages.slice().map((msg, index) => (
                        <div key={index} className="message-item">
                            <p>{msg.text}</p>
                            <p>Sent by: {msg.userName}</p>
                            <p>Sent to: {msg.receiverName}</p>
                            <p>Date: {new Date(msg.date).toLocaleString()}</p>
                            <p>{msg.message}</p>
                            <p>----------------------------------</p>
                        </div>
                    ))}
                </div>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="message"
                    type="text"
                />
                <button onClick={sendMessages}>Send Message</button>
            </div>
        </>
    );
}

export default Messages;