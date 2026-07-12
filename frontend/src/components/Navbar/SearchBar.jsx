import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {

  const navigate = useNavigate();

  const [ searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
    
    console.log("Submitted");
    console.log(searchQuery);
  }

  return (
    <form
      onSubmit={handleSubmit} 
      className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm"
    >
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="Search destinations..."
        className="px-4 py-2 w-72 outline-none"
      />

      <button
        type="submit"
        // onClick={handleSubmit}
        className="bg-red-500 text-white px-5 py-2 hover:bg-red-600 transition"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;