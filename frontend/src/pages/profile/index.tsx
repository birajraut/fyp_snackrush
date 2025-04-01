import { useSelector } from "react-redux";
import userPlaceholder from "../../assets/userPlaceholder.png"

const Profile = () => {
const auth= useSelector(state=>state?.auth )
const user= auth?.user
// console.log(user,'user detail in redux')

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-3xl font-bold mb-4">User Profile</h2>
        {user ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Display Profile Image */}
            <img
              src={user.image || userPlaceholder} // Display the user's image if available
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
            {/* User Full Name */}
            <h3 className="text-xl font-semibold text-center mt-4">{user.fullName}</h3>
            {/* User Email */}
            <p className="text-gray-700 text-center">{user.email}</p>
            {/* User Address */}
            <div className="mt-4">
              <strong>Address:</strong>
              <p className="text-gray-700">{user.address || "No address provided"}</p>
            </div>
            {/* User Contact Number */}
            <div className="mt-4">
              <strong>Contact Number:</strong>
              <p className="text-gray-700">{user.contactNumber || "No contact number provided"}</p>
            </div>
            {/* Google User Check */}
            {user.isGoogleUser && (
              <div className="mt-4">
                <strong>Google User:</strong>
                <p className="text-green-500">This account was created using Google</p>
              </div>
            )}
            {/* Email Verification Status
            <div className="mt-4">
              <strong>Email Verified:</strong>
              <p className={`text-${user.isVerified ? "green" : "red"}-500`}>
                {user.isVerified ? "Verified" : "Not Verified"}
              </p>
            </div> */}
          </div>
        ) : (
          <p className="text-gray-700 text-center">No user data found. Please log in.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
