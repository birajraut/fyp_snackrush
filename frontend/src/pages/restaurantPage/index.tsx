import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import Button from "../../components/ui/button";
import { motion } from "framer-motion";
import axios from "axios";

const restaurants = [
  { name: "KKFC", rating: 4.8, reviews: 320, image: "https://foodmandu.com//Images/Vendor/587/OriginalSize/kkfc-website-listing-logo_121018045529.png" },
  { name: "KFC", rating: 4.7, reviews: 280, image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/57/KFC_logo-image.svg/640px-KFC_logo-image.svg.png" },
  { name: "BurgerHouse", rating: 4.6, reviews: 250, image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/44/e8/e9/the-burger-house-and.jpg?w=800&h=-1&s=1" },
  { name: "Chicken Station", rating: 4.5, reviews: 200, image: "https://images.foodmandu.com//Images/Vendor/508/OriginalSize/CHCKEN_STATION_200122063023_130624033522.APP_(1).jpg" },
];

const RestaurantPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    description: "",
    imageFile: null as File | null,  // Store the uploaded image
  });

  // Handle modal visibility
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRestaurant({ ...newRestaurant, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewRestaurant({ ...newRestaurant, imageFile: file });
    }
  };

  // Submit form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newRestaurant.imageFile) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newRestaurant.name);
    formData.append("description", newRestaurant.description);
    formData.append("image", newRestaurant.imageFile); // Append image file

    try {
      const response = await axios.post("http://localhost:8000/api/restaurants", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Restaurant added:", response.data);
      closeModal(); // Close modal on success
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Featured Restaurants</h1>
      
      <Button onClick={openModal} variant="default" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Create Restaurant
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }} className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <Card>
              <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{restaurant.description}</p>
                <Button variant="default" className="w-full">View Details</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal for creating a new restaurant */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Add New Restaurant</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">Restaurant Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newRestaurant.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={newRestaurant.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium mb-2">Upload Image</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="default">Add Restaurant</Button>
                <Button type="button" variant="outline" className="ml-4" onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
