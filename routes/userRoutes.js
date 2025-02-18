// const express = require('express');
// const User = require('../models/User');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// const app = express();
// app.use(bodyParser.json());
// // Register a new user
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const newUser = new User({ name, email, password });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Fetch all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.post('/login', async(req, res) => {
//     //alert(res);
//     const { email, password } = req.body;
//     console.log(email,+' '+password);
//     // Find user by email
//     const user = await User.findOne((u) => u.email === email);
    
//     if (!user || user.password !== password) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }
  
//     // Generate a JWT token
//     const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', {
//       expiresIn: '1h',
//     });
  
//     res.json({ message: 'Login successful', token });
//   });

// module.exports = router;