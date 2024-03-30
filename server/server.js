const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/appDB', { useNewUrlParser: true,
useUnifiedTopology: true });
const postSchema = new mongoose.Schema({ 
    title: String, 
    content: String, 
    pictureURL: String
});
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String
});
const Post = mongoose.model('Post', postSchema);
const User = mongoose.model('User', userSchema);

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());

mongoose.connection.on('error', err => {
    console.log('MongoDB connection error:', err);
  });
  



// WITH MongoDB
app.get('/Sale', async (req, res) => {
    try {
    const posts = await Post.find({});
    res.json(posts);
    } catch (err) {
    res.status(500).send(err);
    }
    });

app.get('/Home', (req, res) => {
    const homeData = {
        message: 'Welcome to our website! Explore our blog for interesting articles.'
    };
    res.json(homeData);
});


// WITH MongoDB
app.post('/Posts', async (req, res) => {
    const { title, content, pictureURL } = req.body;
    if (!title || !content || !pictureURL) {
      return res.status(400).json({ error: 'Title, content, and picture URL are required' });
    }
    try {
      // Save post data with picture URL to MongoDB
      const newPost = new Post({ title, content, pictureURL });
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
        const newUser = new User({ firstName, lastName, username, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
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

  

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});