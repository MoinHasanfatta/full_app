const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const cors = require('cors');

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
});
app.get("/", (req,res)=>{
    res.send("Welcome to Testing CRUD")
})
// User schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});
const User = mongoose.model('User', userSchema);

// Create a new user
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);  // Respond with created user
});

// Get all users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);  // Respond with all users
});

// Update a user by ID
app.patch('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);  // Respond with updated user
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);  // Respond with deleted user
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
