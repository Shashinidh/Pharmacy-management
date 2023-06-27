const express = require('express');
const server = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const cors = require('cors');

// Set up environment variables
require('dotenv').config();

// Connect to MongoDB using the MONGODB_URL environment variable
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('connected', () => {
  console.log('Connected to MongoDB');
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server started on port ${process.env.PORT || 8000}`);
});
