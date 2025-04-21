import { Card, CardContent } from "../../components/ui/card";
import { FaCalendarAlt, FaUser, FaComment } from 'react-icons/fa';

const BlogPage = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Food Presentation",
      author: "Chef John",
      date: "March 15, 2024",
      comments: 12,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      excerpt: "Learn the secrets of professional food presentation and how it enhances the dining experience."
    },
    {
      id: 2,
      title: "Sustainable Restaurant Practices",
      author: "Sarah Green",
      date: "March 10, 2024",
      comments: 8,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      excerpt: "Discover how restaurants are implementing eco-friendly practices to reduce their environmental impact."
    },
    {
      id: 3,
      title: "The Rise of Plant-Based Cuisine",
      author: "Michael Vegan",
      date: "March 5, 2024",
      comments: 15,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      excerpt: "Exploring the growing trend of plant-based dining and its impact on the restaurant industry."
    },
    {
      id: 4,
      title: "Culinary Trends 2024",
      author: "Food Critic",
      date: "March 1, 2024",
      comments: 20,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      excerpt: "A comprehensive look at the emerging food trends that are shaping the culinary world this year."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl">Discover the latest in food, dining, and culinary trends</p>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Featured Post" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center text-gray-500 mb-4">
                <FaCalendarAlt className="mr-2" />
                <span>March 20, 2024</span>
                <FaUser className="ml-4 mr-2" />
                <span>Admin</span>
                <FaComment className="ml-4 mr-2" />
                <span>25 Comments</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">The Future of Dining Experience</h2>
              <p className="text-gray-600 mb-6">
                Explore how technology and innovation are transforming the way we dine and experience food.
                From virtual reality menus to AI-powered recommendations, the future of dining is here.
              </p>
              <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
                Read More
              </button>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <FaCalendarAlt className="mr-2" />
                  <span>{post.date}</span>
                  <FaUser className="ml-4 mr-2" />
                  <span>{post.author}</span>
                  <FaComment className="ml-4 mr-2" />
                  <span>{post.comments}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="text-red-600 hover:text-red-700 font-semibold">
                  Read More →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;


