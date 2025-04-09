import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Shipment } from './models/ShipmentModel';
import { StatusUpdate } from './models/StatusUpdateModel';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('✅ MongoDB connected');

    await Shipment.deleteMany();
    await StatusUpdate.deleteMany();

    // ---- Shipment 1 ----
    const shipment1 = await Shipment.create({
      shipmentId: 'SEED001',
      origin: 'Jaipur',
      destination: 'Pune',
      status: 'Out for Delivery',
      isDelivered: false,
      currentLocation: 'Pune Sector 21', // 👈 latest location
    });

    await StatusUpdate.insertMany([
      {
        shipment: shipment1._id,
        status: 'Order Confirmed',
        location: 'Jaipur Warehouse',
        timestamp: new Date('2025-04-01T07:00:00Z'),
      },
      {
        shipment: shipment1._id,
        status: 'Shipped',
        location: 'Jaipur Dispatch Center',
        timestamp: new Date('2025-04-01T09:00:00Z'),
      },
      {
        shipment: shipment1._id,
        status: 'In Transit',
        location: 'Rajasthan Highway',
        timestamp: new Date('2025-04-01T15:00:00Z'),
      },
      {
        shipment: shipment1._id,
        status: 'In Transit',
        location: 'Pune Border Checkpoint',
        timestamp: new Date('2025-04-01T20:00:00Z'),
      },
      {
        shipment: shipment1._id,
        status: 'Reached Local Facility',
        location: 'Pune Facility A',
        timestamp: new Date('2025-04-02T08:00:00Z'),
      },
      {
        shipment: shipment1._id,
        status: 'Out for Delivery',
        location: 'Pune Sector 21',
        timestamp: new Date('2025-04-02T10:00:00Z'),
      },
    ]);

    // ---- Shipment 2 ----
    const shipment2 = await Shipment.create({
      shipmentId: 'SEED002',
      origin: 'Mumbai',
      destination: 'Chennai',
      status: 'Delivered',
      isDelivered: true,
      currentLocation: 'Pune Sector 21', // 👈 latest location
    });

    await StatusUpdate.insertMany([
      {
        shipment: shipment2._id,
        status: 'Order Confirmed',
        location: 'Mumbai Sorting Center',
        timestamp: new Date('2025-04-01T12:00:00Z'),
      },
      {
        shipment: shipment2._id,
        status: 'Shipped',
        location: 'Mumbai Hub',
        timestamp: new Date('2025-04-02T09:00:00Z'),
      },
      {
        shipment: shipment2._id,
        status: 'In Transit',
        location: 'Passing through Pune',
        timestamp: new Date('2025-04-02T15:00:00Z'),
      },
      {
        shipment: shipment2._id,
        status: 'In Transit',
        location: 'Crossed Bengaluru',
        timestamp: new Date('2025-04-03T03:00:00Z'),
      },
      {
        shipment: shipment2._id,
        status: 'Reached Local Facility',
        location: 'Chennai Facility',
        timestamp: new Date('2025-04-03T10:00:00Z'),
      },
      {
        shipment: shipment2._id,
        status: 'Delivered',
        location: 'Customer Address',
        timestamp: new Date('2025-04-03T15:00:00Z'),
      },
    ]);

    // ---- Shipment 3 ----
    const shipment3 = await Shipment.create({
      shipmentId: 'SEED003',
      origin: 'Delhi',
      destination: 'Kolkata',
      status: 'In Transit',
      isDelivered: false,
      currentLocation: 'Pune Sector 21', // 👈 latest location
    });

    await StatusUpdate.insertMany([
      {
        shipment: shipment3._id,
        status: 'Order Confirmed',
        location: 'Delhi Facility',
        timestamp: new Date('2025-04-05T14:00:00Z'),
      },
      {
        shipment: shipment3._id,
        status: 'Shipped',
        location: 'Delhi Dispatch Unit',
        timestamp: new Date('2025-04-05T16:00:00Z'),
      },
      {
        shipment: shipment3._id,
        status: 'In Transit',
        location: 'Kanpur Highway',
        timestamp: new Date('2025-04-06T10:00:00Z'),
      },
      {
        shipment: shipment3._id,
        status: 'In Transit',
        location: 'Patna Station',
        timestamp: new Date('2025-04-06T18:00:00Z'),
      },
      {
        shipment: shipment3._id,
        status: 'Reached Local Facility',
        location: 'Kolkata Central Hub',
        timestamp: new Date('2025-04-07T09:00:00Z'),
      },
      {
        shipment: shipment3._id,
        status: 'Out for Delivery',
        location: 'Kolkata Sector 5',
        timestamp: new Date('2025-04-07T11:00:00Z'),
      },
    ]);

    // ---- Shipment 4 (Only Order Confirmed) ----
    const shipment4 = await Shipment.create({
      shipmentId: 'SEED004',
      origin: 'Ahmedabad',
      destination: 'Surat',
      status: 'Order Confirmed',
      isDelivered: false,
      currentLocation: 'Pune Sector 21', // 👈 latest location
    });

    await StatusUpdate.insertMany([
      {
        shipment: shipment4._id,
        status: 'Order Confirmed',
        location: 'Ahmedabad Main Office',
        timestamp: new Date('2025-04-08T09:00:00Z'),
      },
    ]);

    // ---- Shipment 5 (Order Confirmed -> Shipped) ----
    const shipment5 = await Shipment.create({
      shipmentId: 'SEED005',
      origin: 'Lucknow',
      destination: 'Varanasi',
      status: 'Shipped',
      isDelivered: false,
      currentLocation: 'Pune Sector 21', // 👈 latest location
    });

    await StatusUpdate.insertMany([
      {
        shipment: shipment5._id,
        status: 'Order Confirmed',
        location: 'Lucknow Center',
        timestamp: new Date('2025-04-08T07:00:00Z'),
      },
      {
        shipment: shipment5._id,
        status: 'Shipped',
        location: 'Lucknow Dispatch Hub',
        timestamp: new Date('2025-04-08T10:00:00Z'),
      },
    ]);

    console.log('🌱 Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedData();
