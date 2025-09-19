import mongoose, {Schema, Document, models} from "mongoose";

export interface ICandidate extends Document {
    name: string;
    email: string;
    party: string;
    votes: number;
    manifesto: string;
}

const CandidateSchema: Schema = new Schema<ICandidate>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    party: { type: String, required: true },
    votes: { type: Number, default: 0 },
    manifesto: { type: String, required: true },
}, { timestamps: true });

const Candidate = models.Candidate || mongoose.model<ICandidate>('Candidate', CandidateSchema);

export default Candidate;
