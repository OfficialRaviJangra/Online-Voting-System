import jwt from "jsonwebtoken"


export const createToken = (id: any) : {accessToken: string} => {
    const accessToken = jwt.sign({id},process.env.JWT_SECRET!,{expiresIn: "1h"});

    return {accessToken}
}

export const verifyToken = (token : string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return decoded;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            console.log("Invalid Token : ", error.message)
        }
        return null
    }
}

