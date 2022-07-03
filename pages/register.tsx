import { AtSymbolIcon, ChevronRightIcon, IdentificationIcon, LockClosedIcon, MailIcon, UserIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import Header from '../components/Header'
import Logo from "../images/logo.png"
import axios from "axios";
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/usersSlice';
import nookies from 'nookies';
import jwt from 'jwt-decode';
import { useRouter } from 'next/router';

export default function Register() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [formStep, setFormStep] = useState<number>(0)
    const [data, setData] = useState({
        npm: '',
        name: '',
        email: '',
        username: '',
        password: '',
        confirm_password: '',
    })
    const [error, setError] = useState<any>({})

    const inputChanged = (e: any) => {
        var name = e.target.name
        var value = e.target.value

        setData({ ...data, [name]: value })
    }

    const checkNPMStep = async (e: any) => {
        e.preventDefault()

        if (!data.npm) {
            setError({npm: "NPM tidak boleh kosong."})
            return
        }

        const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/v1/check_npm/" + data.npm)

        if (res.data.status === 409) {
            setError({ npm: "NPM sudah terdaftar." })
        } else if (res.data.status === 404) {
            setError({ npm: "NPM tidak ditemukan." })
        } else if (res.data.status === 401) {
            setError({ npm: "NPM tidak valid." })
        } else if (res.data.status === 200) {
            setData({ ...data, name: res.data.data.name })
            setFormStep(step => step + 1)
        }
    }

    const completeFormStep = async (e: any) => {
        e.preventDefault()


        if (data.confirm_password != data.password) {
            setError({ confirm_password: "Konfirmasi Password tidak sesuai." })
            return
        }

        const form = new FormData()

        form.append("npm", data.npm)
        form.append("email", data.email)
        form.append("name", data.name)
        form.append("username", data.username)
        form.append("password", data.password)
        form.append("confirm_password", data.confirm_password)

        const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/v1/register", form)
        
        const meta = await res.data
        const dt = await res.data.data
        
        if (meta.status === 200) {
            const jwtDecode: any = jwt(dt.token);
            dispatch(addUser(dt));
            nookies.set(null, 'token', dt.token, {
            maxAge: jwtDecode.exp,
            path: '/',
            });

            Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Berhasil!',
            text: `Halo, ${dt.name}. Selamat datang di Sosial Media Himti.`,
            showConfirmButton: true,
            timer: 3500,
            });

            router.replace("/home")
        } else {
            setError(meta.errors)
        }
    }

    let renderButton: ReactNode = ''

    if (formStep > 1) {
        renderButton = undefined
    } else if (formStep === 1) {
        renderButton = (
            <button 
                type="submit" 
                className="
                    py-4 px-8 text-white 
                    bg-blue-600 hover:bg-blue-700 rounded-lg 
                    shadow-lg w-full focus:ring-4
                    focus:ring-blue-100 focus:outline-none
                    flex items-center justify-center gap-2
                "
                onClick={ completeFormStep }
            >
                Selesai
            </button>
        )
    } else {
        renderButton = (
            <button 
                type="submit" 
                className="
                    py-4 px-8 text-white 
                    bg-blue-600 hover:bg-blue-700 rounded-lg 
                    shadow-lg w-full focus:ring-4
                    focus:ring-blue-100 focus:outline-none
                    flex items-center justify-center gap-2
                "
                onClick={ checkNPMStep }
            >
                Berikutnya <ChevronRightIcon className="flex items-center justify-center w-[20px]"/>
            </button>
        )
    }

    return (
        <div className="bg-white">
            <Header title="Register"/>
            
            <main className="min-h-screen flex justify-center mx-auto">
                <div 
                    className="
                        w-1/2 bg-blue-600
                        hidden lg:block
                        relative
                    "
                >
                    <div className="flex items-center justify-center w-full h-full">
                        <Image src={ Logo } alt="logo"/>
                    </div>
                </div>
                <div className="flex-1 lg:w-1/2">
                    <div className="flex flex-col px-5 sm:px-24 py-10">
                        <div className="self-center sm:self-start w-[100px]">
                            <Image src={ Logo } alt="logo"/>
                        </div>

                        <div className="pt-5 pb-6">
                            <h1 className="text-3xl font-bold tracking-wide leading-loose">
                                Akun Baru!
                            </h1>
                            <span className="font-light text-gray-500">
                                Lengkapi form di bawah dengan menggunakan data Anda yang valid
                            </span>
                        </div>
                        <form method="POST">
                            { formStep === 0 && (
                                <section>
                                    <div>
                                        <label htmlFor="username">NPM</label>
                                        <div className="flex items-center mt-2 w-full rounded-lg border border-gray-400 focus-within:shadow-lg focus-within:border-blue-600">
                                            <div className="flex items-center justify-center pl-6">
                                                <IdentificationIcon className="w-6 h-6 pointer-events-none"/>
                                            </div>
                                            <input 
                                                type="text" 
                                                id="npm"
                                                name="npm"
                                                value={ data.npm }
                                                placeholder="Masukkan NPM"
                                                className="
                                                    px-4 py-4 w-full rounded-tr-lg rounded-br-lg focus:outline-none
                                                    font-normal border-0 focus:ring-0
                                                "
                                                onChange={ inputChanged }
                                            />
                                        </div>
                                        { error.npm && (
                                            <div 
                                                className="
                                                    w-full text-red-600 text-left
                                                    mt-2 rounded-lg
                                                "
                                            >
                                                { error.npm }
                                            </div>
                                        ) }
                                    </div>
                                </section>
                            ) }
                            { formStep === 1 && (
                                <section>
                                    <div>
                                        <label htmlFor="name">Nama Lengkap</label>
                                        <div className="flex items-center mt-2 w-full rounded-lg border border-gray-400 focus-within:shadow-lg focus-within:border-blue-600">
                                            <div className="flex items-center justify-center pl-6">
                                                <UserIcon className="w-6 h-6 pointer-events-none"/>
                                            </div>
                                            <input 
                                                type="text" 
                                                id="name"
                                                value={ data.name }
                                                readOnly
                                                name="name"
                                                className="
                                                    px-4 py-4 w-full rounded-tr-lg rounded-br-lg focus:outline-none
                                                    font-normal border-0 focus:ring-0
                                                "
                                                onChange={ inputChanged }
                                            />
                                        </div>
                                        { error.name && (
                                            <div 
                                                className="
                                                    w-full text-red-600 text-left
                                                    mt-2 rounded-lg
                                                "
                                            >
                                                { error.name }
                                            </div>
                                        ) }
                                    </div>
                                    <div className="pt-6">
                                        <label htmlFor="email">Alamat Email</label>
                                        <div className="flex items-center mt-2 w-full rounded-lg border border-gray-400 focus-within:shadow-lg focus-within:border-blue-600">
                                            <div className="flex items-center justify-center pl-6">
                                                <MailIcon className="w-6 h-6 pointer-events-none"/>
                                            </div>
                                            <input 
                                                type="email" 
                                                id="email"
                                                name="email"
                                                value={ data.email }
                                                placeholder="Masukkan Username"
                                                className="
                                                    px-4 py-4 w-full rounded-tr-lg rounded-br-lg focus:outline-none
                                                    font-normal border-0 focus:ring-0
                                                "
                                                onChange={ inputChanged }
                                            />
                                        </div>
                                        { error.email && (
                                            <div 
                                                className="
                                                    w-full text-red-600 text-left
                                                    mt-2 rounded-lg
                                                "
                                            >
                                                { error.email }
                                            </div>
                                        ) }
                                    </div>
                                    <div className="pt-6">
                                        <label htmlFor="username">Username</label>
                                        <div className="flex items-center mt-2 w-full rounded-lg border border-gray-400 focus-within:shadow-lg focus-within:border-blue-600">
                                            <div className="flex items-center justify-center pl-6">
                                                <AtSymbolIcon className="w-6 h-6 pointer-events-none"/>
                                            </div>
                                            <input 
                                                type="text" 
                                                id="username"
                                                name="username"
                                                value={ data.username }
                                                placeholder="Masukkan Username"
                                                className="
                                                    px-4 py-4 w-full rounded-tr-lg rounded-br-lg focus:outline-none
                                                    font-normal border-0 focus:ring-0
                                                "
                                                onChange={ inputChanged }
                                            />
                                        </div>
                                        { error.username && (
                                            <div 
                                                className="
                                                    w-full text-red-600 text-left
                                                    mt-2 rounded-lg
                                                "
                                            >
                                                { error.username }
                                            </div>
                                        ) }
                                    </div>
                                    <div className="pt-6">
                                        <label htmlFor="username">Kata Sandi</label>
                                        <div className="flex items-center mt-2 w-full rounded-lg border border-gray-400 focus-within:shadow-lg focus-within:border-blue-600">
                                            <div className="flex items-center justify-center pl-6">
                                                <LockClosedIcon className="w-6 h-6 pointer-events-none"/>
                                            </div>
                                            <input 
                                                type="password" 
                                                id="password"
                                                name="password"
                                                value={ data.password }
                                                placeholder="Masukkan Kata Sandi"
                                                className="
                                                    px-4 py-4 w-full rounded-tr-lg rounded-br-lg focus:outline-none
                                                    font-normal border-0 focus:ring-0
                                                "
                                                onChange={ inputChanged }
                                            />
                                        </div>
                                        { error.password && (
                                            <div 
                                                className="
                                                    w-full text-red-600 text-left
                                                    mt-2 rounded-lg
                                                "
                                            >
                                                { error.password }
                                            </div>
                                        ) }
                                    </div>
                                    <div className="pt-6">
                                        <label htmlFor="username">Konfirmasi Kata Sandi</label>
                                        <div className="flex items-center mt-2 w-full rounded-lg border border-gray-400 focus-within:shadow-lg focus-within:border-blue-600">
                                            <div className="flex items-center justify-center pl-6">
                                                <LockClosedIcon className="w-6 h-6 pointer-events-none"/>
                                            </div>
                                            <input 
                                                type="password" 
                                                id="confirm_password"
                                                name="confirm_password"
                                                value={ data.confirm_password }
                                                placeholder="Masukkan Konfirmasi Kata Sandi"
                                                className="
                                                    px-4 py-4 w-full rounded-tr-lg rounded-br-lg focus:outline-none
                                                    font-normal border-0 focus:ring-0
                                                "
                                                onChange={ inputChanged }
                                            />
                                        </div>
                                        { error.confirm_password && (
                                            <div 
                                                className="
                                                    w-full text-red-600 text-left
                                                    mt-2 rounded-lg
                                                "
                                            >
                                                { error.confirm_password }
                                            </div>
                                        ) }
                                    </div>
                                </section>
                            ) }

                            <div className="pt-8">
                                { renderButton }
                            </div>
                        </form>
                        <div className="pt-4">
                            <div className="font-light text-center text-gray-500">
                                Sudah memiliki akun?
                                <Link href="/" passHref>
                                    <a className="font-normal hover:text-blue-600"> Masuk</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
    </div>
    )
}
