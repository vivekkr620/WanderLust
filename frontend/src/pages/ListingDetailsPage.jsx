// import { useParams } from "react-router-dom";
// import listings from "../data/listings";
// import ListingHero from "../components/ListingDetails/ListingHero";
// import ListingInfo from "../components/ListingDetails/ListingInfo";
// import ListingDescription from "../components/ListingDetails/ListingDescription";
// import BookingCard from "../components/ListingDetails/BookingCard";

// export default function ListingDetailsPage() {
//   const { id } = useParams();

//   // const listing = listings.find((listing) => {
//   //     return listing.id === Number(id);
//   // });
//   const listing = listings.find((listing) => listing.id === Number(id));

//   if (!listing) {
//     return <h1>Listing Not Found</h1>;
//   }

//   return (
//     <div>
//       {/* its a responsibility of ListingInfo  */}
//       {/* <h1>{listing.title}</h1>
//         <p>{listing.location}, {listing.country}</p> */}

//       <ListingHero listing={listing} />
//       <ListingInfo listing={listing} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
//         <div className="lg:col-span-2">
//           <ListingDescription listing={listing} />
//         </div>

//         <div>
//           <BookingCard listing={listing} />
//         </div>
//       </div>
//     </div>
//   );
// }



import { useParams } from "react-router-dom";
import listings from "../data/listings";
import ListingHero from "../components/ListingDetails/ListingHero";
import ListingInfo from "../components/ListingDetails/ListingInfo";
import ListingDescription from "../components/ListingDetails/ListingDescription";
import BookingCard from "../components/ListingDetails/BookingCard";

export default function ListingDetailsPage() {
  const { id } = useParams();
  const listing = listings.find((listing) => listing.id === Number(id));

  if (!listing) {
    return <h1 className="text-center mt-20 text-2xl font-semibold text-gray-700">Listing Not Found</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20">
      <ListingHero listing={listing} />
      
      {/* Grid Layout for Professional Spacing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-10">
        
        {/* Left Side: Info & Description */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <ListingInfo listing={listing} />
          
          {/* Separator Line */}
          <hr className="border-gray-200" />
          
          <ListingDescription listing={listing} />
        </div>

        {/* Right Side: Sticky Booking Card */}
        <div className="relative">
          <BookingCard listing={listing} />
        </div>
        
      </div>
    </div>
  );
}