import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [seats, setSeats] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const formattedDate = date.toISOString().split('T')[0]; 
    fetchSlots(formattedDate);
  }, [date]);

  const fetchSlots = async (selectedDate) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://neinaassignmentbackend.onrender.com/api/getSlots?date=${selectedDate}`);
      setSlots(response.data || []); 
    } catch (error) {
      console.error("Error fetching slots:", error);
      setSlots([]); 
    } finally {
      setLoading(false);
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot); 
  };

  const handleBooking = async () => {
    if (!name || !contact || seats <= 0) {
      alert('Please fill out all fields.');
      return;
    }

    const bookingData = {
      date: date.toISOString().split('T')[0],
      time: selectedSlot.time,
      name,
      contact,
      seats
    };

    try {
      await axios.post('https://neinaassignmentbackend.onrender.com/api/bookSlot', bookingData);
      alert('Booking successful');
      fetchSlots(date.toISOString().split('T')[0]); 
    } catch (error) {
      alert('Error booking the slot.');
      console.error(error);
    }
  };

  const handleDeleteBooking = async () => {
    if (!contact) {
      alert('Please provide the contact to delete the booking.');
      return;
    }

    const deleteData = {
      date: date.toISOString().split('T')[0],
      time: selectedSlot.time,
      contact
    };

    try {
      await axios.delete('https://neinaassignmentbackend.onrender.com/api/deleteBooking', { data: deleteData });
      alert('Booking deleted successfully');
      fetchSlots(date.toISOString().split('T')[0]); 
    } catch (error) {
      alert('Error deleting the booking.');
      console.error(error);
    }
  };

  const handleDateChange = (newDate) => {
    const correctedDate = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()));
    setDate(correctedDate);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Slot Booking System</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          <Calendar
            onChange={handleDateChange}
            value={date}
          />
        </div>
        <div style={{ flexGrow: 1 }}>
          <h2>Available Slots for {date.toISOString().split('T')[0]}</h2>
          {loading ? <p>Loading...</p> : (
            slots.length === 0 ? (
              <p>No slots available for this date.</p>
            ) : (
              <div>
                {slots.map((slot) => (
                  <div key={slot._id} style={{ marginBottom: '10px' }}>
                    <button
                      style={{
                        padding: '10px',
                        margin: '5px',
                        backgroundColor: 'lightblue',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleSlotClick(slot)}
                    >
                      {slot.time} - {slot.availableSeats} Seats Available
                    </button>
                  </div>
                ))}
              </div>
            )
          )}

          {selectedSlot && (
            <div>
              <h3>Book Slot: {selectedSlot.time}</h3>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <input
                type="number"
                placeholder="Seats"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                min="1"
                max={selectedSlot.availableSeats}
              />
              <div>
                <button onClick={handleBooking} style={{ marginRight: '10px' }}>
                  Book Slot
                </button>
                <button onClick={handleDeleteBooking} style={{ backgroundColor: 'red', color: 'white' }}>
                  Delete Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
