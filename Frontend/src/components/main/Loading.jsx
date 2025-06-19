import React from 'react';
import loading from '../../assets/Loader.gif';

export default function Loading() {
  return (
    <>
    <div className='w-full h-full flex justify-center items-center'>
        <img className='w-20' src={loading} alt="loading..." />
    </div>
    </>
  )
}