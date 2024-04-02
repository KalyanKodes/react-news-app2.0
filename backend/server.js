const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://rajkalyandev:root@test.rhtgkqj.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    console.log('Database:', mongoose.connection.name);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Endpoint for handling user signup requests
app.post('/signup', async (req, res) => {
  // Extracting username and password from request body
  const { username, password } = req.body;

  try {
    // Checking if user with provided username already exists in the database
    const existingUser = await User.findOne({ username });
    
    // If user already exists, return 400 Bad Request status with error message
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // If user does not exist, create a new user and save to the database
    const newUser = new User({ username, password });
    await newUser.save();
    
    // Return 201 Created status with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handling any errors that occur during user registration
    console.error('Error registering user:', error);
    // Returning 500 Internal Server Error status with error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// Endpoint for handling user login requests
app.post('/login', async (req, res) => {
  // Extracting username and password from request body
  const { username, password } = req.body;

  try {
    // Attempting to find user with provided credentials in the database
    const user = await User.findOne({ username, password });

    // If user is not found, return 401 Unauthorized status with error message
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If user is found, return 200 OK status with success message
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    // Handling any errors that occur during login process
    console.error('Error logging in:', error);
    // Returning 500 Internal Server Error status with error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// app.get('/test', (req, res) => {
//   res.send('working');
// });

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });
