import React from 'react'
import { useFetch } from '../../hooks/useFetch'
import Loading from './Loading'
import moment from 'moment'
import { useSelector } from 'react-redux'

export default function CommentList({props}) {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const user = useSelector((state) => state.user);

    const {data:commentData, loading, error} = useFetch(`${apiUrl}/blog/${props.bId}/comments`, {
        method:'get',
        credentials:'include',
    });

    if(loading) return <Loading/>

    return (
        <div className='h-52 overflow-scroll'>
            <>
                { commentData && commentData.comments.length > 0
                ?
                <>
                {commentData.comments.map(c => 
                <div key={c._id} className='font-roboto flex flex-col mb-4'>
                    <div className='flex  items-center gap-3'>
                        <img className='w-8 h-8 rounded-full' src={c?.author?.avatar ? c.author.avatar : `https://api.dicebear.com/5.x/initials/svg?seed=${c.author?.name}%20`}/>
                        <p className='font-semibold text-[16px]'>{c?.author?.name ? c.author.name : blogbrew-user}</p>
                    </div>
                    <div className='ml-12 flex flex-wrap gap-2 mt-[-3px] text-gray-700'>
                        <p className='w-max text-[13px] font-medium'>{c.comment}</p>
                    </div>
                    <p className='ml-12 mt-1 text-gray-400 text-[12px]'>{moment(c?.createdAt).format('DD-MM-YYYY')}</p>
                </div>
                )}
                </>
                :
                <>
                <p className='mb-1 font-roboto text-gray-500'>No comments yet...</p>
                </>
                }
            </>
            {props?.nC &&
            <div className='font-roboto flex flex-col mb-4'>
                <div className='flex  items-center gap-3'>
                    <img className='w-8 h-8 rounded-full' src={user?.user?.avatar ? user?.user?.avatar : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.user?.name}%20`}/>
                    <p className='font-medium'>{user?.user?.name ? user?.user?.name : "speakverse-user"}</p>
                </div>
                <div className='ml-12 flex flex-wrap gap-2'>
                    <p className='w-max  px-2 py-1 rounded-md bg-indigo-200 border-2 border-midRed'>{props?.nC?.comment}</p>
                </div>
                <p className='ml-12 mt-1 text-gray-400'>{moment(props?.nC?.createdAt).format('DD-MM-YYYY')}</p>
            </div>
            }
        </div>
    )
}