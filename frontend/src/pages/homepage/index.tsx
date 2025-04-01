import { Card, CardContent } from "../../components/ui/card";
import { FaStar, FaBlog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { listRestaurant } from "../../services/restaurant";
import RestaurantCard from '../../components/ui/restaurant/RestaurantCard'

// Placeholder images for the hero section and restaurants
const heroImages = [
  "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
  "https://yimgf-thinkzon.yesform.com/docimgs/public/1/35/34960/34959569.jpg",
  "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2023/07/Online-Food-Delivery-Business-in-2022.webp",
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

// const restaurants = [
//   { name: "KKFC", rating: 4.8, reviews: 320, image: "https://foodmandu.com//Images/Vendor/587/OriginalSize/kkfc-website-listing-logo_121018045529.png" },
//   { name: "KFC", rating: 4.7, reviews: 280, image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/640px-KFC_logo-image.svg.png" },
//   { name: "BurgerHouse", rating: 4.6, reviews: 250, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/44/e8/e9/the-burger-house-and.jpg?w=800&h=-1&s=1" },
//   { name: "Chicken Station", rating: 4.5, reviews: 200, image: "https://images.foodmandu.com//Images/Vendor/508/OriginalSize/CHCKEN_STATION_200122063023_130624033522.APP_(1).jpg" },
// ];

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
    <div className="min-h-screen bg-gray-100">
   
   <div className="relative w-full h-[400px] overflow-hidden">
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
            </div>
          ))}
        </div>

     {/* Restaurant Section */}
<div className="p-6">
  {user==='admin'?<h2 className="text-xl font-semibold mb-4">Most Reviewed Restaurants</h2>:<h2 className="text-xl font-semibold mb-4">Most Reviewed Products</h2>}
  <div
    id="restaurant-carousel"
    className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
    style={{ scrollBehavior: "smooth" }}
  >
    {/* If data is loading, show a loader */}
    {isLoading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>Error loading restaurants</div>
    ) : (
      restaurantList?.data?.result?.map((restaurant, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden snap-center"
        >
          <RestaurantCard
            id={restaurant._id} // Assuming _id is the restaurant ID
            title={restaurant.name}
            description={restaurant.description}
            logo={restaurant.image || "/default-restaurant-image.png"}
          />
        </div>
      ))
    )}
  </div>
</div>


      {!user==='admin'?<div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Most Featured Restaurants</h2>
        <div
          id="restaurant-carousel"
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
        {featuredRestaurants.map((restaurant,index) => (
        <div
        key={index}
        className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden snap-center"
        >
              <div className="h-40 overflow-hidden">
                <a href={restaurant.link}>
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>
              <div className="p-4">
                <a href={restaurant.link}>
                  <h3 className="text-lg font-semibold hover:text-blue-500">{restaurant.name}</h3>
                </a>
              </div>
            </div>
          ))}
          </div>
          </div>:null}
      {/* Blog Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">People's Blogs</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Card key={index} className="p-4">
              <CardContent>
                <h3 className="text-lg font-bold flex items-center">
                  <FaBlog className="mr-2" /> {post.title}
                </h3>
                <p className="text-sm text-gray-600">By {post.author}</p>
                <p className="mt-2 text-gray-700">{post.snippet}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    
    </div>
  );
};

export default HomePage;