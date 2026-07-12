import listings from "../../data/listings.js"
import ListingCard from "./ListingCard"

function Listings () {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
            {
                listings.map((listing) => (
                    <ListingCard
                        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition duration-300 hover:shadow-xl hover:scale-105"
                        key={listing.id}
                        listing={listing}
                    />
                ))
            }
        </div>
    )
}

export default Listings;
