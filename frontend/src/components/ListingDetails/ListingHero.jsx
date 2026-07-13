export default function ListingHero({ listing }) {
  return (
    <div className="max-w-6xl mx-auto mt-8 mb-8">
      <img
        src={listing.image.url}
        alt={listing.title}
        className=" w-full h-64 md:h-80 lg:h-96 object-cover rounded-3xl shadow-lg "
      />
    </div>
  );
}