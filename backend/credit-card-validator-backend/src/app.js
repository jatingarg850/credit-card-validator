const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const creditCardRoutes = require('./routes/creditCardRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// Allow CORS for frontend (adjust origin as needed)
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());

app.use('/api/credit-card', creditCardRoutes());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});