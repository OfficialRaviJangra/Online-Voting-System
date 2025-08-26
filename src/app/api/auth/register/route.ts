import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request : NextRequest){
    const {name , email, password, role} = await request.json();

    try {
        //connect to database
        await connectDB();
    
        //check user exists in db or not 
    
        const existingUser = await User.findOne({
            $or : [{name}, {email}]
        })

        if (existingUser) {
            return NextResponse.json(
                {error : "User already exists..."},
                {status : 400}
            )
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        // To Save the user

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({error : error.message}, {status : 500})
        }
        return NextResponse.json({error : "Internal Server Error"},{status : 500})
    }
    
}