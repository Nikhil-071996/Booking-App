import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AdminTable() {
    const apiUrl = import.meta.env.VITE_API_URL
    const [reservations, setReservations] = useState([]);

    const handleDelete = async (id) => {
        try{
            await axios.delete(apiUrl+'/reservations/delete/'+id)
            setReservations(prev => prev.filter(res => res._id !==id))
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        const fetchReservations = async () => {
            try{
                const res = await axios.get(apiUrl+'/reservations/all')
                setReservations(res.data)

                // console.log(res)
            }catch(e){
                console.log(e)
            }
        }

        fetchReservations()
    },[])


  return (
    <div className='min-h-screen bg-gray-100 p-6'>
        <h2 className='text-3xl font-bold text-gray-700 text-center mb-6'>Admin Panel Reservtion</h2>

        <table className='w-full bg-white shadow-lg rounded-xl'>
            <thead>
                <tr className='bg-emerald-500 text-white text-left'>
                    <th className='p-3'>Name</th>
                    <th className='p-3'>Email</th>
                    <th className='p-3'>Phone</th>
                    <th className='p-3'>Date</th>
                    <th className='p-3'>Time</th>
                    <th className='p-3'>Guests</th>
                    <th className='p-3'>Delete</th>
                </tr>
            </thead>

            <tbody>
                {
                    reservations.length === 0 ? (
                    <tr>
                        <td colSpan="7" className='p-4 text-center text-gray-500 '>No reservations found</td>
                    </tr>
                    ) : (
                    reservations.map((el, index) => (
                        <tr key={el._id || index} className='border-b hover:bg-gray-500'>
                        <td className='p-3'>{el.name}</td>
                        <td className='p-3'>{el.email}</td>
                        <td className='p-3'>{el.phone}</td>
                        <td className='p-3'>{el.date}</td>
                        <td className='p-3'>{el.time}</td>
                        <td className='p-3'>{el.guests}</td>
                        <td className='p-3'>
                            <button 
                                onClick={() => handleDelete(el._id)}
                            className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition'>Delete</button>
                        </td>
                        </tr>
                    ))
                    )
                }
            </tbody>


        </table>
    </div>
  )
}

export default AdminTable