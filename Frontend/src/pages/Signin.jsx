import React from 'react'
import { Input } from '../components/common/Input'
import { Button } from '../components/common/Button'
import { FormControl, FormField, FormItem, FormMessage, Form, FormLabel } from '../components/common/Form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LogIn } from 'lucide-react'
import { Card } from '../components/common/Card'
import { Link } from 'react-router-dom'
import { RouteIndex, RouteSignUp } from '../helpers/RouteName'
import { showToast } from '../helpers/showToast'
import { useNavigate } from 'react-router-dom'
import GoogleAuth from '../components/main/GoogleAuth'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slice'
import logo from '../assets/Logo.png'

export default function SignIn() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8, 'Password must be atleast 8 characters long.'),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    async function onSubmit(values) {
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            });
            const data = await response.json();
            if (!response.ok) {
                showToast('Error', data.message || 'Login Failed.');
                return;
            }
            dispatch(setUser(data.user));
            showToast('Success', "Logged in Successfully.");
            navigate(RouteIndex);
        } catch (error) {
            showToast('Error', error.message || 'Something Went Wrong.');
        }
    };

    return (
        <>
            <div className='bg-white flex justify-center items-center w-screen h-screen font-roboto'>
                <Card className="w-[340px] md:w-[450px] p-6 pt-8 pb-8 ">
                    <div className='w-full flex flex-col gap-2 justify-center items-center mb-6'>
                        <Link to={RouteIndex} className='font-roboto font-bold text-2xl flex justify-center items-center gap-3 mb-1'>
                            <img src={logo} className='w-8 h-8' />

                        </Link>
                        <h2 className='flex justify-center items-center text-xl font-roboto font-bold text-gray-700'>Login into your account</h2>
                    </div>
                    <GoogleAuth />
                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-t border-gray-300" />
                        <span className="px-3 text-sm text-gray-500 font-medium">or</span>
                        <hr className="flex-grow border-t border-gray-300" />
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>

                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-roboto text-[15px]">Email</FormLabel>
                                            <FormControl>
                                                <Input className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-roboto text-[15px]">Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" className="font-roboto font-normal h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='font-roboto font-normal w-full flex flex-col justify-center items-center gap-3'>

                                <Button type="submit" className="w-full bg-darkRed hover:bg-midRed rounded-sm font-roboto mt-8"><LogIn className='text-white' />Sign In</Button>
                                <div className=''>
                                    <p className='text-gray-800'>Don't have an account ?<Link className='pl-1 font-bold text-darkRed hover:underline' to={RouteSignUp}>sign up</Link></p>
                                </div>
                            </div>
                        </form>
                    </Form>
                </Card>
            </div>
        </>
    )
}   