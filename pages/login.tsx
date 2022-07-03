import { LockClosedIcon, UserIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Logo from "../images/logo.png"
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/usersSlice';
import nookies from 'nookies';
import jwt from 'jwt-decode';
import Swal from 'sweetalert2';
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmit(true);

    const formData = new FormData()

    formData.append("username", values.username)
    formData.append("password", values.password)

    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/v1/login", formData);

    if (await res.data.status === 401) {
      setValues({ ...values, username: '', password: '' });
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: await res.data.message,
      });
      setIsSubmit(false);
    } else if (await res.data.status === 200) {
      const jwtDecode: any = jwt(await await res.data.data.token);

      dispatch(addUser(await await res.data.data));

      nookies.set(null, 'token', await res.data.data.token, {
        maxAge: jwtDecode.exp,
        path: '/',
      });

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Berhasil!',
        text: `Halo, ${await res.data.data.name}. Selamat datang kembali.`,
        showConfirmButton: true,
        timer: 3500,
      });
      router.replace('/home');
    }
  };

  return (
    <div className="bg-white">
      <Header title="Login"/>
      
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
                Hai, Selamat Datang Kembali!
              </h1>
              <span className="font-light text-gray-500">
                Mari mulai menjelajah dunia biru
              </span>
            </div>
            <form method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">NPM, Email, atau Username</label>
                <div className="flex items-center mt-2 w-full rounded-lg border border-gray-400 focus-within:shadow-lg focus-within:border-blue-600">
                  <div className="flex items-center justify-center pl-6">
                    <UserIcon className="w-6 h-6 pointer-events-none"/>
                  </div>
                  <input 
                    type="text" 
                    id="username"
                    name="username"
                    onChange={handleChange}
                    placeholder="Masukkan NPM, Email, atau Username"
                    className="
                      px-4 py-4 w-full rounded-tr-lg rounded-br-lg focus:outline-none
                      font-normal border-0 focus:ring-0
                    "
                  />
                </div>
              </div>
              <div className="pt-6">
                <label htmlFor="password">Kata Sandi</label>
                <div className="flex items-center mt-2 w-full rounded-lg border border-gray-400 focus-within:shadow-lg focus-within:border-blue-600">
                  <div className="flex items-center justify-center pl-6">
                    <LockClosedIcon className="w-6 h-6 pointer-events-none"/>
                  </div>
                  <input 
                    type="password" 
                    id="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Masukkan Kata Sandi"
                    className="
                      px-4 py-4 rounded-tr-lg rounded-br-lg w-full focus:outline-none
                      font-normal border-0 focus:ring-0
                    "
                  />
                </div>
              </div>

              <div className="flex justify-end items-center pt-4">
                <Link href="/forgot-password" passHref>
                  <a className="hover:text-blue-600">
                    Lupa Kata Sandi
                  </a>
                </Link>
              </div>

              <div className="pt-8">
                <button 
                  type="submit" 
                  className="
                    py-4 px-8 text-white 
                    bg-blue-600 hover:bg-blue-700 rounded-lg 
                    shadow-lg w-full focus:ring-4
                    focus:ring-blue-100 focus:outline-none
                  "
                >
                  Masuk
                </button>
              </div>
            </form>
            <div className="pt-4">
              <div className="font-light text-center text-gray-500">
                Belum punya akun?
                <Link href="/register" passHref> 
                <a className="font-normal hover:text-blue-600"> Daftar</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}