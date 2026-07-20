import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

export default function ReviewSection({listing, refreshListing}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold">Reviews</h2>
      <ReviewForm refreshListing={refreshListing}/> 

      {/* Sirf reviews diya and ReviewList.jsx receive this */}
      <ReviewList listingId={listing._id} reviews={listing.reviews} refreshListing={refreshListing}/>  
    </section>
  );
}
