import { useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

export default function ReviewForm({ refreshListing }) {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        `/listings/${id}/reviews`,
        {
          review: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      await refreshListing();

      // Reset Form
      setFormData({
        rating: "",
        comment: "",
      });

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to submit review"
      );
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-6">
        Leave a Review
      </h3>

      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* Rating */}
        <div>
          <label className="block mb-2 font-medium">
            Rating
          </label>

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="">Select Rating</option>
            <option value="1">⭐ 1 - Poor</option>
            <option value="2">⭐⭐ 2 - Fair</option>
            <option value="3">⭐⭐⭐ 3 - Good</option>
            <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
            <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="block mb-2 font-medium">
            Comment
          </label>

          <textarea
            rows="5"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Share your experience..."
            className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition"
        >
          Submit Review
        </button>

      </form>
    </div>
  );
}