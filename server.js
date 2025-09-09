const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const axios = require('axios');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const OpenAI = require('openai');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'KSTrades API is running!' });
});

app.get('/api/stocks', async (req, res) => {
  try {
    const mockStocks = [
      { ticker: 'AAPL', price: 175.50, changePercent: 2.5, volume: 50000000, float: 15000000000 },
      { ticker: 'TSLA', price: 245.30, changePercent: -1.8, volume: 75000000, float: 3200000000 },
      { ticker: 'NVDA', price: 420.75, changePercent: 5.2, volume: 45000000, float: 2500000000 }
    ];
    res.json(mockStocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    res.json({ response: 'Hello! I am your KSTrades AI assistant. How can I help you with stock analysis today?' });
  } catch (error) {
    res.status(500).json({ error: 'Chat service unavailable' });
  }
});

server.listen(PORT, () => {
  console.log(`KSTrades API running on port ${PORT}`);
});
