import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true, index: true },
    location: { type: String },
    participants: { type: Number, default: 0 },
    requirements: { type: String },
    imageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
