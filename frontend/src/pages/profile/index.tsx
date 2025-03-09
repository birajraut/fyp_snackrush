import { useEffect, useState } from "react";
import FooterSection from "../../components/footer";

const Profile = () => {
  const [user, setUser] = useState<{ username: string; email: string; profilePic?: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-semibold">SnackRush</h1>
        <div className="flex gap-6">
          <a href="/" className="text-gray-700 hover:text-black">Home</a>
          <a href="/aboutUs" className="text-gray-700 hover:text-black">About Us</a>
          <a href="/profile" className="text-gray-700 hover:text-black font-semibold">Profile</a>
          <a href="/restaurantPage" className="text-gray-700 hover:text-black">Product</a>
        </div>
      </nav>

      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-3xl font-bold mb-4">User Profile</h2>
        {user ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={user.profilePic || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h3 className="text-xl font-semibold text-center mt-4">{user.username}</h3>
            <p className="text-gray-700 text-center">{user.email}</p>
          </div>
        ) : (
          <p className="text-gray-700">No user data found. Please log in.</p>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default Profile;
