import './index.css'
import React from 'react'
import Layout from './layout/Layout'

import Index from './pages/Index.jsx'
import Profile from './pages/Profile.jsx'

import SignIn from './pages/Signin.jsx'
import SignUp from './pages/Signup.jsx'

import CategoryDetails from './pages/categories/CategoryDetails.jsx'
import AddCategories from './pages/categories/AddCategories.jsx'
import EditCategories from './pages/categories/EditCategories.jsx'

import AddBlog from './pages/blogs/AddBlog.jsx'
import EditBlog from './pages/blogs/EditBlog.jsx'
import BlogDeatils from './pages/blogs/BlogDetails.jsx'
import SingleBlogDetail from './pages/blogs/SingleBlogDetail.jsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RouteBlogDetails, RouteBlog, RouteBlogAdd, RouteBlogEdit, RouteIndex, RouteSignIn, RouteSignUp, RouteAddCate, RouteCateDetails, RouteEditCate, RouteBlogByCategory, RouteSearch, RouteGetComments, RouteGetAllUsers, RouteGetMyBlogs, RouteMyBlogsComments, RouteCommentsByMe, RouteProfileUser, RouteProfileAdmin, RouteNotFound } from './helpers/RouteName'
import BlogByCategory from './components/main/BlogByCategory.jsx'
import SearchResult from './components/main/SearchResult.jsx'
import GetComments from './pages/GetComments.jsx'
import GetAllUsers from './pages/GetAllUsers.jsx'
import GetMyBlogs from './pages/blogs/GetMyBlogs.jsx'
import MyBlogsComments from './pages/comments/MyBlogsComments.jsx'
import CommentsByMe from './pages/comments/CommentsByMe.jsx'
import ClientProtectionRoute from './components/main/ClientProtectionRoute.jsx'
import AdminProtectionRoute from './components/main/AdminProtectionRoute.jsx'
import PageNotFound from './pages/PageNotFound.jsx'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>

         
            <Route path={RouteIndex} element={<Index />} />
           
            <Route element={<ClientProtectionRoute />} >
              <Route path={RouteProfileUser} element={<Profile />} />
              <Route path={RouteGetMyBlogs} element={<GetMyBlogs />} />
              <Route path={RouteMyBlogsComments} element={<MyBlogsComments />} />
              <Route path={RouteCommentsByMe} element={<CommentsByMe />} />
              <Route path={RouteBlogAdd} element={<AddBlog />} />
              <Route path={RouteBlogEdit()} element={<EditBlog />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminProtectionRoute />} >
              <Route path={RouteProfileAdmin} element={<Profile />} />
              <Route path={RouteCateDetails} element={<CategoryDetails />} />
              <Route path={RouteAddCate} element={<AddCategories />} />
              <Route path={RouteEditCate()} element={<EditCategories />} />
              <Route path={RouteBlog} element={<BlogDeatils />} />
              <Route path={RouteGetComments} element={<GetComments />} />
              <Route path={RouteGetAllUsers} element={<GetAllUsers />} />
            </Route>

            {/* Public Routes */}
            <Route path={RouteBlogDetails()} element={<SingleBlogDetail />} />
            <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
            <Route path={RouteSearch()} element={<SearchResult />} />

          </Route>

          {/* Authentication Routes */}
          <Route path={RouteSignIn} element={<SignIn />} />
          <Route path={RouteSignUp} element={<SignUp />} />

          {/* 404 Not Found Page */}
          <Route path={RouteNotFound} element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}