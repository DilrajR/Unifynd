import React, { useState, useEffect } from 'react';

function Blog() {
    const [Items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/Profile')
            .then((res) => res.json())
            .then((data) => setItems(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h2>Items for sale:</h2>
            {Items.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>{post.price}</p>
                    <p>{post.category}</p>
                    <img src={post.pictureURL} alt={post.title} style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '5px' }} />
                </div>
            ))}
        </div>
    );
}
export default Blog;