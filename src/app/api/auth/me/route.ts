import { verifyToken } from "@/helpers/token.helper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token : string | undefined = request.cookies.get("accessToken")?.value;

    if (!token) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    try {
        const user = verifyToken(token!) as { id: string; role: string; };
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}