"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
const Admin = () => {
    const router = useRouter();

    const [candidates, setCandidates] = useState({
        name: '',
        email: '',
        party: '',
        manifesto: ''
    });
    console.log(candidates)
    const handleLogout = async () => {
        const response = await axios.post('/api/auth/logout');
        console.log(response.data.message);
        router.push("/login");
    }

    const handleClick = async () => {
        const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await axios.post("/api/candidates", candidates);
        console.log(response.data);
        const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
        setCandidates({
            name: '',
            email: '',
            party: '',
            manifesto: ''
        });
        router.refresh();
    }

    return (
        <section>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Admin Dashboard</span>
                    </a>
                    <div className='relative'>
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            onClick={handleClick}
                        >
                            Add Candidate
                        </button>
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
            {/* Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Add Candidate
                        </h3>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-4 md:p-2">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" value={candidates.name} onChange={e => setCandidates({ ...candidates, name: e.target.value })} required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" value={candidates.email} onChange={e => setCandidates({ ...candidates, email: e.target.value })} required />
                            </div>
                            <div>
                                <label htmlFor="political-party" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Political Party</label>
                                <input type="text" name="political-party" id="political-party" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Political Party" value={candidates.party} onChange={e => setCandidates({ ...candidates, party: e.target.value })} required />
                            </div>
                            <div>
                                <label htmlFor="userParagraph" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your manifesto:</label>
                                <textarea id="userParagraph" name="userParagraph" rows={5} cols={50} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={candidates.manifesto} onChange={e => setCandidates({ ...candidates, manifesto: e.target.value })} required></textarea>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add candidate
                            </button>
                        </form>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </section>
    )
}

export default Admin
