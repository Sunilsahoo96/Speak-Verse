import React, { useEffect, useState } from "react";
import { MessagesSquare } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage, Form, FormLabel } from '../common/Form'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { showToast } from "../../helpers/showToast";
import { Button } from "../common/Button";
import { Textarea } from "../common/Textarea";
import { useSelector } from "react-redux";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { RouteSignIn } from "../../helpers/RouteName";
import CommentList from '../main/CommentList';
import EmojiPicker from "../main/EmojiPicker";

export default function Comment({ props }) {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [comment, setComment] = useState('');

    const [nC, setNC] = useState();
    const [showPicker, setShowPicker] = useState(false);

    const user = useSelector((state) => state.user);

    const formSchema = z.object({
        comment: z.string().min(2, 'Comment must be atleast 2 character long!'),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        }
    });

    const bId = props?.blogId;

    // Backend
    async function onSubmit(values) {
        try {
            const newValues = { ...values, blogId: props.blogId, author: user?.user?._id };
            const response = await fetch(`${apiUrl}/blog/comment/add`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(newValues)
            });
            const data = await response.json();
            if (!response.ok) {
                return showToast('Error', data.message || 'Something went wrong, please try again later.');
            }
            setNC(data?.newComment);
            showToast('Success', 'Comment Added Successfully.');
            form.reset();
        } catch (error) {
            showToast('Error', error.message);
        }
    };

    return (
        <>
            <div className="font-roboto">
                <h4 className="font-bold text-darkRed text-xl sm:text-2xl mb-3">
                    Comments
                </h4>

                <div className="px-4 pt-4 pb-[0.3px] mb-3 w-full bg-gray-50 rounded-lg ring-1 ring-gray-200">
                    <CommentList props={{ bId, nC }} />
                </div>

                {user ? (
                    user.user?.role === 'User' ? (
                        user.isLoggedIn ? (
                            <>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <FormField
                                                control={form.control}
                                                name="comment"
                                                render={({ field }) => {
                                                    const watchedComment = form.watch("comment");
                                                    return (
                                                        <FormItem className="relative">
                                                            {showPicker && (
                                                                <EmojiPicker
                                                                    onEmojiClick={(emoji) => {
                                                                        const currentValue = form.getValues("comment");
                                                                        form.setValue("comment", currentValue + emoji);
                                                                    }}
                                                                />
                                                            )}

                                                            <FormControl>
                                                                <div className="relative">
                                                                    <Textarea
                                                                        {...field}
                                                                        className="focus-visible:ring-darkRed focus:outline-none bg-gray-50 rounded-lg pr-10"
                                                                        placeholder="Type your comment..."
                                                                    />

                                                                    {watchedComment?.trim() !== '' && (
                                                                        <Button
                                                                            type="submit"
                                                                            className="absolute right-10 bottom-2 text-md text-blue-500 font-bold"
                                                                            variant="outlined"
                                                                        >
                                                                            POST
                                                                        </Button>
                                                                    )}

                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setShowPicker(!showPicker)}
                                                                        className="absolute right-2 bottom-2 text-xl"
                                                                    >
                                                                        😃
                                                                    </button>
                                                                </div>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    );
                                                }}
                                            />

                                        </div>
                                        {/* <Button
                                            type="submit"
                                            className=" hover:bg-midRed rounded-lg w-max flex justify-center items-center gap-2 mt-5"
                                        >
                                            Post
                                        </Button> */}
                                    </form>
                                </Form>
                            </>
                        ) : (
                            <>
                                {/* <Link to={RouteSignIn}>
                        <p className="bg-gray-100 cursor-pointer p-1 hover:border-b-2 w-max border-black font-medium flex gap-1 text-[16px] items-center">
                            <ArrowUpRight size={20} /> Sign in first
                        </p>
                    </Link> */}
                            </>
                        )
                    ) : (
                        <>
                        </>
                    )
                ) : (
                    <>
                        {/* <Link to={RouteSignIn}>
                <p className="bg-gray-100 cursor-pointer p-1 hover:border-b-2 w-max border-black font-medium flex gap-1 text-[16px] items-center">
                    <ArrowUpRight size={20} /> Sign in first
                </p>
                </Link> */}
                    </>
                )}

                {user && user.isLoggedIn
                    ?
                    <>
                    </>
                    :
                    <>
                        <Link to={RouteSignIn}>
                            <p className="bg-gray-100 p-2 rounded-md border-2  w-max font-medium flex gap-1 text-[16px] items-center">
                                <ArrowUpRight size={20} /> <span className="cursor-pointer w-max hover:border-b-2 border-black">Sign in</span> first to add comment
                            </p>
                        </Link>
                    </>
                }

            </div>
        </>
    );
}