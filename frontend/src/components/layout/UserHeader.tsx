import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/button"
import { useSelector } from "react-redux"
import { IRootReducer } from "../../types/redux"
const UserHeader = () => {
    const navigate = useNavigate()
    const { accessToken, user } = useSelector((root: IRootReducer) => root.auth)


    const isAuthorized = !!accessToken
    const handleLogout = () => {
        localStorage.clear()
        window.location.href = "/";
    }
    return (
        <>
            <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
                <h1 className="text-2xl font-semibold">SnackRush</h1>
                <div className="flex gap-6">
                    <a href="/" className="text-gray-700 hover:text-black">Home</a>
                    <a href="/aboutUs" className="text-gray-700 hover:text-black">About Us</a>
                    <a href="/profile" className="text-gray-700 hover:text-black">Profile</a>
                    <a href="/restaurantPage" className="text-gray-700 hover:text-black">Product</a>
                </div>

                <div className="flex items-center gap-4">
                    {
                        isAuthorized ? <>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-700 font-medium">{user?.fullName}</span>
                                <img
                                    src={''}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full border border-gray-300"
                                />

                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}

                                className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Logout
                            </button>
                        </> : <>
                            <Button
                                onClick={() => navigate("/register")}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Sign Up
                            </Button>
                            <Button
                                onClick={() => navigate("/login")}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Log In
                            </Button></>
                    }

                </div>
            </nav>



        </>
    )
}

export default UserHeader