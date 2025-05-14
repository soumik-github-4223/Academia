import React, { FC, useState } from "react";
import avatarDefault from "../../../public/assets/avatar.png";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";

type Props = {
  avatar: string | null;
  user: { name: string; email: string };
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [previewAvatar, setPreviewAvatar] = useState(avatar);
  const [updateAvatar] = useUpdateAvatarMutation();
  const [editProfile, { isLoading, isSuccess, error }] =
    useEditProfileMutation();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Avatar = reader.result as string;
        setPreviewAvatar(base64Avatar); // Update the preview

        try {
          await updateAvatar({ avatar: base64Avatar }).unwrap();
          // console.log("Avatar updated successfully");
          toast.success("Avatar updated successfully!");
        } catch (error: any) {
          // console.error("Error updating avatar:", error);
          // alert(error?.data?.message || "Failed to update avatar");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUpdateName = async () => {
    try {
      const response = await editProfile({ name }).unwrap();
      //   console.log("Name updated successfully:", response);
      //   alert("Name updated successfully!");
      toast.success("Name updated successfully!");
    } catch (error: any) {
      //   console.error("Error updating name:", error);
      //   alert(error?.data?.message || "Failed to update name");
      toast.error(error?.data?.message || "Failed to update name");
    }
  };

  return (
    <div className="w-full h-full bg-gray-800 rounded-lg shadow-md p-6">
      {/* Avatar Section */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
          <Image
            src={previewAvatar || avatarDefault}
            alt="User Avatar"
            className="w-full h-full object-cover"
            width={128}
            height={128}
          />
        </div>
        {/* <label
          htmlFor="avatarInput"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition cursor-pointer text-sm"
        >
          Change Avatar
        </label> */}
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>

      {/* Profile Details Section */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-white">
          Profile Details
        </h3>
        <div className="mt-4 space-y-4">
          {/* Name Field */}
          <div className="flex flex-col">
            <label
              htmlFor="nameInput"
              className="text-gray-300 font-medium"
            >
              Name
            </label>
            <input
              id="nameInput"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            />
          </div>

          {/* Update Name Button */}
          <button
            onClick={handleUpdateName}
            disabled={isLoading}
            className={`mt-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>

          {/* Email Field */}
          <div className="flex flex-col mt-4">
            <label
              htmlFor="emailInput"
              className="text-gray-300 font-medium"
            >
              Email
            </label>
            <input
              id="emailInput"
              type="text"
              value={email}
              disabled
              className="mt-1 px-4 py-2 border rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
