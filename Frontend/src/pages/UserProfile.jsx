// src/pages/UserProfile.jsx
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Loading from "../components/main/Loading";

export default function UserProfile() {
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [isModalOpen, setIsModalOpen] = useState(false);


  const { data, loading, error } = useFetch(
    `${apiUrl}/get-user/${id}`,
    {
      method: "GET",
      credentials: "include",
    },
    [id]
  );



  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error.message}</p>;

  const userData = data?.user;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 font-roboto">
      <div className="flex items-center gap-6">
        <img
          src={
            userData?.avatar ||
            `https://api.dicebear.com/5.x/initials/svg?seed=${userData?.name}`
          }
          alt="User Avatar"
          className="w-24 h-24 rounded-full"
          onClick={() => setIsModalOpen(true)}
        />
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            <img
              src={
                userData?.avatar ||
                `https://api.dicebear.com/5.x/initials/svg?seed=${userData?.name}`
              }
              alt="Full Avatar"
              className="max-w-full max-h-full rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
            />
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold">{userData?.name}</h1>
          <p className="text-gray-500">{userData?.email}</p>
        </div>

      </div>

      <div>
        <span className="text-md font-bold ms-28 mt-4">
          {userData?.blogs?.length || 0}
        </span> { }
        <span className="text-[12px]">Blogs</span>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6">Blogs by {userData?.name}</h2>

        {userData?.blogs?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userData.blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-all"
              >
                <img
                  src={blog.featureImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                  
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                  <p className="text-sm text-gray-600">
                    {blog.blogContent?.slice(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No blogs yet.</p>
        )}


      </div>

    </div>
  );
}
