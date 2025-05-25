const Blog = require("../models/Blog");

const blogCreateService = async (data) => {
    const blog = await Blog.create(data);
    return blog;
}
const blogUpdateService = async (id, data) => {
    const blog = await Blog.findByIdAndUpdate(id, data, { new: true });
    if (!blog) {
        throw new Error("Blog not found");
    }
    return blog;
}
const blogDetailsService = async (id) => {
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new Error("Blog not found");
    }
    return blog;
}
const mongoose = require('mongoose');

const blogListService = async (status) => {
    const query = status ? { isPublished: status === "PUBLISHED" } : {};
    
    console.log("query", query);

    const blogs = await Blog.find(query);
    return blogs;
}
module.exports = { blogDetailsService, blogListService,blogCreateService, blogUpdateService };
