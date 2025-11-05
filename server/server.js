const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }));
app.use(compression()); // Compress responses
app.use(morgan('dev')); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/health', require('./routes/health.routes'));
app.use('/api/marine', require('./routes/marine.routes'));
app.use('/api/circular', require('./routes/circular.routes'));
app.use('/api/policy', require('./routes/policy.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/data', require('./routes/data.routes'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Indradhanu AICRS API Server',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      health: '/api/health',
      marine: '/api/marine',
      circular: '/api/circular',
      policy: '/api/policy',
      auth: '/api/auth',
      data: '/api/data'
    }
  });
});

// Health check endpoint
app.get('/api/health-check', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌍 Indradhanu AICRS Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API: http://localhost:${PORT}`);
});

module.exports = app;
