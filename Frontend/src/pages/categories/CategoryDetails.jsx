import React, { useState } from 'react'
import { Card, CardHeader } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RouteAddCate, RouteEditCate } from '../../helpers/RouteName'
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
import { TriangleAlert, Trash, FilePenLine } from 'lucide-react'
import { deleteData } from '../../helpers/handleDelete'
import { showToast } from '../../helpers/showToast'
import Alert from "../../components/common/Alert"

export default function CategoryDeatils() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [refreshData, setRefreshData] = useState(false);

    const { data: categoryData, loading, error } = useFetch(`${apiUrl}/category/show-all`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData]);

    const handleDelete = async (id) => {
        const response = await deleteData(`${apiUrl}/category/delete/${id}`);
        if (response) {
            setRefreshData(!refreshData);
            showToast('Success', 'Category Deleted Successfully');
        }
        else {
            showToast('Error', 'Error while deleting data');
        }
    };

    if (loading) return <Loading />

    return (
        <>
            <div className='w-full pl-5 pr-5 pb-5 sm:pl-20 sm:pr-20 font-roboto'>
                <Card className='border-none shadow-none'>
                    <CardHeader>
                        <Button className="bg-darkRed hover:bg-midRed rounded-lg w-[130px] sm:w-[200px]">
                            <Link to={RouteAddCate} className='font-roboto flex justify-center items-center gap-2'>
                                <ShoppingCart />
                                Add Category
                            </Link>
                        </Button>
                    </CardHeader>
                    <Card className="mx-4 px-2 pt-2">
                        <Table>
                            <TableHeader className="text-darkRed">
                                <TableRow className="bg-gray-50 text-nowrap">
                                    <TableHead className="text-darkRed text-[15px]">Category</TableHead>
                                    <TableHead className="text-darkRed text-[15px]">Slug</TableHead>
                                    <TableHead className="text-darkRed text-[15px]">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categoryData && categoryData.length > 0 ?

                                    categoryData.map(category =>
                                        <>
                                            <TableRow key={category._id} className="text-nowrap">
                                                <TableCell>{category.name}</TableCell>
                                                <TableCell>{category.slug}</TableCell>
                                                <TableCell className="flex gap-2 items-center">
                                                    <Button className="rounded-full px-2.5 bg-white border-none shadow-none hover:bg-darkRed text-darkRed hover:text-white">
                                                        <Link to={RouteEditCate(category._id)} >
                                                            <FilePenLine size={16} />
                                                        </Link>
                                                    </Button>
                                                    <Alert
                                                        title="Delete Category?"
                                                        description="This will permanently delete this category. This action cannot be undone."
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
                                            <TableCell colSpan={3} className='text-center'>
                                                <div className='cursor-not-allowed rounded-md p-2 shadow-md flex justify-center items-center text-red-600 gap-1 bg-gray-50 w-max mt-4'>
                                                    <TriangleAlert size={20} />
                                                    <p className='font-medium'>categories are not found</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                }
                            </TableBody>
                        </Table>
                    </Card>
                </Card>
            </div>
        </>
    )
}