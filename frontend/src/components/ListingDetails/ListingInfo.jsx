// import { FaLocationDot } from "react-icons/fa6";


// export default function ListingInfo({ listing }) {
//   return (
//     <div className="mt-8 mb-10">

//       {/* Title */}
//       <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//         {listing.title}
//       </h1>

//       {/* Location */}
//       <div className="flex items-center gap-2 mt-3 text-gray-600">
//         <FaLocationDot className="text-rose-500 text-lg" />

//         <span className="text-lg">
//           {listing.location}, {listing.country}
//         </span>
//       </div>

//       {/* Price */}
//       <div className="mt-6">
//         <span className="text-3xl font-bold text-gray-900">
//           ₹{listing.price}
//         </span>

//         <span className="text-lg text-gray-500 ml-2">
//           / night
//         </span>
//       </div>

//     </div>
//   );
// }




import { FaLocationDot } from "react-icons/fa6";

export default function ListingInfo({ listing }) {
  return (
    <div>
      {/* Title */}
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 leading-tight">
        {listing.title}
      </h1>

      {/* Location */}
      <div className="flex items-center gap-2 mt-2 text-gray-600 font-medium">
        <FaLocationDot className="text-rose-500 text-lg" />
        <span className="text-lg">
          {listing.location}, {listing.country}
        </span>
      </div>

      {/* Price - You can remove this if you only want the price in the Booking Card */}
      <div className="mt-4">
        <span className="text-2xl font-bold text-gray-900">
          ₹{listing.price}
        </span>
        <span className="text-lg text-gray-500 ml-1">/ night</span>
      </div>
    </div>
  );
}