import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews, listingId, refreshListing }) {
  if (reviews.length === 0) {
    return (
      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-6">All Reviews</h3>

        <p className="text-gray-500">No reviews yet.</p>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h3 className="text-xl font-semibold mb-6">All Reviews</h3>

      <div className="space-y-5">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            listingId={listingId} // (required for the DELETE API)
            refreshListing={refreshListing} // (to refresh the UI after deletion)
          />
        ))}
      </div>
    </section>
  );
}
