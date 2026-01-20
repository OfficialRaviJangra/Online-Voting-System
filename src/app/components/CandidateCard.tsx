"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, Key } from 'react'

interface Candidate {
    name: string;
    email: string;
    party: string;
    manifesto: string;
    avatarUrl: string
    _id: Key | null | undefined;
}

interface CandidateCardProps {
    candidate: Candidate;
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
    const router = useRouter();
    const { name, email, party, manifesto, _id, avatarUrl } = candidate
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
            if (axios.isAxiosError(err)) {
                if (err.response?.status == 400) {
                    alert(err.response.data.message || "You can only vote once.")
                    setMessage(err.response.data.message || "You can only vote once.")
                }
            }
            else if (err instanceof Error) {
                setMessage("❌ " + (err.message || "Vote failed"));
            } else {
                setMessage("Something went wrong.");
            }
        }
    }
    return (
        <div className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-6 w-96">
            <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
                <img className="w-full h-full object-cover" src={avatarUrl} alt="profile-picture" />
            </div>
            <div className="p-6 text-center">
                <h3 className="mb-1 text-xl font-semibold text-slate-800">
                    {name}
                </h3>
                <p
                    className="text-sm font-semibold text-slate-500 uppercase">
                    {party}
                </p>
                <p className="text-base text-slate-600 mt-4 font-light ">
                    {email}
                </p>
            </div>
            <div className="flex justify-center p-6 pt-2 gap-7">
                <button
                    className="min-w-32  rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                    type="button"
                    onClick={() => { handleClick(_id) }}
                >
                    Vote
                </button>
            </div>
        </div>

    )
}
export default CandidateCard