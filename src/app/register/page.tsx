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
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
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
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-5  text-gray-700">Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 text-black" />
                                {/* <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clip-rule="evenodd">
                                        </path>
                                    </svg>
                                </div> */}
                            </div>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="email"
                                    name="email"
                                    placeholder="user@example.com"
                                    type="email"
                                    value={user.email}
                                    onChange={e => setUser({ ...user, email: e.target.value })}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 text-black" />
                                {/* <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                </div> */}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={user.password}
                                    onChange={e => setUser({ ...user, password: e.target.value })}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 text-black" />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-between">
                            <h3 className="block text-sm font-medium leading-5 text-gray-700">Role</h3>
                            <span>
                                <label htmlFor="radio-1" className='text-gray-700 pr-2 text-sm'>Admin</label>
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
                                <label htmlFor="radio-2" className='text-gray-700 pr-2 text-sm'>Voter</label>
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
