import React, { useState, useEffect } from 'react';
import { Booking } from '../types';

const Bookings = () => {
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);

  useEffect(() => {
    const storedBookings = localStorage.getItem('bookingsData');
    if (storedBookings) {
      setBookingsData(JSON.parse(storedBookings));
    }
  }, []);

  const cancelBooking = (bookingId: string) => {
    const updatedBookings = bookingsData.filter(booking => booking.bookingId !== bookingId);
    setBookingsData(updatedBookings);
    localStorage.setItem('bookingsData', JSON.stringify(updatedBookings));

    const storedBookedProfessionals = localStorage.getItem('bookedProfessionals');
    let bookedProfessionals = storedBookedProfessionals ? JSON.parse(storedBookedProfessionals) : [];

    const canceledBooking = bookingsData.find(booking => booking.bookingId === bookingId);

    if (canceledBooking) {
      bookedProfessionals = bookedProfessionals.filter(professional => professional.name !== canceledBooking.professionalName);

      localStorage.setItem('bookedProfessionals', JSON.stringify(bookedProfessionals));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        <span style={{ color: '#3A83F6' }}>Code</span>
        <span style={{ color: '#A855F8' }}>Xprt</span>
        <span style={{ marginLeft: '10px' }}>Bookings</span>
      </h1>
      {bookingsData && bookingsData.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Professional Name
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Meeting Time
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Charges
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Meeting Link
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.map((booking: Booking, index: number) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-900" : "bg-white dark:bg-gray-800"}>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{booking.bookingId}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{booking.professionalName}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{booking.meetingTime}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{booking.orderId}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">₹{booking.charges}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Will be shared by email</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => cancelBooking(booking.bookingId)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 mt-5">No bookings made! Head to <a href="/custom-path" style={{ color: '#3A83F6' }}>Custom Path</a> page to make a new booking</p>
      )}
    </div>
  );
};

export default Bookings;
