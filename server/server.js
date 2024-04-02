const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/appDB', { useNewUrlParser: true,
useUnifiedTopology: true });
const postSchema = new mongoose.Schema({ 
    userName: String,
    title: String, 
    content: String, 
    city: String,
    price: Number,
    category: String,
    pictureURL: String
});
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
});
const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(session({
    secret: 'session-secret-12345@',
    resave: false,
    saveUninitialized: false
  }));
app.use(express.json());
app.use(cors());


mongoose.connection.on('error', err => {
    console.log('MongoDB connection error:', err);
  });

let userId = null;
  

// WITH MongoDB
app.get('/Sale', async (req, res) => {
    try {
    const posts = await Post.find({});
    res.json(posts);
    } catch (err) {
    res.status(500).send(err);
    }
});

app.get('/Profile', async (req, res) => {
    try {
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const posts = await Post.find({ userName: userId });
        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});


app.get('/Home', (req, res) => {
    const homeData = {
        message: 'Welcome to our website! Explore our blog for interesting articles.'
    };
    res.json(homeData);
});


// WITH MongoDB
app.post('/posts', async (req, res) => {
    const { title, content, city, price, pictureURL, category} = req.body;
    if (!title || !content || !pictureURL || !price || !category || !city) {
        return res.status(400).json({ error: 'Title, content, and picture URL are required' });
    }
    try {
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const newPost = new Post({ userName: userId, title, city, content, price, pictureURL, category });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error saving post to MongoDB:', error);
        res.status(500).json({ error: 'Failed to save post' });
    }
});

app.post('/Users', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, } = req.body;
        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({ error: 'First name, Last name, Username, email, and password are required' });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const newUser = new User({ firstName, lastName, username, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            return res.status(400).json({ error: 'Username already exists' });
        } else if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(400).json({ error: 'Email already exists' });
        } else {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
});

app.get('/Users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            req.session.userId = user.username;
            userId = user.username;
            res.json(user);
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});
  

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});