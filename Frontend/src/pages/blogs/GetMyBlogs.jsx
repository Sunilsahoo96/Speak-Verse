import React from 'react'
import { Button } from '../../components/common/Button'
import { Rss } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader } from '../../components/common/Card'
import { RouteBlogAdd, RouteBlogDetails, RouteBlogEdit, RouteSignIn } from '../../helpers/RouteName'
import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import Loading from '../../components/main/Loading'
import { TriangleAlert, Trash, Eye, FilePenLine } from 'lucide-react'
import moment from 'moment'
import { deleteData } from '../../helpers/handleDelete'
import { showToast } from '../../helpers/showToast'
import { useSelector } from 'react-redux'
import Alert from "../../components/common/Alert"

export default function GetMyBlogs() {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const user = useSelector((state) => state.user);

    const [refreshData, setRefreshData] = useState(false);

    const { data: blogData, loading, error } = useFetch(`${apiUrl}/blog/get-my-blogs/${user?.user?._id}`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData]);

    const handleDelete = async (id) => {
        const response = await deleteData(`${apiUrl}/blog/delete/${id}`);
        if (response) {
            showToast('Success', 'Deleted Successfully');
            setRefreshData(!refreshData);
        } else {
            showToast('Error', 'Error while deleting blog');
        }
    };


    if (loading) return <Loading />

    if (user && user.isLoggedIn) {

        return (
            <>
                <div className='w-full pl-5 pr-5 pb-5 sm:pl-15 sm:pr-15 font-roboto'>

                    <CardHeader>
                        <Button className="bg-darkRed hover:bg-midRed rounded-lg w-[130px] sm:w-[130px]">
                            <Link to={RouteBlogAdd} className='font-roboto flex justify-center items-center gap-2'>
                                <Rss />
                                Add Blog
                            </Link>
                        </Button>
                    </CardHeader>

                    <Card className="mx-4 px-2 pt-2">
                        {blogData && blogData.blog.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                                {blogData.blog.map((blog) => (
                                    <div key={blog._id} className="bg-white shadow-md rounded-lg overflow-hidden font-roboto">
                                        {/* Blog Image */}
                                        <img
                                            src={blog.featureImage}
                                            alt={blog.title}
                                            className="w-full h-48 object-cover"
                                        />

                                        {/* Blog Content */}
                                        <div className="p-4">
                                            <h2 className="text-xl font-bold mb-1">{blog.title}</h2>
                                            <p className="text-sm text-gray-600">Date: {moment(blog.createdAt).format("DD-MM-YYYY")}</p>

                                            {/* Actions */}
                                            <div className="flex gap-2 mt-4">
                                                <Button className="rounded-full px-2.5 bg-white border border-darkRed text-darkRed hover:bg-darkRed hover:text-white">
                                                    <Link to={RouteBlogDetails(blog?.category?.slug, blog?.slug)}>
                                                        <Eye size={16} />
                                                    </Link>
                                                </Button>
                                                <Button className="rounded-full px-2.5 bg-white border border-darkRed text-darkRed hover:bg-darkRed hover:text-white">
                                                    <Link to={RouteBlogEdit(blog._id)}>
                                                        <FilePenLine size={16} />
                                                    </Link>
                                                </Button>
                                                <Alert
                                                    title="Delete Blog?"
                                                    description="This will permanently delete your blog. This action cannot be undone."
                                                    confirmText="Yes, Delete"
                                                    onConfirm={() => handleDelete(blog._id)}
                                                    trigger={
                                                        <Button className="rounded-full px-2.5 bg-white border border-darkRed text-darkRed hover:bg-darkRed hover:text-white">
                                                            <Trash size={16} />
                                                        </Button>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex justify-center items-center p-8">
                                <div className="cursor-not-allowed rounded-md p-2 shadow-md flex items-center text-red-600 gap-1 bg-gray-50 w-max">
                                    <TriangleAlert size={20} />
                                    <p className="font-medium">You haven't created any blog yet</p>
                                </div>
                            </div>
                        )}
                    </Card>



                </div>
            </>
        )

    } else {
        return (
            <p className='flex text-[18px] justify-center text-red-600 font-medium items-center gap-2'> <Link to={RouteSignIn} className='hover:border-b-2 border-red-600'>sign-in</Link>to see your blogs</p>
        )
    }

}