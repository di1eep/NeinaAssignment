const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  availableSeats: { type: Number, default: 50 },
  bookings: [
    {
      name: { type: String, required: true },
      contact: { type: String, required: true, validate: { validator: function (v) { return /^[1-9]\d{9}$/.test(v); }, message: props => `${props.value} is not a valid phone number!` }},
      seats: { type: Number, required: true }
    }
  ]
});

bookingSchema.index({ date: 1, 'bookings.contact': 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);