import React from "react";
import { Button } from "../common/Button";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "../main/SearchBar";
import { RouteIndex, RouteBlogAdd, RouteProfileAdmin, RouteProfileUser, RouteSignIn } from "../../helpers/RouteName";
import { useSelector } from "react-redux";
import { UserRound, LogOut, CircleFadingPlus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../common/DropdownMenu"
import { Avatar, AvatarImage, AvatarFallback } from "../common/Avtar"
import { showToast } from "../../helpers/showToast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slice";
import logo from '../../assets/Logo.png';
import { PanelsTopLeft } from "lucide-react";
import { useSidebar } from "../common/Sidebar";
import Alert from "../common/Alert";

export default function Navbar() {

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const { toggleSidebar } = useSidebar();

    const handleLogout = async () => {
        try {
            const response = await fetch(`${apiUrl}/logout`, {
                method: "get",
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) {
                showToast('Error', data.message || 'Logout Failed.');
                return;
            }
            dispatch(removeUser());
            showToast('Success', data.message || "Logout Successfully.");
            navigate(RouteIndex);
        } catch (error) {
            showToast('Error', error.message || "Internal Server Error.");
            return;
        }
    };

    return (
        <>
            <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b">
                {/* logo */}
                <div className="flex justify-center items-center gap-2">
                    <PanelsTopLeft onClick={toggleSidebar} size={24} className="text-darkRed cursor-pointer md:hidden block" />
                    <Link to={RouteIndex} className="flex items-center gap-3 font-roboto font-bold text-2xl text-darkRed">
                        <div className="border-l-4 border-gray-200 pl-2 md:pl-0 md:border-none">
                            <img src={logo} className='w-12 h-8' />
                        </div>
                        <p className="w-0 md:w-full md:block bg-gradient-to-r from-darkRed to-midRed text-transparent bg-clip-text">SpeakVerse</p>
                    </Link>
                </div>
                {/* search input */}
                <div className="w-[200px] sm:w-[400px] md:w-[550px] lg:w-[650px] xl:w-[750px]">
                    <SearchBar />
                </div>

                {/* sign in button */}
                <div className="flex items-center">
                    {!user.isLoggedIn ?

                        <Button
                            asChild
                            className="bg-[#D7263D] text-white font-roboto rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_12px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-in-out"
                        >
                            <Link to={RouteSignIn} className="flex items-center gap-2">
                                <LogIn className="text-white" />
                                Sign In
                            </Link>
                        </Button>

                        :
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={user?.user?.avatar ? user?.user?.avatar : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.user?.name}%20`} />
                                    <AvatarFallback>SV</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    <p className="font-roboto font-medium">{user.user.name}</p>
                                    <p className="font-roboto text-sm font-medium">{user.user.email}</p>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    {user && user?.user?.role === 'User'
                                        ?
                                        <Link to={RouteProfileUser} className="font-roboto cursor-pointer">
                                            <UserRound size={32} className="text-darkRed" />
                                            Profile
                                        </Link>
                                        :
                                        <Link to={RouteProfileAdmin} className="font-roboto cursor-pointer">
                                            <UserRound size={32} className="text-darkRed" />
                                            Profile
                                        </Link>
                                    }
                                </DropdownMenuItem>
                                {user && user.user.role === 'User'
                                    ?
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link to={RouteBlogAdd} className="font-roboto cursor-pointer">
                                                <CircleFadingPlus size={32} className="text-darkRed" />
                                                Create Blog
                                            </Link>
                                        </DropdownMenuItem>
                                    </>
                                    :
                                    <>
                                    </>
                                }
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Alert
                                        title="Confirm Logout"
                                        description="Are you sure you want to logout? You’ll need to log in again to continue."
                                        confirmText="Yes, Logout"
                                        onConfirm={handleLogout}
                                        trigger={
                                            <div className="font-roboto cursor-pointer flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded">
                                                <LogOut size={20} className="text-darkRed" />
                                                Logout
                                            </div>
                                        }
                                    />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </div>
            </div>
        </>
    );
}