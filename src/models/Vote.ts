import mongoose, {Schema, Document} from "mongoose";

export interface IVote extends Document {
    candidate: mongoose.Types.ObjectId;
    voter: mongoose.Types.ObjectId;
    timestamp: Date;
}

const VoteSchema: Schema = new Schema({
    candidate: { type: mongoose.Types.ObjectId, ref: "Candidate", required: true },
    voter: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now }
});

const Vote = mongoose.model<IVote>('Vote', VoteSchema);

export default Vote;
