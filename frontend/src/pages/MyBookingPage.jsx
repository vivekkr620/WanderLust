import { useEffect, useState } from "react";
import api from "../services/api";

import MyBookingCard from "../components/Profile/MyBookingCard";

import { FaRegCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/listings/6a5b3ef9068a9f00d2823552/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);

      setBookings(res.data.bookings);
    } catch (err) {
      console.log(err);

      setError(err.response?.data?.message || "Unable to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (bookings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-24 text-center">
        <FaRegCalendarAlt className="mx-auto text-7xl text-gray-400 mb-6" />

        <h1 className="text-3xl font-bold text-gray-800">No Bookings Yet</h1>

        <p className="text-gray-500 mt-4">
          Looks like you haven't booked any stays yet.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Explore Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-10">My Bookings</h1>

      {bookings.map((booking) => (
        <MyBookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}
