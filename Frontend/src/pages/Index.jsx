import React from "react";
import BlogCard from "../components/main/BlogCard";
import { useFetch } from "../hooks/useFetch";
import Loading from "../components/main/Loading";

export default function Index() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${apiUrl}/blog/show-all`, {
    method: "get",
    credentials: "include",
  });

  // if (loading) return <Loading />;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* Header Section */}
      {/* <div className="w-full px-6 sm:px-20 font-roboto flex flex-col justify-center items-center gap-6 mt-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] leading-snug">
          Welcome to <span className="text-[#ff4d6d]">SpeakVerse</span>
          <br />
          <span className="text-xl sm:text-2xl font-medium text-[#475569]">
            Fresh Stories. Bold Voices. Daily.
          </span>
        </h1>
        <p className="bg-[#e0f2fe] text-darkRed border border-[#bae6fd] py-2 px-4 rounded-lg text-sm sm:text-base font-medium shadow">
          “Where every voice tells a story. Welcome to SpeakVerse.”
        </p>
        <p className="text-[#334155] text-base sm:text-lg max-w-3xl leading-relaxed">
          Dive into <span className="font-semibold text-[#ff4d6d]">SpeakVerse</span> — a space where every voice matters, stories breathe, and expression thrives. From soul-stirring journeys to hot takes, SpeakVerse lets you read, write, and resonate with the real. Discover untold perspectives, or share your own verse. This is where your story begins.
        </p>
      </div> */}

      {/* Blog List Section */}
      <div className="w-full px-6 sm:px-20 py-10 font-roboto flex flex-wrap justify-center items-start gap-7">
        {blogData && blogData.blog.length > 0 ? (
          blogData.blog.map((blog) =>
            blog && blog.category && blog.slug ? (
              <BlogCard key={blog._id} props={blog} />
            ) : null
          )
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
}
