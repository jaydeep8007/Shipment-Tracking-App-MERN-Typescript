import { Request, Response, NextFunction } from 'express';
import { Shipment } from '../models/ShipmentModel';
import { StatusUpdate } from '../models/StatusUpdateModel';

// GET: Get shipment with all its status updates
export const getShipmentWithStatuses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { shipmentId } = req.params;

  try {
    // 1. Find the shipment document by shipmentId
    const shipment = await Shipment.findOne({ shipmentId });

    if (!shipment) {
      res.status(404).json({ message: 'Shipment not found' });
      return;
    }

    // 2. Get all status updates for this shipment, ordered by time
    const statuses = await StatusUpdate.find({ shipment: shipment._id }).sort({ timestamp: 1 });

    // 3. Latest status entry
    const latestStatus = statuses.at(-1); // cleaner way to get last item

    // 4. Determine current status and location
    const currentStatus = latestStatus?.status || shipment.status;
    const currentLocation = latestStatus?.location || null;

    // 5. Send response
    res.status(200).json({
      shipment,
      statuses,
      currentStatus,
      currentLocation,
    });
  } catch (error) {
    next(error);
  }
};

// controllers/shipmentController.ts

// Valid status flow
const STATUS_FLOW = [
  'loading',
  'order confirmed',
  'shipped',
  'in transit',
  'out for delivery',
  'delivered',
];

export const addStatusUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { shipmentId } = req.params;
  const { status, location, timestamp } = req.body;

  try {
    const shipment = await Shipment.findOne({ shipmentId });

    if (!shipment) {
      res.status(404).json({ message: 'Shipment not found' });
      return;
    }

    const currentStatus = (shipment.status as string)?.toLowerCase() || 'loading';
    const newStatus = status.toLowerCase();

    const currentIndex = STATUS_FLOW.indexOf(currentStatus);
    const newIndex = STATUS_FLOW.indexOf(newStatus);

    if (newStatus === 'in transit') {
      if (currentIndex < STATUS_FLOW.indexOf('shipped')) {
        res.status(400).json({
          message: "Cannot mark as 'in transit' before 'shipped'",
        });
        return;
      }
    } else {
      const isNextValid = newIndex === currentIndex + 1;

      if (!isNextValid) {
        res.status(400).json({
          message: `Invalid status order: current '${currentStatus}', attempted '${newStatus}'`,
        });
        return;
      }
    }

    const statusUpdate = new StatusUpdate({
      shipment: shipment._id,
      status: newStatus,
      location,
      timestamp,
    });

    await statusUpdate.save();

    // Update shipment status and isDelivered
    shipment.status = newStatus;
    shipment.isDelivered = newStatus === 'delivered';
    await shipment.save();

    res.status(201).json(statusUpdate);
  } catch (error) {
    next(error);
  }
};

// POST: Create a new shipment
export const createShipment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { shipmentId, origin, destination } = req.body;

  if (!shipmentId || !origin || !destination) {
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }

  try {
    const existing = await Shipment.findOne({ shipmentId });
    if (existing) {
      res.status(409).json({ message: 'Shipment ID already exists.' });
      return;
    }

    const newShipment = new Shipment({
      shipmentId,
      origin,
      destination,
    });

    const savedShipment = await newShipment.save();
    res.status(201).json(savedShipment);
  } catch (error) {
    next(error);
  }
};

export const trackShipment = async (req: Request, res: Response) => {
  const { shipmentId } = req.params;

  try {
    const shipment = await Shipment.findOne({ shipmentId });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    const statusUpdates = await StatusUpdate.find({ shipment: shipment._id }).sort({
      timestamp: 1,
    });

    res.status(200).json({
      shipment,
      statusUpdates,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching shipment tracking', error: err });
  }
};
