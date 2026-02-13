import connectDB from "@/lib/db";
import Candidate from "@/models/Candidate";
import { NextRequest, NextResponse } from "next/server";
import { uploadFile, deleteFile } from "@/helpers/cloudinary";
import path from "path";
import { writeFileSync } from "fs";
import { ObjectId, Types } from "mongoose";
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
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const party = formData.get("party") as string;
    const manifesto = formData.get("manifesto") as string;
    const avatarFile = formData.get("avatar") as File | null;

    try {

        await connectDB();

        let data : {name? : string, email?: string, party?: string, manifesto?: string, avatarUrl?: string} = {name, email, party, manifesto};
        // if avatar is present
        if (avatarFile) {
            // Get the existing candidate to retrieve old avatar URL
            const existingCandidate = await Candidate.findById(id);
            
            // Delete old avatar from Cloudinary if it exists
            if (existingCandidate?.avatarUrl) {
                await deleteFile(existingCandidate.avatarUrl);
            }
            
            const buffer = Buffer.from(await avatarFile.arrayBuffer());
            //write to temp directory
            const tempDir = path.join(process.cwd(), "public");
            const tempFilePath = path.join(tempDir, avatarFile.name);
            writeFileSync(tempFilePath, buffer);
            const avatarUrl = await uploadFile(tempFilePath);
            data = {...data, avatarUrl};
        }
        const updatedCandidate = await Candidate.findByIdAndUpdate(id, data, {new: true});

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