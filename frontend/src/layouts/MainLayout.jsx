import { Outlet } from "react-router-dom"

import Navbar from "../components/Navbar/Navbar.jsx"

function MainLayout () {
    return (
        <>
            <Navbar />
            <main>
                {/* {Children} */}
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout