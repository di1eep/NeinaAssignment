const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/openSlots', bookingController.openSlots);
router.post('/bookSlot', bookingController.bookSlot);
router.get('/getSlots', bookingController.getSlots);
router.delete('/deleteBooking', bookingController.deleteBooking);

module.exports = router;