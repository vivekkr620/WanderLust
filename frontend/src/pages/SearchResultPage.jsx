import { useSearchParams } from "react-router-dom";
import listings from "../data/listings";
import ListingCard from "../components/Listings/ListingCard";

function SearchResultPage() {
  const [searchParams] = useSearchParams();

  // 1. Get the query and convert it to lowercase for case-insensitive searching
  const query = searchParams.get("q")?.toLowerCase() || "";

  // 2. Filter the dummy data based on the search query
  const filteredListings = listings.filter((listing) => {
    
    if (!query) return true;

    // Check if the query matches the title, location, or country
    return (
      listing.title.toLowerCase().includes(query) ||
      listing.location.toLowerCase().includes(query) ||
      listing.country.toLowerCase().includes(query)
    );
  });

  return (
   
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl min-h-screen">
      {/* Page Header Area */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Search Results{" "}
          {searchParams.get("q") && `for "${searchParams.get("q")}"`}
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Found {filteredListings.length}{" "}
          {filteredListings.length === 1 ? "property" : "properties"}
        </p>
      </div>

      {/* Grid Layout for Cards */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        // Professional Empty State (When no results match)
        <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold text-gray-800">
            No properties found
          </h2>
          <p className="text-gray-500 mt-2 text-center max-w-md">
            We couldn't find any listings matching "{searchParams.get("q")}".
            Try adjusting your search or exploring our homepage.
          </p>
        </div>
      )}
    </main>
  );
}

export default SearchResultPage;
