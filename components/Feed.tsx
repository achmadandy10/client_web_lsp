import { SparklesIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react"
import Input from "./Input"
import Post from "./Post"

interface FeedProps {
    id: number
    data: any
}

export default function Feed() {
    const [posts, setPosts] = useState<FeedProps[]>([])

    useEffect(() => {
        const GetPost = async () => {
            setPosts([
                {
                    id: 1,
                    data: {
                        text: "tes1",
                        image: [
                            { post_id: 1, url: "https://ui-avatars.com/api/?background=0D8ABC&color=fff" },
                            { post_id: 1, url: "https://ui-avatars.com/api/?background=0D8ABC&color=fff" },
                            { post_id: 1, url: "https://ui-avatars.com/api/?background=0D8ABC&color=fff" },
                        ],
                        comments: [
                            { id: 1 },
                            { id: 2 },
                            { id: 3 },
                            { id: 4 },
                            { id: 5 },
                        ],
                        liked: 1,
                        likes: [ 
                            { id: 1 }, 
                        ]
                    }
                },
            ])
        }

        GetPost()
    }, [])

    return (
        <div className="
                border flex-grow border-l 
                border-r border-gray-100
                max-w-[38rem] sm:ml-[73px] xl:ml-[320px]
            "
        >
            <div className="
                    flex items-center sm:justify-between
                    py-2 px-3 sticky top-0 z-50 backdrop-blur-sm
                    border-b border-gray-100 bg-white/30
                "
            >
                <h2 className="text-lg sm:text-xl font-bold">Beranda</h2>
                <div className="
                        hoverAnimation w-9 h-9 flex
                        items-center justify-center
                        xl:px-0 ml-auto
                    "
                >
                    <SparklesIcon className="h-5"/>
                </div>
            </div>

            <Input />

            <div className="pb-72">
                {
                    posts.map((post) => (
                        <Post key={ post.id } id={ post.id } post={ post.data }/>
                    ))
                }
            </div>
        </div>
    )
}
