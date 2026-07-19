import { Link } from "react-router-dom";

function ListingCard({ listing }) {
  return (
    <Link
      to={`/listings/${listing._id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
    >
      <img
        src={listing.image.url}
        alt={listing.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <h2 className="font-semibold text-lg">
          {listing.title}
        </h2>

        <p className="text-gray-500">
          {listing.location}, {listing.country}
        </p>

        <p className="font-bold mt-2">
          ₹{listing.price} / night
        </p>
      </div>
    </Link>
  );
}

export default ListingCard;