import React, { useState } from 'react'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Link } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/common/Table"
import Loading from '../../components/main/Loading'
import { Trash, TriangleAlert } from 'lucide-react'
import { deleteData } from '../../helpers/handleDelete'
import { showToast } from '../../helpers/showToast'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { RouteSignIn } from '../../helpers/RouteName'
import Alert from '../../components/common/Alert'

export default function CommentsByMe() {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [refreshData, setRefreshData] = useState(false);

    const user = useSelector((state) => state.user);

    const { data: commentData, loading, error } = useFetch(`${apiUrl}/blog/comments-by-me/${user?.user?._id}`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData]);

    const handleDelete = async (id) => {
        const response = await deleteData(`${apiUrl}/comment/delete/${id}`);
        if (response) {
            setRefreshData(!refreshData);
            showToast('Success', 'Comment Deleted Successfully');
        }
        else {
            showToast('Error', 'Error while deleting comment');
        }
    };

    if (loading) return <Loading />

    if (user && user.isLoggedIn) {

        return (
            <>
                <div className='w-full pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 font-roboto mt-5'>
                    <h1 className="font-roboto font-bold text-2xl text-darkRed mb-5 border-b-darkRed border-b-2 w-max ml-5 text-wrap">Comments by You</h1>
                    <Card className='mx-4 px-2 pt-2'>
                        <Table>
                            <TableHeader className="text-darkRed">
                                <TableRow className="bg-gray-50 text-nowrap text-darkRed text-[15px]">
                                    <TableHead className="text-darkRed text-[15px]">Blog</TableHead>
                                    <TableHead className="text-darkRed text-[15px]">Comment</TableHead>
                                    <TableHead className="text-darkRed text-[15px]">Date</TableHead>
                                    <TableHead className="text-darkRed text-[15px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {commentData && commentData?.comments.length > 0 ?

                                    commentData?.comments.map(c =>
                                        <>
                                            <TableRow key={c._id} className="text-nowrap">
                                                <TableCell>{c?.blogId?.title}</TableCell>
                                                <TableCell>{c?.comment}</TableCell>
                                                <TableCell>{moment(c?.createdAt).format('DD-MM-YYYY')}</TableCell>
                                                <TableCell className="flex gap-2 items-center">
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
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    )
                                    :
                                    <>
                                        <TableRow>
                                            <TableCell colSpan={4}>
                                                <div className='cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4'>
                                                    <TriangleAlert size={20} />
                                                    <p className='font-medium'>you haven't commented on any blog yet</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                }
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </>
        )
    } else {
        return (
            <p className='flex text-[18px] justify-center text-red-600 font-medium items-center gap-2 text-wrap'> <Link to={RouteSignIn} className='hover:border-b-2 border-red-600'>sign-in</Link>to see comments made by you</p>
        )
    }
}