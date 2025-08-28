import connectDB from "@/lib/db";
import Candidate from "@/models/Candidate";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB();
        const results = await Candidate.aggregate([
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$name" },
                    votes: { $sum: "$votes" }
                }
            }
        ])

        return NextResponse.json({results}, {status : 200})
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error : error.message}, {status : 500})
        }
        return NextResponse.json({error : "Internal Server Error"},{status : 500})
    }
}