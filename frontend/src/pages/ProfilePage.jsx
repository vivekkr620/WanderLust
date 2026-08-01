import { useEffect, useState } from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import UserInfoCard from "../components/Profile/UserInfoCard";
import EditProfileModal from "../components/Profile/EditProfileModal";

import api from "../services/api";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
      } catch (error) {
        console.log(error);

        setError(error.response?.data?.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl font-semibold">Loading Profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  // console.log("OpenModal = ", openModal);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="max-w-6xl mx-auto py-10">
        <ProfileHeader user={user} setOpenModal={setOpenModal} setFormData={setFormData} />
        <UserInfoCard user={user} />

        <EditProfileModal
          formData={formData}
          setFormData={setFormData}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setUser={setUser}
        />
      </div>
    </div>
  );
}
