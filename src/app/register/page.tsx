"use client"
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const RegisterPage = () => {
    const [user, setUser] = useState(
        {
            name: "",
            email: "",
            password: "",
            role: ""

        }
    )
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user.name || !user.email || !user.password || !user.role) {
            alert("All fields are required.");
            return;
        }
        setLoading(true)

        try {
            const response = await axios.post("/api/auth/register", user);
            if (response.status === 200) {
                router.push("/login");
                router.refresh();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios error
                console.error(error);
                // toast.error(error.response?.data?.error || error.message);
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-white">
                    Create a new account
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                    Or
                    <Link href="/login"
                        className="ml-1 font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        login to your account
                    </Link>
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-100">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder='example@gmail.com'
                                    autoComplete="email"
                                    value={user.email}
                                    onChange={e => setUser({ ...user, email: e.target.value })}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    value={user.password}
                                    onChange={e => setUser({ ...user, password: e.target.value })}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-between">
                            <h3 className="block text-sm font-medium leading-5 text-gray-100">Role</h3>
                            <span>
                                <label htmlFor="radio-1" className='text-sm pr-2 text-gray-100'>Admin</label>
                                <input
                                    id="radio-1"
                                    name="role"
                                    type="radio"
                                    value="admin"
                                    checked={user.role === "admin"}
                                    onChange={e => setUser({ ...user, role: e.target.value })}
                                />
                            </span>
                            <span>
                                <label htmlFor="radio-2" className='text-gray-100 pr-2 text-sm'>Voter</label>
                                <input
                                    id="radio-2"
                                    name="role"
                                    type="radio"
                                    value="voter"
                                    checked={user.role === "voter"}
                                    onChange={e => setUser({ ...user, role: e.target.value })}
                                />
                            </span>
                        </div>
                        <div className="mt-6">
                            <span className="block w-full rounded-md shadow-sm">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                    Create account
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default RegisterPage
