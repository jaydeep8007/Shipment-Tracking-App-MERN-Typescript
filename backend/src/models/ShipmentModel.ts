// import mongoose from 'mongoose';

// const ShipmentSchema = new mongoose.Schema(
//   {
//     shipmentId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     origin: {
//       type: String,
//       required: true,
//     },
//     destination: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export const Shipment = mongoose.model('Shipment', ShipmentSchema);

import mongoose, { Document, Schema } from 'mongoose';

const ShipmentSchema: Schema = new Schema(
  {
    shipmentId: { type: String, required: true, unique: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    status: {
      type: String,
      status: {
        type: String,
        enum: ['Order Confirmed', 'Shipped', 'In transit', 'Out for Delivery', 'Delivered'],
      },

      default: 'loading', // 👈 default status
      required: true,
    },
    currentLocation: {
      type: String,
    },

    isDelivered: { type: Boolean, default: false }, // 🆕
  },
  { timestamps: true }
);

export const Shipment = mongoose.model('Shipment', ShipmentSchema);
