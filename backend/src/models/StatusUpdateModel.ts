import mongoose, { Document, Schema } from 'mongoose';

export interface IStatusUpdate extends Document {
  shipment: mongoose.Types.ObjectId;
  status: string;
  location: string;
  timestamp: Date;
}

const StatusUpdateSchema: Schema = new Schema({
  shipment: {
    type: Schema.Types.ObjectId,
    ref: 'Shipment',
    required: true,
  },
  status: { type: String, required: true },
  location: { type: String, required: true },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const StatusUpdate = mongoose.model<IStatusUpdate>('StatusUpdate', StatusUpdateSchema);
