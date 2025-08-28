import { NextRequest, NextResponse } from "next/server";
import  connectDB  from "@/lib/db";
import Vote from "@/models/Vote";
import Candidate from "@/models/Candidate";
import { verifyToken } from "@/helpers/token.helper";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Parse body
    const { candidateId } = await req.json();
    if (!candidateId) {
      return NextResponse.json({ error: "Candidate ID is required" }, { status: 400 });
    }

    // Check auth (token from header)
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

   const voterId = (decoded as any).id;

    // Check if voter already voted
    const existingVote = await Vote.findOne({ voter: voterId });
    if (existingVote) {
      return NextResponse.json({ error: "You have already voted!" }, { status: 400 });
    }

    // Save new vote
    const newVote = await Vote.create({
      voter: voterId,
      candidate: candidateId,
    });

    // Increment candidate vote count (optional)
    await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });


    const response = NextResponse.json({
      message: "Vote submitted successfully!",
      vote: newVote,
    });

    // Clear cookies after successful vote
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      expires : new Date(0)
    });

    return response;
  } catch (err: any) {
    console.error("Vote error:", err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}