import React, { useState } from 'react';
import { useEffect } from 'react';

function Blog() {
    const [Items, setItems] = useState([
        { id: 1, title: 'First Item', content: 'This is the first item.' },
        { id: 2, title: 'Second Item', content: 'This is the second item.' }
    ]);
    function fetchItems() {
        fetch('http://localhost:3001/Sale')
            .then((res) => res.json())
            .then((data) => setItems(data));
    }
    
    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <h2>Items for sale:</h2>
            {Items.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <img src={post.pictureURL} alt={post.title} style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '5px' }} />
                </div>
            ))}
        </div>
    );
}
export default Blog;