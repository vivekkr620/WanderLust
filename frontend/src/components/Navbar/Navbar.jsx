import Logo from "./Logo"
import SearchBar from "./SearchBar";
import NavActions from "./NavActions";

function Navbar () {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
            <Logo title="WanderLust"/>
            <SearchBar />
            <NavActions />
        </nav>
    )
} 

export default Navbar;