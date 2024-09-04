const express = require('express');
const app = express();

const roomRoutes = require('./routes/roomRoutes')
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000
const dbURI = 'mongodb+srv://user:UsEr@express.jixdggx.mongodb.net/HRM?retryWrites=true&w=majority&appName=express';
mongoose.connect(dbURI).then(() => app.listen(PORT, () => console.log("server running")))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use('/api/rooms', require('./routes/roomRoutes'));