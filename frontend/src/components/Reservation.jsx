import axios from 'axios';
import React, { useState } from 'react'

function Reservation() {

    const apiUrl = import.meta.env.VITE_FORM_API;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '1',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl+"/create", formData);

            if (response) {
                alert('Reservation made successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    guests: '1',
                });
            } else {
                alert('Failed to make reservation. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    function generateTimeSlots() {
        const timeSlots = [];
        const startTime = 9; // 9 AM
        const endTime = 21; // 9 PM
        const interval = 60; // 1 hour
    
        for (let hour = startTime; hour < endTime; hour++) {
            const startPeriod = hour < 12 ? 'AM' : 'PM';
            const endPeriod = (hour + 1) < 12 ? 'AM' : 'PM';
            const startHour = hour % 12 === 0 ? 12 : hour % 12;
            const endHour = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12;
    
            const time = `${startHour}:00 ${startPeriod} to ${endHour}:00 ${endPeriod}`;
            timeSlots.push(time);
        }
        return timeSlots;
    }


  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <form className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md' onSubmit={(e) => handleSubmit(e)} > 
            <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6' >Book a Reservation</h2>
            <input name='name' value={formData.name} onChange={handleChange} type="text" placeholder='Full Name' required  className='w-full p-3 border rounded-lg focus:ring-emerald-300' />
            <input name='email' value={formData.email} onChange={handleChange} type="email" placeholder='Email'  required className='w-full p-3 border rounded-lg focus:ring-emerald-300' />
            <input name='phone' value={formData.phone} onChange={handleChange} type="tel" placeholder='Phone Number' required className='w-full p-3 border rounded-lg focus:ring-emerald-300' />
            <input name='date' value={formData.date} onChange={handleChange} type="date" required className='w-full p-3 border rounded-lg focus:ring-emerald-300' />

            <select required name='time' value={formData.time} onChange={handleChange} className='w-full p-3 border rounded-lg focus:ring-emerald-300'>
                <option value="">Select Time</option>

                {
                    generateTimeSlots().map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))
                }

            </select>

            <select required name='guests' value={formData.guests} onChange={handleChange} className='w-full p-3 border rounded-lg focus:ring-emerald-300'>
                {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1} Guest(s)</option>
                ))}
            </select>


                <button type='submit'
                    className='w-full bg-emerald-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out mt-4'
                >Book Now</button>
        </form>
    </div>
  )
}

export default Reservation