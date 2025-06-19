import React, { useState } from 'react'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/common/Table"
import Loading from '../components/main/Loading'
import { Trash, TriangleAlert } from 'lucide-react'
import { deleteData } from '../helpers/handleDelete'
import { showToast } from '../helpers/showToast'
import moment from 'moment'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Alert from "../components/common/Alert"

export default function GetAllUsers() {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [refreshData, setRefreshData] = useState(false);

    const { data: userData, loading, error } = useFetch(`${apiUrl}/get-all-users`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData]);

    const usersArray = userData?.allUsers || [];

    const users = [...usersArray].reverse();

    const handleDelete = async (id) => {
        const response = await deleteData(`${apiUrl}/user/delete/${id}`);
        if (response) {
            setRefreshData(!refreshData);
            showToast('Success', 'User Deleted Successfully');
        }
        else {
            showToast('Error', 'Error while deleting user');
        }
    };

    if (loading) return <Loading />

    return (
        <>
            <div className='w-full pl-5 pr-5 pb-5 sm:pl-10 sm:pr-10 font-roboto mt-5'>
                <h1 className="font-roboto font-bold text-2xl text-darkRed mb-5 border-b-darkRed border-b-2 w-max ml-5">All Users</h1>
                <Card className='mx-4 px-2 pt-2'>
                    <Table>
                        <TableHeader className="text-darkRed">
                            <TableRow className="bg-gray-50 text-nowrap text-darkRed text-[15px]">
                                <TableHead className="text-darkRed text-[15px]">Role</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Name</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Email</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Avatar</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Dated</TableHead>
                                <TableHead className="text-darkRed text-[15px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userData && userData?.allUsers.length > 0 ?

                                users.map(u =>
                                    <>
                                        <TableRow key={u?._id} className="text-nowrap">
                                            <TableCell>{u?.role}</TableCell>
                                            <TableCell>{u?.name}</TableCell>
                                            <TableCell>{u?.email}</TableCell>
                                            <TableCell>
                                                <Avatar>
                                                    <AvatarImage className='w-8 h-8 rounded-full' src={u?.avatar ? u.avatar : `https://api.dicebear.com/5.x/initials/svg?seed=${u?.name}%20`} />
                                                    <AvatarFallback>PP</AvatarFallback>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{u?.createdAt ? moment(u?.createdAt).format('DD-MM-YYYY') : '_'}</TableCell>
                                            <TableCell className="flex gap-2 items-center">
                                                <Alert
                                                    title="Delete Blog?"
                                                    description={`This will permanently delete user " ${u?.name} ". This action cannot be undone.`}
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
                                        <TableCell colSpan={6}>
                                            <div className='cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4'>
                                                <TriangleAlert size={20} />
                                                <p className='font-medium'>users are not found</p>
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
}