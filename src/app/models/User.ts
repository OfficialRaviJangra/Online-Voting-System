import mongoose, {Schema, Document} from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role : "user" | "admin";
  accessToken : string
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  accessToken : {type :String, default : ""}
},
 {timestamps: true}
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
