const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const stockRoutes = require('./routes/stocks');

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only your React app's origin
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/stocks', stockRoutes);

app.get('/', (req, res) => {
  res.send('Stock Market Simulator API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});