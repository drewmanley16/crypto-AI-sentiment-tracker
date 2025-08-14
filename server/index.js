const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const cron = require('node-cron');
require('dotenv').config();

const cryptoRoutes = require('./routes/crypto');
const sentimentRoutes = require('./routes/sentiment');
const { updateCryptoPrices } = require('./utils/cryptoService');
const { updateSentimentData } = require('./utils/sentimentService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/crypto', cryptoRoutes);
app.use('/api/sentiment', sentimentRoutes);

// Socket connection
io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Global variable to store real-time data
global.io = io;
global.cryptoData = {};
global.sentimentData = {};

// Scheduled tasks - Update crypto prices every 30 seconds
cron.schedule('*/30 * * * * *', async () => {
  try {
    await updateCryptoPrices();
    console.log('Crypto prices updated');
  } catch (error) {
    console.error('Error updating crypto prices:', error);
  }
});

// Update sentiment data every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  try {
    await updateSentimentData();
    console.log('Sentiment data updated');
  } catch (error) {
    console.error('Error updating sentiment data:', error);
  }
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Starting initial data fetch...');
  
  // Initial data fetch
  updateCryptoPrices();
  updateSentimentData();
});
