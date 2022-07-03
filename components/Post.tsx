import { ChartBarIcon, ChatIcon, HeartIcon, ShareIcon, SwitchHorizontalIcon, TrashIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React, { ReactNode } from 'react'

interface DetailPostProps {
    text: string
    image: any
    comments: any
    liked: boolean
    likes: any
}

interface PostProps {
    id: number
    post: DetailPostProps
    postPage?: any
}

export default function Post({ id, post, postPage }: PostProps) {
    
    let renderImage: ReactNode = ''

    if ( post.image.length === 1 ) {
        renderImage = (
            <div className="relative h-full">
                { post.image.map((value: any, index: number) => {
                    return (
                        <img
                            key={ index } 
                            src={ value.url } 
                            alt="" 
                            className="rounded-2xl h-full w-full object-cover"
                        />
                    )
                }) }  
            </div>
        )
    } else if (post.image.length === 3) {
        renderImage = (
            <div className="grid grid-cols-2 gap-3 mr-2">
                { post.image.map((value: any, index: number) => {
                    var column = ''

                    if (index === 0) {
                        column = 'row-span-2'
                    }

                    return (
                        <img
                            key={ index } 
                            src={ value.url } 
                            alt=""
                            className={"rounded-2xl h-full w-full object-cover " + column}
                        />
                    )
                }) }  
            </div>
        )
    } else {
        renderImage = (
            <div className="grid grid-cols-2 gap-3 mr-2">
                { post.image.map((value: any, index: number) => {
                    return (
                        <img
                            key={ index } 
                            src={ value.url } 
                            alt="" 
                            className="rounded-2xl h-full w-full object-cover"
                        />
                    )
                }) }  
            </div>
        )
    }

    return (
        <div
            className="p-3 flex cursor-pointer border-b border-gray-100 hover:bg-slate-100"
        >
            { !postPage && (
                <img
                    src={ "https://ui-avatars.com/api/?background=0D8ABC&color=fff" } 
                    alt="profile" 
                    className="h-11 w-11 rounded-full mr-4"    
                />
            ) }

            <div className="flex flex-col space-y-2 w-full">
                <div className={ `flex ${ !postPage && "justify-between" }` }>
                    { postPage && (
                        <img
                            src={ "https://ui-avatars.com/api/?background=0D8ABC&color=fff" } 
                            alt="profile" 
                            className="h-11 w-11 rounded-full mr-4"    
                        />
                    ) }

                    <div>
                        <div className="inline-block group">
                            <h4 
                                className={ `
                                    font-medium text-[15px] 
                                    sm:text-base group-hover:underline
                                    ${ !postPage && "inline-block" }
                                `}
                            >
                                Nama Lengkap
                            </h4>
                            <span 
                                className={`
                                    text-gray-500 text-sm sm:text-[15px]
                                    ${ !postPage && "ml-1.5" }
                                `}
                            >
                                @username
                            </span>
                        </div>
                        {" "}
                        &#183;
                        {" "}
                        <span className='hover:underline text-sm sm:text-[15px]'>
                        </span>
                        { !postPage && (
                            <p className="font-normal text-slate-800 text-[15px] sm:text-base mt-0.5">
                                {post.text}
                            </p>
                        ) }
                    </div>
                    <div className="icon group flex-shrink-0 ml-auto group-hover:text-blue-600">
                        <DotsHorizontalIcon className="h-5"/>
                    </div>
                </div>
                { postPage && (
                    <p className="font-normal text-slate-800 text-[15px] sm:text-base mt-0.5">
                        {post.text}
                    </p>
                ) }
                
                { renderImage }

                <div
                    className={`
                        flex justify-between w-10/12
                        ${ postPage && "mx-auto" }
                    `}
                >
                    <div 
                        className="flex items-center space-x-1 group"
                    >
                        <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                            <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
                        </div>
                        {post.comments.length > 0 && (
                            <span className="group-hover:text-[#1d9bf0] text-sm">
                                {post.comments.length}
                            </span>
                        )}
                    </div>

                    {/* {session.user.uid === post?.id ? ( */}
                        <div
                            className="flex items-center space-x-1 group"
                        >
                            <div className="icon group-hover:bg-red-600/10">
                                <TrashIcon className="h-5 group-hover:text-red-600" />
                            </div>
                        </div>
                    {/* ) : ( */}
                        <div className="flex items-center space-x-1 group">
                            <div className="icon group-hover:bg-green-500/10">
                                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
                            </div>
                        </div>
                    {/* )} */}

                    <div
                        className="flex items-center space-x-1 group"
                    >
                        <div className="icon group-hover:bg-pink-600/10">
                            {post.liked ? (
                                <HeartIconSolid className="h-5 text-pink-600" />
                            ) : (
                                <HeartIcon className="h-5 group-hover:text-pink-600" />
                            )}
                        </div>
                        {post.likes.length > 0 && (
                            <span
                                className={`group-hover:text-pink-600 text-sm ${
                                post.liked && "text-pink-600"
                                }`}
                            >
                                {post.likes.length}
                            </span>
                        )}
                    </div>

                    <div className="icon group">
                        <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                    <div className="icon group">
                        <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
                    </div>
                </div>
            </div>
        </div>
    )
}
