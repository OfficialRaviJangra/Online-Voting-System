import { createToken } from "@/helpers/token.helper";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request : NextRequest){
    const {email, password} = await request.json();

    try {
        await connectDB();

        const user = await User.findOne({email})

        if (!user) {
            return NextResponse.json({error : "User not found"}, {status : 401})
        }
        
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({error : "Password is incorrect"}, {status : 401})
        }

         // Create token
        const {accessToken} = createToken(user._id);
        user.accessToken = accessToken
        await user.save({ validateBeforeSave: false });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        }, { status: 200 });

        response.cookies.set("accessToken", accessToken, {
            httpOnly : true,
            secure : true
        })
        return response;
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}