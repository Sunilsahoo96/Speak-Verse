import AppSidebar from '../components/main/Sidebar'
import Navbar from '../components/main/Navbar'
import Footer from '../components/main/Footer'
import { SidebarProvider } from '../components/common/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>  
    <SidebarProvider>
        <Navbar/>
        <AppSidebar/>
        <main className='w-full'>
            <div className='w-full min-h-[calc(100vh-35px)] pt-[70px] flex justify-center items-center'>
                <Outlet/>
            </div>
            <Footer/>
        </main>
    </SidebarProvider>
    </>
  )
}