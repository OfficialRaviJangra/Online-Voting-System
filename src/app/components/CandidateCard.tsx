"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, Key } from 'react'

interface Candidate {
    name: string;
    email: string;
    party: string;
    manifesto: string;
    _id: Key | null | undefined;
}

interface CandidateCardProps {
    candidate: Candidate;
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
    const router = useRouter();
    const { name, email, party, manifesto, _id } = candidate
    const [message, setMessage] = useState("")
    const handleClick = async (id: Key | null | undefined) => {
        setMessage("");
        try {
            const token = localStorage.getItem("accessToken")
            if (!token) {
                setMessage("You must be logged in to vote.");
                return;
            }
            const res = await axios.post("/api/votes", { "candidateId": id }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            //Redirect to login page after successfull vote cast
            router.push("/login")
            router.refresh()

            setMessage("✅ " + res.data.message);


        } catch (err: unknown) {
            if (err instanceof Error) {
                setMessage("❌ " + (err.message || "Vote failed"));
            } else {
                setMessage("Something went wrong.");
            }
        }
    }
    return (
        <div className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Name : {name}</h5>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Email : {email}</h5>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">Party : {party}</h5>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400"> Manifesto : {manifesto}</p>
            <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => { handleClick(_id) }}
            >Vote
            </button>
        </div>
    )
}
export default CandidateCard