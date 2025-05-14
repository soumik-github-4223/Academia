import React, { useState } from "react";
import toast from "react-hot-toast";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";

type Props = {
  user: { email: string; provider: string }; // Assuming `provider` indicates social auth or email login
};

const ChangePassword: React.FC<Props> = ({ user }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleUpdatePassword = async () => {
    // Check if the user is logged in via social auth
    if (user.provider !== "email") {
      toast.error("Password modification is not possible for social auth users.");
      return;
    }

    // Validate input fields
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      // Call the API to update the password
      const response = await updatePassword({
        oldPassword,
        newPassword,
      }).unwrap();

      toast.success("Password updated successfully!");
      console.log("Password update response:", response);
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast.error(error?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div className="w-full h-full bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium  text-white mb-4">
        Change Password
      </h2>
      <div className="space-y-4">
        {/* Old Password */}
        <div className="flex flex-col">
          <label
            htmlFor="oldPassword"
            className="text-gray-300 font-medium"
          >
            Old Password
          </label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>

        {/* New Password */}
        <div className="flex flex-col">
          <label
            htmlFor="newPassword"
            className="text-gray-300 font-medium"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="text-gray-300 font-medium"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdatePassword}
          disabled={isLoading}
          className={`mt-4 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;