import { set } from 'mongoose';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB0ESvN7O6EwyI98AAIw-jdFRaud5qGLQQ",
    authDomain: "cps630-project-ba3eb.firebaseapp.com",
    projectId: "cps630-project-ba3eb",
    storageBucket: "cps630-project-ba3eb.appspot.com",
    messagingSenderId: "1010540454168",
    appId: "1:1010540454168:web:2ff8c42b873ef28f47fe6d",
    measurementId: "G-EQWD2H27HV"
};

firebase.initializeApp(firebaseConfig);

function NewPost({ onAddPost }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [picture, setPicture] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { id: Date.now(), title, content, pictureURL: picture };
        onAddPost(newPost);
        setTitle('');
        setContent('');
        setPicture('');
    };

    function onAddPost(newPost) {
        fetch('http://localhost:3001/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then((res) => res.json())
            .then((data) => {
                alert('Post submitted successfully!');
            });
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const uniqueFileName = `${file.name}-${Date.now()}`;
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(uniqueFileName);
        fileRef.put(file)
            .then(() => {
                console.log('Uploaded a file');
                return fileRef.getDownloadURL();
            })
            .then((url) => {
                console.log('URL:', url);
                setPicture(url);
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    }
        return (
            <div>
                <h2>Add a New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label>Content:</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label>Picture:</label>
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e)} />
                    </div>
                    <button type="submit">Add Post</button>
                </form>
            </div>
        );
    }

    export default NewPost;