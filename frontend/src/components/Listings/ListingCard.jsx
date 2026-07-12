function ListingCard({ listing }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer">
      <img
          src={listing.image.url}
          alt={listing.title}
          className="w-full h-64 object-cover"
      />

      <h2 className="font-semibold text-lg">
          {listing.title}
      </h2>

      <p className="text-gray-500">
        {listing.location}, {listing.country}
      </p>

      <p className="mt-2 font-bold">₹{listing.price} / night</p>

    </div>
  );
}

export default ListingCard;












// function ListingCard({ listing }) {
//   // Agar listing data nahi aaya kisi wajah se, toh kuch render mat karo
//   if (!listing) return null;

//   return (
//     <div style={{
//       border: "1px solid #e0e0e0",
//       borderRadius: "10px",
//       padding: "15px",
//       width: "300px",
//       boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
//     }}>
//       {/* Property Image */}
//       <img
//         src={listing.image.url}
//         alt={listing.title}
//         style={{
//           width: "100%",
//           height: "200px",
//           objectFit: "cover",
//           borderRadius: "8px"
//         }}
//       />

//       {/* Property Details */}
//       <h3 style={{ margin: "10px 0" }}>{listing.title}</h3>
//       <p style={{ margin: "5px 0", color: "#555" }}>
//         📍 {listing.location}, {listing.country}
//       </p>
//       <p style={{ margin: "5px 0", fontWeight: "bold" }}>
//         ${listing.price} <span style={{ fontWeight: "normal", color: "#777" }}>/ night</span>
//       </p>
//     </div>
//   );
// }

// export default ListingCard;
