import { FaUser, FaEnvelope, FaIdBadge } from "react-icons/fa";

export default function UserInfoCard({ user }) {
  const { username, email, _id } = user;

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Personal Information
      </h2>

      <div className="space-y-5">

        {/* Username */}
        <div className="flex items-center gap-4">
          <FaUser className="text-red-500 text-xl" />

          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-semibold text-gray-800">
              {username}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-red-500 text-xl" />

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-semibold text-gray-800">
              {email}
            </p>
          </div>
        </div>

        {/* User ID */}
        <div className="flex items-center gap-4">
          <FaIdBadge className="text-red-500 text-xl" />

          <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-semibold text-gray-800 break-all">
              {_id}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}