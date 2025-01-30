import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useGetCurrentUserDetails } from "@hooks/user";
import { graphqlClient } from "@clients/api";
import { EditProfileMutation } from "@graphql/mutation/user";
import toast from "react-hot-toast";

const EditProfilePopup = ({
  setEditProfilePopup,
}: {
  setEditProfilePopup: Function;
}) => {
  const { user } = useGetCurrentUserDetails();
  const [username, setUsername] = useState(user?.userName || "");
  const [location, setLocation] = useState(user?.location || "");

  const handlEditProile = async () => {
    try {
      username.length < 4
        ? toast.error("Username should be\n atleast 4 characters long")
        : null;
      await graphqlClient.request(EditProfileMutation, {
        userName: username,
        location: location,
      });
      toast.success("Profile Updated");
      setEditProfilePopup(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-full flex justify-center p-5 sm:p-8 glass_bg absolute top-0 right-0 z-30 animate__animated animate__fadeIn">
      <div className="w-96 h-fit p-5 px-5 tracking-wide flex flex-col gap-2 bg-black border-gray-800 border-2 rounded-2xl relative">
        <MdCancel
          className="absolute right-3 top-3 hover:text-white cursor-pointer"
          onClick={() => setEditProfilePopup(false)}
        />
        <div className="font-bold text-2xl mb-4">Edit Profile</div>
        <div className="text-sm font-bold tracking-wider ">Username</div>
        <div className="w-full">
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-sky-500 w-full h-11 p-2 text-sm outline-none  bg-black border-[0.5px] border-gray-700 rounded-lg "
          />
        </div>
        <div className="text-sm font-bold tracking-wider ">Location</div>
        <div className="w-full">
          <input
            type="text"
            name="location"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-sky-500 w-full h-11 p-2 text-sm outline-none bg-black border-[0.5px] border-gray-700 rounded-lg "
          />
        </div>
        <div
          className="w-full flex justify-center p-2 px-4 my-2 text-sm font-bold text-white bg-sky-600 rounded-lg cursor-pointer"
          onClick={handlEditProile}
        >
          Change
        </div>
      </div>
    </div>
  );
};

export default EditProfilePopup;
