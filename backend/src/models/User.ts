import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    role: 'customer' | 'technician' | 'admin';
    profile: {
        phone?: string;
        address?: string;
        avatar?: string;
    };
    technicianDetails?: {
        skills: string[];
        experience: number;
        rating: number;
        isVerified: boolean;
    };
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['customer', 'technician', 'admin'], default: 'customer' },
    profile: {
        phone: { type: String },
        address: { type: String },
        avatar: { type: String }
    },
    technicianDetails: {
        skills: [{ type: String }],
        experience: { type: Number },
        rating: { type: Number, default: 0 },
        isVerified: { type: Boolean, default: false }
    }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
