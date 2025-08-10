const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const creditCardRoutes = require('./routes/creditCardRoutes');

const app = express();

const PORT = process.env.PORT || 10000;


// Allow CORS for frontend (adjust origin as needed)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.use('/api/credit-card', creditCardRoutes());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});