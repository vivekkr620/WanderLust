import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.jsx";

import HomePage from "../pages/HomePage.jsx";
import SearchResultPage from "../pages/SearchResultPage.jsx";
import ListingDetailsPage from "../pages/ListingDetailsPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import BecomeHostPage from "../pages/BecomeHostPage.jsx";

function AppRoutes() {
  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route path="/" element={<HomePage />} />

        <Route path="/search" element={<SearchResultPage />} />

        <Route path="/listings/:id" element={<ListingDetailsPage />} />
        
        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/become-host" element={<BecomeHostPage />} />

      </Route>

    </Routes>
  );
}

export default AppRoutes;