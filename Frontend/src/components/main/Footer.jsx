import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
    <div className='text-[13px] md:text-[14px] w-full flex justify-center font-roboto text-gray-700 mb-4'> © 2025  <span className='text-darkRed'>SpeakVerse</span> — Crafted with ❤️ by <Link to={'https://github.com/Sunilsahoo96/'} className='pl-1 font-semibold text-darkRed'> Sunil Sahoo</Link>. </div>
    </>
  )
}