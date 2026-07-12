import { FaGlobe } from "react-icons/fa";
import { HiBars3 } from "react-icons/hi2";
import { FaRegUserCircle } from "react-icons/fa";

function NavActions() {
  return (
    <div className="flex items-center gap-5">
      <button className="font-medium hover:text-red-500 transition">
        Become a Host
      </button>

      <button className="text-xl hover:text-red-500 transition">
        <FaGlobe />
      </button>

      <button className="flex items-center gap-2 border rounded-full px-3 py-2 hover:shadow-md transition">
        <HiBars3 className="text-xl" />
        <FaRegUserCircle className="text-2xl" />
      </button>
    </div>
  );
}

export default NavActions;