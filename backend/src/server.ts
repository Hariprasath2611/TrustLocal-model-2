import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { mapRoutes } from './routes/map';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes); // Keep existing auth routes if they exist/work, or replace.
// For this task, we focus on the map features.
app.use('/api', mapRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('TrustLocal Backend with Firebase is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
