import { FaCompass } from "react-icons/fa";
import { Link } from "react-router-dom";

function Logo({ title }) {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 cursor-pointer"
    >
      <FaCompass className="text-3xl text-red-500" />
      <h2 className="text-2xl font-bold text-red-500">
        {title}
      </h2>

    </Link>
  );
}

export default Logo;
