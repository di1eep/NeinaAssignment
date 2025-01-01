const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors(
  {
origin: 'http://localhost:8080',
methods: ['GET', 'POST', 'DELETE'],
credentials: true
  }
));


app.use(bodyParser.json());

const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));
