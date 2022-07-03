import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { HomeIcon as HomeIconSolid } from "@heroicons/react/solid"
import { 
    HomeIcon as HomeIconOutline,
    BellIcon as BellIconOutline,
    InboxIcon as InboxIconOutline,
    BookmarkIcon as BookmarkIconOutline,
    UserIcon as UserIconOutline,
    DotsCircleHorizontalIcon as DotsCircleHorizontalIconOutline,
    DotsHorizontalIcon,
} from "@heroicons/react/outline"
import { useState } from "react";
import { useSelector } from 'react-redux';

export default function Sidebar() {
    const [activeLink, setActiveLink] = useState(true)
    const { users } = useSelector((state: any) => state.users);
    
    return (
        <div 
            className="
                hidden sm:flex flex-col 
                items-center xl:items-start 
                xl:w-[290px] p-2 fixed
                h-full
            "
        >
            <div 
                className="
                    flex items-center 
                    justify-center w-14 h-14 
                    hoverAnimation p-0 xl:ml-[3rem]
                "
            >
                <Image src="/favicon.ico" width={ 30 } height={ 30 } alt="logo"/>
            </div>

            <div className="space-y-2.5 mb-2.5 xl:ml-[3rem]">
                <SidebarLink label="Beranda" Icon={ activeLink ? HomeIconSolid : HomeIconOutline } active/>
                <SidebarLink label="Notifikasi" Icon={ BellIconOutline }/>
                <SidebarLink label="Pesan" Icon={ InboxIconOutline }/>
                <SidebarLink label="Markah" Icon={ BookmarkIconOutline }/>
                <SidebarLink label="Profil" Icon={ UserIconOutline }/>
                <SidebarLink label="Selengkapnya" Icon={ DotsCircleHorizontalIconOutline }/>
            </div>

            <button
                className="
                    hidden xl:inline ml-auto 
                    text-white bg-blue-600
                    rounded-full w-56 h-[52px]
                    font-bold text-lg shadow-md
                    hover:shadow-blue-400
                    hover:bg-blue-700
                "
            >
                Posting
            </button>

            <div className="
                    flex items-center justify-center
                    hoverAnimation xl:ml-auto
                    xl:-mr-6 mt-auto mb-1
                "
            >
                <img
                    src={ "https://ui-avatars.com/api/?background=0D8ABC&color=fff" } 
                    alt="profile"
                    className="
                        h-10 w-10 xl:mr-1
                        rounded-full
                    "
                />
                <div className="hidden xl:inline leading-5 xl:ml-1">
                    <h4 className="font-bold">{users.name}</h4>
                    <p className="text-gray-500">{users.username}</p>
                </div>
                <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10"/>
            </div>
        </div>
    )
}
