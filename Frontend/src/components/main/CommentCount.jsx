import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import { FaRegComment} from "react-icons/fa6";

export default function CommentCount({props}) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const {data:count, loading, error} = useFetch(`${apiUrl}/blog/${props.blogId}/comments-count`, {
        method:'get',
        credentials:'include'
    });
    
    return (
        <>
        <div className='flex gap-4  font-roboto font-medium text-[21px]'>

            <div className='gap-1 flex items-center justify-center ml-5'>
                <FaRegComment className='w-5 h-5'/>
                <p>{count?.commentCount !== 0 ? count?.commentCount : 0}</p>
            </div>
            
        </div>
        </>
    )
}