export default function ListingDescription({ listing }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">About this place</h2>
      <p className="text-gray-600 leading-relaxed text-lg">
        {listing.description}
      </p>
    </div>
  );
}