const Booking = require('../models/Booking');

exports.openSlots = async (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).json({ message: 'Date is required.' });
  try {
    const existingSlots = await Booking.find({ date });
    if (existingSlots.length > 0) {
      return res.status(400).json({ message: 'Slots for this date already exist.' });
    }
    const timeSlots = [
      '09:00 AM - 12:00 PM',
      '01:00 PM - 03:00 PM',
      '04:00 PM - 07:00 PM',
      '09:00 PM - 12:00 AM'
    ];
    const slots = timeSlots.map(time => ({
      date,
      time,
      availableSeats: 50,
      bookings: []
    }));
    await Booking.insertMany(slots);
    res.status(201).json({ message: 'Slots opened successfully', slots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bookSlot = async (req, res) => {
  const { date, time, name, contact, seats } = req.body;
  if (!date || !time || !name || !contact || !seats) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const existingBooking = await Booking.findOne({ date, time });
    if (!existingBooking) {
      return res.status(404).json({ message: 'Slot not found.' });
    }
    if (existingBooking.availableSeats < seats) {
      return res.status(400).json({ message: 'Not enough available seats.' });
    }
    existingBooking.bookings.push({ name, contact, seats });
    existingBooking.availableSeats -= seats;
    await existingBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: existingBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSlots = async (req, res) => {
  const { date } = req.query;
  try {
    let slots;
    if (date) {
      slots = await Booking.find({ date });
      if (slots.length === 0) {
        return res.status(404).json({ message: 'No slots found for this date.' });
      }
    } else {
      slots = await Booking.find();
      if (slots.length === 0) {
        return res.status(404).json({ message: 'No slots found.' });
      }
    }
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







exports.deleteBooking = async (req, res) => {
  const { date, time, contact } = req.body;
  try {
    const bookingDate = new Date(date); 
    bookingDate.setHours(0, 0, 0, 0); 
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
    const timeDifference = bookingDate - currentDate;
    const dayDifference = timeDifference / (1000 * 3600 * 24); 
    if (dayDifference <= 1) {
      return res.status(400).json({ message: 'Bookings cannot be deleted less than 24 hours of booking date.' });
    }
    const slot = await Booking.findOne({ date, time });
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found.' });
    }
    const bookingIndex = slot.bookings.findIndex(b => b.contact === contact);
    if (bookingIndex === -1) {
      return res.status(404).json({ message: 'Booking not found.' });
    }
    slot.bookings.splice(bookingIndex, 1);
    slot.availableSeats += slot.bookings[bookingIndex].seats;
    await slot.save();
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};