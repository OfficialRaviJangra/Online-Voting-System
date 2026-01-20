import connectDB from "@/lib/db";
import Candidate from "@/models/Candidate";
import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/helpers/cloudinary";
import path from "path";
import { writeFileSync } from "fs";

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
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const party = formData.get("party") as string;
    const manifesto = formData.get("manifesto") as string;
    const avatarFile = formData.get("avatar") as File;
    console.log(avatarFile)
    try {
        await connectDB();

        const existedCandidate = await Candidate.findOne({email})
    
        if (existedCandidate) {
            return new NextResponse("Candidate already exists", { status: 400 });
        }
        
        //if avatar is not present
        if (!avatarFile) {
            return NextResponse.json({error: "No file provided"}, {status: 400});
        }
        const buffer = Buffer.from(await avatarFile.arrayBuffer());
        //write to temp directory
        const tempDir = path.join(process.cwd(), "public")
        const tempFilePath = path.join(tempDir, avatarFile.name);
        writeFileSync(tempFilePath, buffer);

        const avatarUrl = await uploadFile(tempFilePath);
        console.log(avatarUrl)
        const candidate = new Candidate({name, email, party, manifesto, avatarUrl: avatarUrl});
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

export async function PUT(request: NextRequest){
    const {id, body} = await request.json();

    try {
        await connectDB();
        const updatedCandidate = await Candidate.findOneAndUpdate({_id: id}, body, {new: true});

        if (!updatedCandidate) {
            return new NextResponse("Candidate not found", { status: 404 });
        }
        return NextResponse.json(updatedCandidate, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error : error.message}, {status : 500})
        }
        return NextResponse.json({error : "Internal Server Error"},{status : 500})
    }
}