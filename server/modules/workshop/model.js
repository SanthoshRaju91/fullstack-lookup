import mongoose, { Schema, model } from "mongoose";

const WorkshopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    choreographer: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true,
        default: 0
    },
    schedule: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true        
    }
}, { timestamps: true });

export default mongoose.model('Workshop', WorkshopSchema);