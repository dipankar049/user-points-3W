const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const claimRoutes = require('./routes/claimRoutes');

dotenv.config();
connectDB();

const app = express();
const allowedOrigin = process.env.CLIENT_URL || "http://localhost:2173";
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/claim', claimRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
