import { Card, CardContent } from "../../components/ui/card";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">

{/* Blog Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">People's Blogs</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {/* {blogPosts.map((post, index) => (
            <Card key={index} className="p-4">
              <CardContent>
                <h3 className="text-lg font-bold flex items-center">
                  <FaBlog className="mr-2" /> {post.title}
                </h3>
                <p className="text-sm text-gray-600">By {post.author}</p>
                <p className="mt-2 text-gray-700">{post.snippet}</p>
              </CardContent>
            </Card>
          ))} */}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">Blog Posts</h2>
        <p>Coming soon...</p>
      </div>

    </div>
  );
};

export default BlogPage;
