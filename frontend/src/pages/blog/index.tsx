import FooterSection from "../../components/footer";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-semibold">SnackRush</h1>
        <div className="flex gap-6">
          <a href="/">Home</a>
          <a href="/blogPage" className="font-semibold">Blog</a>
        </div>
      </nav>

      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">Blog Posts</h2>
        <p>Coming soon...</p>
      </div>

      <FooterSection />
    </div>
  );
};

export default BlogPage;
