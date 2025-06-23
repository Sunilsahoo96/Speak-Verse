import React from 'react'

import { Button } from '../../components/common/Button'
import { Rss, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardHeader } from '../../components/common/Card'
import { RouteBlogAdd, RouteBlogDetails } from '../../helpers/RouteName'
import { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import Loading from '../../components/main/Loading'
import { Ban, Trash } from 'lucide-react'
import moment from 'moment'
import { deleteData } from '../../helpers/handleDelete'
import { showToast } from '../../helpers/showToast'
import { useSelector } from 'react-redux'
import Alert from '../../components/common/Alert'

export default function BlogDeatils() {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const user = useSelector((state) => state.user);

    const [refreshData, setRefreshData] = useState(false);

    const { data: blogData, loading, error } = useFetch(`${apiUrl}/blog/show-all`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData]);
    

    const handleDelete = (id) => {
        const response = deleteData(`${apiUrl}/blog/delete/${id}`);
        if (response) {
            setRefreshData(!refreshData);
            showToast('Success', 'Deleted Successfully');
        }
        else {
            showToast('Error', 'Error while deleting blog');
        }
    };

    if (loading) return <Loading />

    return (
        <>
            <div className='w-full pl-5 pr-5 pb-5 sm:pl-15 sm:pr-15 font-roboto'>
                <Card className='border-none shadow-none'>
                    <CardHeader>
                        {user?.user?.role === 'User'
                            ?
                            <>
                                <Button className="bg-darkRed hover:bg-midRed rounded-lg w-[130px] sm:w-[130px]">
                                    <Link to={RouteBlogAdd} className='font-roboto flex justify-center items-center gap-2'>
                                        <Rss />
                                        Add Blog
                                    </Link>
                                </Button>
                            </>
                            :
                            <>
                            </>
                        }
                    </CardHeader>
                    <Card className="mx-4 px-2 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
                            {blogData && blogData.blog.length > 0 ? (
                                blogData.blog.map(blog => (
                                    <div
                                        key={blog._id}
                                        className="bg-white border rounded-xl shadow-sm p-4 font-roboto flex flex-col justify-between"
                                    >
                                       
                                        {/* Blog Title */}
                                        <h2 className="text-lg font-semibold text-darkRed mb-2">{blog.title}</h2>

                                        {/* Author & Category */}
                                        <div className="mb-2">
                                            <p className="text-sm"><strong>Author:</strong> {blog?.author?.name}</p>
                                            <p className="text-sm"><strong>Category:</strong> {blog?.category?.name}</p>
                                        </div>



                                        {/* Date */}
                                        <p className="text-sm text-gray-600 mb-3">
                                            <strong>Dated:</strong> {moment(blog?.createdAt).format('DD-MM-YYYY')}
                                        </p>

                                        {/* Delete Button with Confirmation */}
                                        <div className="mt-auto">
                                            <Alert
                                                title="Delete Blog?"
                                                description={`This will permanently delete "${blog?.author?.name}'s" blog. This action cannot be undone.`}
                                                confirmText="Yes, Delete"
                                                onConfirm={() => handleDelete(blog._id)}
                                                trigger={
                                                    <Button className="w-full mt-2 text-sm bg-white border border-darkRed text-darkRed hover:bg-darkRed hover:text-white rounded-lg flex items-center justify-center gap-1">
                                                        <Trash size={16} />
                                                        Delete
                                                    </Button>
                                                }
                                            />
                                            <Link to={RouteBlogDetails(blog?.category?.slug, blog?.slug)}>
                                                <Button className="w-full mt-2 text-sm bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center gap-1">
                                                    <Eye size={16} />
                                                    View
                                                </Button>
                                            </Link>


                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-red-600 font-medium flex items-center justify-center gap-2">
                                    <Ban size={20} />
                                    No Blogs are Found
                                </div>
                            )}
                        </div>

                    </Card>
                </Card>
            </div>
        </>
    )
}