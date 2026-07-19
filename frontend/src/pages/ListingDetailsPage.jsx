import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";
import AuthContext from "../context/AuthContext";

import ListingHero from "../components/ListingDetails/ListingHero";
import ListingInfo from "../components/ListingDetails/ListingInfo";
import ListingDescription from "../components/ListingDetails/ListingDescription";
import BookingCard from "../components/ListingDetails/BookingCard";

export default function ListingDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useContext(AuthContext);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        setListing(res.data.listing);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await api.delete(`/listings/${listing._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);

      navigate("/");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to delete listing"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Listing...
      </div>
    );
  }

  if (!listing) {
    return (
      <h1 className="text-center mt-20 text-2xl font-semibold text-gray-700">
        Listing Not Found
      </h1>
    );
  }

  const isOwner =
    isAuthenticated &&
    user &&
    listing.owner &&
    user.id === listing.owner._id;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20">
      <ListingHero listing={listing} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
        <div className="lg:col-span-2 flex flex-col gap-8">

          <ListingInfo listing={listing} />

          {/* Owner Actions */}
          {isOwner && (
            <div className="flex gap-4">

              <button
                onClick={() =>
                  navigate(`/listings/${listing._id}/edit`)
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Edit Listing
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Delete Listing
              </button>

            </div>
          )}

          <hr className="border-gray-200" />

          <ListingDescription listing={listing} />
        </div>

        <div className="relative">
          <BookingCard listing={listing} />
        </div>
      </div>
    </div>
  );
}