// export default function BookingCard({ listing }) {
//   return (
//     <div className="sticky top-24 border border-gray-200 rounded-2xl shadow-lg p-6 bg-white">

//       {/* Price */}
//       <h2 className="text-2xl font-bold mb-6">
//         ₹{listing.price}
//         <span className="text-base font-normal text-gray-500">
//           {" "}
//           / night
//         </span>
//       </h2>

//       {/* Check In */}
//       <div className="border rounded-lg p-3 mb-3 cursor-pointer hover:bg-gray-50">
//         <p className="text-xs font-semibold text-gray-500 uppercase">
//           Check In
//         </p>
//         <p className="text-gray-700">Add date</p>
//       </div>

//       {/* Check Out */}
//       <div className="border rounded-lg p-3 mb-3 cursor-pointer hover:bg-gray-50">
//         <p className="text-xs font-semibold text-gray-500 uppercase">
//           Check Out
//         </p>
//         <p className="text-gray-700">Add date</p>
//       </div>

//       {/* Guests */}
//       <div className="border rounded-lg p-3 mb-6 cursor-pointer hover:bg-gray-50">
//         <p className="text-xs font-semibold text-gray-500 uppercase">
//           Guests
//         </p>
//         <p className="text-gray-700">1 Guest</p>
//       </div>

//       {/* Reserve Button */}
//       <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-lg transition">
//         Reserve
//       </button>

//       <p className="text-center text-sm text-gray-500 mt-4">
//         You won't be charged yet.
//       </p>
//     </div>
//   );
// }

// // export default BookingCard;


export default function BookingCard({ listing }) {
  return (
    <div className="sticky top-24 border border-gray-200 rounded-2xl shadow-xl p-6 bg-white">
      {/* Price */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-baseline gap-1">
        ₹{listing.price}
        <span className="text-base font-normal text-gray-500">/ night</span>
      </h2>

      {/* Unified Input Box (Professional Look) */}
      <div className="border border-gray-400 rounded-xl mb-4 overflow-hidden">
        {/* Dates Row */}
        <div className="flex border-b border-gray-400 w-full">
          {/* Check In */}
          <div className="flex-1 p-3 border-r border-gray-400 cursor-pointer hover:bg-gray-50 transition">
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">
              Check In
            </p>
            <p className="text-gray-500 text-sm mt-0.5">Add date</p>
          </div>

          {/* Check Out */}
          <div className="flex-1 p-3 cursor-pointer hover:bg-gray-50 transition">
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">
              Check Out
            </p>
            <p className="text-gray-500 text-sm mt-0.5">Add date</p>
          </div>
        </div>

        {/* Guests */}
        <div className="p-3 w-full cursor-pointer hover:bg-gray-50 transition">
          <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">
            Guests
          </p>
          <p className="text-gray-700 text-sm mt-0.5">1 Guest</p>
        </div>
      </div>

      {/* Reserve Button */}
      <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3.5 rounded-lg transition-colors text-lg">
        Reserve
      </button>

      <p className="text-center text-sm text-gray-500 mt-4">
        You won't be charged yet.
      </p>
    </div>
  );
}