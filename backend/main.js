const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'https://celebrated-naiad-0c095a.netlify.app',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));


app.use(bodyParser.json());

const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api', bookingRoutes);

app.get('/', function (req, res) {
  res.send('Hello World')
})



const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));
