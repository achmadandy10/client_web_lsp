import { CalendarIcon, EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline"
import { XIcon } from "@heroicons/react/solid"
import { ReactNode, useEffect, useRef, useState } from "react"
import { Picker } from "emoji-mart"
import 'emoji-mart/css/emoji-mart.css'
import Image from "next/image"

export default function Input() {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<any>([])
    const [showEmoji, setShowEmoji] = useState(false)
    const filePicker = useRef<any>(null)
    const emoji = useRef<any>(null)

    const addImageToPost = (e: any) => {
        if(e.target.files) {
            const fileArray = Array.from(e.target.files).map((file: any) => URL.createObjectURL(file))
            setSelectedFile((prevImage: any) => prevImage.concat(fileArray))
        }
    }

    const addEmoji = (e: any) => {
        let sym = e.unified.split("-")
        let codeArray: any = []

        sym.forEach((el: string) => codeArray.push("0x" + el))
        let emoji = String.fromCodePoint(...codeArray)
        setInput(input + emoji)
    }

    const sendPost = async () => {
        if (loading) return
        setLoading(true)

        setTimeout(() => {
            setInput("")
            setSelectedFile([])
            setLoading(false)
        }, 5000);
    }

    const deleteFile = (file: string) => {
        if (loading) return
        setSelectedFile( selectedFile.filter((item: string) => item !== file))
    }

    useEffect(() => {
        const textarea: any = document.getElementById("post")

        textarea.addEventListener("keyup", (e: any) => {
            textarea.style.height = `auto`
            let height = e.target.scrollHeight
            textarea.style.height = `${height}px`
        })

        if (!showEmoji) return
    
        function handleEmoji() {
            if (emoji.current) {
                setShowEmoji(false);
            }
        }
    
        window.addEventListener("click", handleEmoji);
    
        return () => {
            window.removeEventListener("click", handleEmoji)
        }
    }, [showEmoji])


    let renderFile: ReactNode = '' 

    if (selectedFile.length === 1) {
        renderFile = (
            <div className="relative">
                {
                    selectedFile.map((file: any, index: number) => {
                        return (
                            <div key={index} className="relative">
                                <div
                                    className="
                                        absolute w-8 h-8 bg-gray-200
                                        hover:bg-gray-300 bg-opacity-75
                                        rounded-full flex items-center
                                        justify-center top-1 left-1
                                        cursor-pointer
                                    "
                                    onClick={ () => deleteFile(file) }
                                >
                                    <XIcon className="h-5"/>
                                </div>
                                <img
                                    src={ file } 
                                    alt="img_post" 
                                    className="rounded-2xl max-h-80 object-contain"
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    } else if (selectedFile.length === 3) {
        renderFile = (
            <div className="grid grid-cols-2 gap-3">
                {
                    selectedFile.map((file: any, index: number) => {
                        var column = ''

                        if (index === 0) {
                            column = 'row-span-2'
                        }

                        return (
                            <div key={index} className={ "relative " + column }>
                                <div
                                    className="
                                        absolute w-8 h-8 bg-gray-200
                                        hover:bg-gray-300 bg-opacity-75
                                        rounded-full flex items-center
                                        justify-center top-1 left-1
                                        cursor-pointer
                                    "
                                    onClick={ () => deleteFile(file) }
                                >
                                    <XIcon className="h-5"/>
                                </div>
                                <img
                                    src={ file } 
                                    alt="img_post" 
                                    className="rounded-2xl h-full object-cover"
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        renderFile = (
            <div className="grid grid-cols-2 gap-3">
                {
                    selectedFile.map((file: any, index: number) => {
                        return (
                            <div key={index} className="relative">
                                <div
                                    className="
                                        absolute w-8 h-8 bg-gray-200
                                        hover:bg-gray-300 bg-opacity-75
                                        rounded-full flex items-center
                                        justify-center top-1 left-1
                                        cursor-pointer
                                    "
                                    onClick={ () => deleteFile(file) }
                                >
                                    <XIcon className="h-5"/>
                                </div>
                                <img
                                    src={ file } 
                                    alt="img_post" 
                                    className="rounded-2xl h-full object-cover"
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div 
            className={`
                border-b border-gray-100
                p-3 flex space-x-3
                ${ loading && "opacity-60" }
            `}
        >
            <img
                src={ "https://ui-avatars.com/api/?background=0D8ABC&color=fff" }
                alt="profile"
                className="
                    h-11 w-11 rounded-full
                    cursor-pointer
                "
            />

            <div 
                className="
                    w-full divide-y divide-gray-100

                "
            >
                <div className={`${ input && "space-y-2.5" }`}>
                    <textarea 
                        disabled={ loading }
                        name="post" 
                        id="post" 
                        value={ input }
                        onChange={ (e) => setInput(e.target.value) }
                        rows={ 2 }
                        placeholder="Apa yang sedang terjadi?"
                        className="
                            bg-transparent outline-none
                            text-lg placeholder-gray-500
                            w-full tracking-wide min-h-[50px]
                        "
                    >
                    </textarea>

                    { selectedFile && renderFile }
                    
                    { !loading && (
                        <div className="flex items-center justify-between pt-2.5">
                            <div className="flex items-center">
                                <div className="icon" onClick={ () => filePicker.current.click() }>
                                    <PhotographIcon className="h-[22px] text-blue-600"/>
                                    <input type="file" accept="image/*" multiple hidden onChange={ addImageToPost } ref={ filePicker }/>
                                </div>

                                <div className="icon" onClick={ () => setShowEmoji(!showEmoji) }>
                                    <EmojiHappyIcon className="h-[22px] text-blue-600"/>
                                </div>


                                <div className="icon">
                                    <CalendarIcon className="h-[22px] text-blue-600"/>
                                </div>
                                { showEmoji && (
                                    <Picker 
                                        ref={ emoji }
                                        onSelect={ addEmoji }
                                        style={{
                                            position: "absolute",
                                            marginTop: "465px",
                                            marginLeft: -40,
                                            maxWidth: "320px",
                                            borderRadius: "20px",
                                        }}
                                        theme="light"
                                    />
                                ) }
                            </div>
                            <button 
                                className="
                                    bg-blue-600 text-white
                                    rounded-full px-4 py-1.5
                                    font-bold shadow-md
                                    hover:bg-blue-700
                                    disabled:hover:bg-blue-600
                                    disabled:opacity-50
                                    disabled:cursor-default
                                "
                                disabled={ !input.trim() && selectedFile.length === 0 }
                                onClick={ sendPost }
                            >Posting</button>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    )
}