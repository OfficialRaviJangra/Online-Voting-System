"use client"
import axios from 'axios'
import React, { useEffect, useState, Key } from 'react'
import CandidateCard from '../components/CandidateCard';

type Candidate = {
    _id: Key | null | undefined;
    name: string;
    email: string;
    party: string;
    manifesto: string;
};

const Dashboard = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/api/candidates");
            setCandidates(response.data)
        }
        fetchData();
    }, [])
    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            <div className='flex flex-1 gap-2 justify-center items-center'>
                {Array.isArray(candidates) && candidates.map((candidate) => (
                    <CandidateCard key={candidate._id} candidate={candidate} />
                ))}
            </div>
        </div>
    )
}

export default Dashboard
