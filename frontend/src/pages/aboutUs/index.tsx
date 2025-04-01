import { Card, CardContent } from "../../components/ui/card";
import Button from "../../components/ui/button";
import { FaUtensils, FaHeart, FaCheckCircle } from "react-icons/fa";

const AboutUs = () => {
  const isAuthenticated= localStorage.getItem('token')

  const handleLogout=()=>{
window.location.href="/login"
    localStorage.clear()
  }
  return (
    <div className="min-h-screen bg-gray-100">

      {/* About Section */}
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">About SnackRush</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Welcome to SnackRush, your ultimate restaurant management solution. Our mission is to
          connect food lovers with the best dining experiences, while providing restaurants with
          cutting-edge tools for seamless operations.
        </p>
      </div>

      {/* Features Section */}
      <div className="p-6 grid gap-6 md:grid-cols-3">
        <Card className="p-4 text-center">
          <CardContent>
            <FaUtensils className="text-4xl text-red-500 mx-auto mb-2" />
            <h3 className="text-lg font-bold">Diverse Cuisines</h3>
            <p className="text-gray-600">Explore a variety of dishes from the best restaurants in town.</p>
          </CardContent>
        </Card>

        <Card className="p-4 text-center">
          <CardContent>
            <FaHeart className="text-4xl text-red-500 mx-auto mb-2" />
            <h3 className="text-lg font-bold">Customer Satisfaction</h3>
            <p className="text-gray-600">Ensuring quality service and an enjoyable dining experience.</p>
          </CardContent>
        </Card>

        <Card className="p-4 text-center">
          <CardContent>
            <FaCheckCircle className="text-4xl text-red-500 mx-auto mb-2" />
            <h3 className="text-lg font-bold">Efficient Management</h3>
            <p className="text-gray-600">Helping restaurants streamline their business operations.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;