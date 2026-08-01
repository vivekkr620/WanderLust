import { FaUserCircle } from "react-icons/fa";

export default function ProfileHeader({ user, setOpenModal, setFormData }) {
  const { username, email } = user;

  const handleEdit = () => {
  setFormData({
    username: user.username,
    email: user.email,
  });

  setOpenModal(true);
};


  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Section */}
        <div className="flex items-center gap-5">
          <FaUserCircle className="text-8xl text-gray-500" />

          <div>
            <h1 className="text-3xl font-bold text-gray-800">{username}</h1>

            <p className="text-gray-500 mt-1">{email}</p>
          </div>
        </div>

        {/* Right Section */}
        <button
          onClick={handleEdit}
          className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition duration-300"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
