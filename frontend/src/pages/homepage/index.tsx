import { Card, CardContent } from "../../components/ui/card";
import { FaStar, FaBlog, FaUtensils, FaPizzaSlice, FaHamburger, FaIceCream } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { listRestaurant } from "../../services/restaurant";
import RestaurantCard from '../../components/ui/restaurant/RestaurantCard'

// Placeholder images for the hero section
const heroImages = [
  "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg", // Beautiful restaurant interior with warm lighting
  "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg", // Chef preparing food
  "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg", // Gourmet dish presentation
];

// Menu categories
const menuCategories = [
  { name: "All", icon: <FaUtensils className="text-3xl" /> },
  { name: "Burger", icon: <FaHamburger className="text-3xl" /> },
  { name: "Pizza", icon: <FaPizzaSlice className="text-3xl" /> },
  { name: "Desserts", icon: <FaIceCream className="text-3xl" /> },
];

// Customer reviews
const customerReviews = [
  {
    name: "John Doe",
    rating: 5,
    comment: "The food was absolutely delicious! The service was excellent and the atmosphere was perfect.",
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    name: "Jane Smith",
    rating: 4,
    comment: "Great place to eat! The portions are generous and the prices are reasonable.",
    image: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    name: "Mike Johnson",
    rating: 5,
    comment: "Best restaurant in town! I come here every week and I'm never disappointed.",
    image: "https://randomuser.me/api/portraits/men/3.jpg"
  }
];

const featuredRestaurants = [
  {
    id: 1027,
    name: "4 Corners - Detroit Style Pizza",
    image: "https://fmdadmin.foodmandu.com//Images/Vendor/1027/Logo/Untitled_design_-_2024-06-10T160909_100624102433.920.png",
    link: "/Restaurant/Details/1027",
  },
  {
    id: 269,
    name: "Fire And Ice Pizzeria - Thamel",
    image: "https://fmdadmin.foodmandu.com//Images/Vendor/269/Logo/web_240423103631_200624060757.listing-fire-and-ice.png",
    link: "/Restaurant/Details/269",
  },
  {
    id: 326,
    name: "The Workshop Eatery - Bakhundole",
    image: "https://fmdadmin.foodmandu.com//Images/Vendor/326/Logo/Untitled_design_-_2024-06-11T112136_110624053658.455.png",
    link: "/Restaurant/Details/326",
  },
  {
    id: 232,
    name: "Le Trio - Jhamsikhel",
    image: "https://fmdadmin.foodmandu.com//Images/Vendor/232/Logo/Untitled_design_-_2024-06-10T172330_100624113837.765.png",
    link: "/Restaurant/Details/232",
  },
  {
    id: 289,
    name: "Burger Shack - Jawalakhel",
    image: "https://fmdadmin.foodmandu.com//Images/Vendor/289/Logo/4_151222081130_150424053129._burger-shack-web-listing.jpg",
    link: "/Restaurant/Details/289",
  },
  {
    id: 978,
    name: "Koto Restaurant - Durbarmarg",
    image: "https://fmdadmin.foodmandu.com//Images/Vendor/978/Logo/Untitled_design_-_2024-06-10T152425_100624095135.059.png",
    link: "/Restaurant/Details/978",
  },
  {
    id: 846,
    name: "Kathmandu Marriott",
    image: "https://fmdadmin.foodmandu.com//Images/Vendor/846/Logo/8_151222081509._ktm-marritot-web.listing.jpg",
    link: "/Restaurant/Details/846",
  },
  {
    id: 844,
    name: "Burger Shack - Kamaladi",
    image: "https://fmdadmin.foodmandu.com//Images/Vendor/844/Logo/4_151222081130_150424053157._burger-shack-web-listing.jpg",
    link: "/Restaurant/Details/844",
  },
];

const blogPosts = [
  { title: "Top 5 Dishes to Try in 2024", author: "John Doe", snippet: "Discover the must-try dishes this year..." },
  { title: "Hidden Gems of the City", author: "Jane Smith", snippet: "Exploring lesser-known yet amazing restaurants..." },
  { title: "A Guide to Fine Dining", author: "Mark Brown", snippet: "Everything you need to know about fine dining..." },
];

const HomePage = () => {
  const navigate = useNavigate();

  const { data: restaurantList, isLoading, error } = useQuery({
    queryKey: ['restaurant-list'],
    queryFn: listRestaurant
  });

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  // Check if user is logged in
  const authToken = localStorage.getItem("token");
  const userData = localStorage.getItem("user"); // Assuming this contains user info
  const user = userData ? JSON.parse(userData) : null;

  // Auto-slide hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const carousel = document.getElementById("restaurant-carousel");
        if (carousel) {
          const maxScroll = carousel.scrollWidth - carousel.clientWidth;
          const newPosition = prev + 300; // Scroll by 300px
          return newPosition >= maxScroll ? 0 : newPosition; // Reset to start if end is reached
        }
        return prev;
      });
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Update scroll position
  useEffect(() => {
    const carousel = document.getElementById("restaurant-carousel");
    if (carousel) {
      carousel.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [scrollPosition]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentHeroIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                <h1 className="text-5xl font-bold mb-4">Delicious Food Delivered To Your Door</h1>
                <p className="text-xl mb-8">Order your favorite food from the best restaurants in town</p>
                <button 
                  onClick={() => navigate('/restaurant')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Categories */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Menu</h2>
          <div className="flex justify-center gap-8 mb-12">
            {menuCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                  activeCategory === category.name
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {category.icon}
                <span className="mt-2">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Restaurants */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error loading restaurants</div>
            ) : (
              restaurantList?.data?.result?.slice(0, 6).map((restaurant) => (
                <RestaurantCard
                  key={restaurant._id}
                  id={restaurant._id}
                  title={restaurant.name}
                  description={restaurant.description}
                  logo={restaurant.image || "/default-restaurant-image.png"}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Us</h2>
              <p className="text-gray-600 mb-4">
                We are dedicated to providing the best food delivery service in town. Our platform connects you with the finest restaurants and ensures your food arrives fresh and delicious.
              </p>
              <p className="text-gray-600">
                With our easy-to-use platform, you can order food from your favorite restaurants with just a few clicks. We guarantee fast delivery and excellent customer service.
              </p>
            </div>
            <div className="relative h-96">
              <img
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg"
                alt="About Us"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customerReviews.map((review, index) => (
              <Card key={index} className="p-6">
                <CardContent>
                  <div className="flex items-center mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-bold">{review.name}</h3>
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-bold mb-2">Location</h3>
              <p className="text-gray-600">123 Food Street, City</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-gray-600">+1 234 567 890</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-gray-600">info@snackrush.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;