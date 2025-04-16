import { useSelector } from "react-redux";
import userPlaceholder from "../../assets/userPlaceholder.png";
import { useRef, useState } from "react";
import axios from "axios";
import { LuFilePen } from "react-icons/lu";
import { updateRestaurantImage } from "../../services/restaurant";

const Profile = () => {
  const auth = useSelector((state) => state?.auth);
  const user = auth?.user?.user;
  const restaurant = auth.restaurant;


  console.log(restaurant,'restaurant')
  const [imageUrl, setImageUrl] = useState(restaurant.image||user?.image||userPlaceholder);
  const inputFileRef = useRef();

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Triggers a click event on the hidden file input element to allow the user to select a new image.
 */

/*******  2bca3734-9040-4e8c-8d81-119ee17fc6d0  *******/
  const handleEditClick = () => {
    inputFileRef.current.click(); // Trigger hidden file input
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = auth?.accessToken; // Assuming token is stored in Redux
      const restaurantId = restaurant?._id;

      const response = await updateRestaurantImage(restaurantId, file);

console.log(response,'image response')
      const newImage = response?.data?.result?.image;
      if (newImage) {
        setImageUrl(newImage); // Update UI instantly
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-3xl font-bold mb-4">User Profile</h2>
        {user ? (
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            {/* Image Container */}
            <div className="relative w-24 h-24 mx-auto group">
              <img
                src={imageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />

              {/* Edit Button */}
              <button
                onClick={handleEditClick}
                className="absolute bottom-0 right-0 bg-black text-white text-xs p-1 rounded-full opacity-75 group-hover:opacity-100"
                title="Edit Image"
              >
               <LuFilePen/>
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputFileRef}
                className="hidden"
              />
            </div>

            {/* User Info */}
            <h3 className="text-xl font-semibold text-center mt-4">{user.fullName}</h3>
            <p className="text-gray-700 text-center">{user.email}</p>

            {user.address && (
              <div className="mt-4">
                <strong>Address:</strong>
                <p className="text-gray-700">{user.address}</p>
              </div>
            )}
            {user.contactNumber && (
              <div className="mt-4">
                <strong>Contact Number:</strong>
                <p className="text-gray-700">{user.contactNumber}</p>
              </div>
            )}
            {user.isGoogleUser && (
              <div className="mt-4">
                <strong>Google User:</strong>
                <p className="text-green-500">This account was created using Google</p>
              </div>
            )}

            {restaurant && (
              <div className="mt-6 border-t pt-4">
                <h4 className="text-lg font-semibold mb-2">Restaurant Details</h4>
                {restaurant.name && (
                  <p>
                    <strong>Name:</strong> {restaurant.name}
                  </p>
                )}
                {restaurant.address && (
                  <p>
                    <strong>Address:</strong> {restaurant.address}
                  </p>
                )}
                {restaurant.contact && (
                  <p>
                    <strong>Contact:</strong> {restaurant.contact}
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-700 text-center">No user data found. Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
