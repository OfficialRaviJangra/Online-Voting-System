import connectDB from "@/lib/db";
import Candidate from "@/models/Candidate";
import { NextRequest, NextResponse } from "next/server";



export async function GET() {
    try {
        await connectDB();
        const candidates = await Candidate.find()
    
        if (!candidates) {
            return new NextResponse("No candidates found", { status: 404 });   
        }
    
        return new NextResponse(JSON.stringify(candidates), { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error : error.message}, {status : 500})
        }
        return NextResponse.json({error : "Internal Server Error"},{status : 500})
    }
}


export async function POST(request: NextRequest){
    const {name , email, party, manifesto} = await request.json();

    try {
        await connectDB();

        const existedCandidate = await Candidate.findOne({email})
    
        if (existedCandidate) {
            return new NextResponse("Candidate already exists", { status: 400 });
        }
    
        const candidate = new Candidate({name, email, party, manifesto});
        await candidate.save();
    
        return NextResponse.json(candidate, { status: 201 });


    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error : error.message}, {status : 500})
        }
        return NextResponse.json({error : "Internal Server Error"},{status : 500})
    }
}

export async function DELETE(request: NextRequest){
    const {id} = await request.json();

    try {
        await connectDB();

        const deletedCandidate = await Candidate.findOneAndDelete({_id: id});

        if (!deletedCandidate) {
            return new NextResponse("Candidate not found", { status: 404 });
        }

        return new NextResponse("Candidate deleted successfully", { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error : error.message}, {status : 500})
        }
        return NextResponse.json({error : "Internal Server Error"},{status : 500})
    }
}