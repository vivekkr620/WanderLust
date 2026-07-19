import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../services/api";
import ListingCard from "../components/Listings/ListingCard";

function SearchResultPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);

      try {
        const res = await api.get("/listings", {
          params: {
            q: query,
          },
        });

        setListings(res.data.listings);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [query]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-2">
        Search Results
        {query && ` for "${query}"`}
      </h1>

      <p className="text-gray-500 mb-8">
        Found {listings.length}{" "}
        {listings.length === 1 ? "property" : "properties"}
      </p>

      {listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-xl">
          No Listings Found
        </div>
      )}
    </main>
  );
}

export default SearchResultPage;