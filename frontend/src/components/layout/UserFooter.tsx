import React from 'react'

const UserFooter = () => {
    return (
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between">
          {/* Brand & About */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">SnackRush</h2>
            <p className="text-gray-400 mt-2">Your favorite food, delivered fast and fresh.</p>
          </div>
  
          {/* Quick Links */}
          <div className="flex flex-col mb-6 md:mb-0">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/aboutUs" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/profile" className="text-gray-400 hover:text-white">Profile</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
  
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} SnackRush. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default UserFooter;
  