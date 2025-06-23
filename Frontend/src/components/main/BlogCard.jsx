import React from 'react';
import { Card, CardContent } from '../common/Card';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { CalendarArrowUp } from 'lucide-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '../../helpers/RouteName';
import LikeCount from './LikeCount';
import CommentCount from './CommentCount';

export default function BlogCard({ props: blog }) {
  if (!blog || !blog.category?.slug || !blog.slug) {
    return null;
  }

  const username = blog.author?.name || 'User';

  return (
    <Link to={RouteBlogDetails(blog.category.slug, blog.slug)}>
      <Card className="font-roboto w-full max-w-[850px] mx-auto p-4 sm:p-6 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer">
        <CardContent className="flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
          {/* Left Section */}
          <div className="flex flex-col gap-4 w-full md:w-[70%]">
            {/* Author */}
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  className="w-[40px] h-[40px] rounded-full"
                  src={
                    blog.author?.avatar ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(username)}`
                  }
                />
              </Avatar>
              <p className="text-sm font-medium">{username}</p>
            </div>

            {/* Title */}
            <p className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
              {blog.title}
            </p>

            {/* Date & Count */}
            <div className="gap-6 text-sm text-gray-600">
              <div className="flex items-center mb-5 gap-1">
                <CalendarArrowUp size={18} className="text-gray-600" />
                {moment(blog.createdAt).format('DD-MM-YYYY')}
              </div>
              <div className="flex items-center gap-3">
                <LikeCount props={{ blogId: blog._id }} />
                <CommentCount props={{ blogId: blog._id }} />
              </div>
            </div>
          </div>

          {/* Right Section (Image) */}
          <div className="w-full md:w-[30%]">
            <img
              src={blog.featureImage || '/fallback.jpg'}
              alt="Blog cover"
              className="w-full h-[120px] md:h-[100%] object-cover rounded-md"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
