// src/routes/shipmentRoutes.ts

import express from 'express';
import {
  getShipmentWithStatuses,
  addStatusUpdate,
  createShipment,
} from '../controllers/shipmentController';

const router = express.Router();

router.post('/shipments/create', createShipment);
router.get('/shipments/:shipmentId/track', getShipmentWithStatuses);
router.post('/shipments/:shipmentId/status', addStatusUpdate);

export default router;

// src/routes/shipmentRoutes.ts

// import express from 'express';
// import { body, param } from 'express-validator';
// import {
//   getShipmentWithStatuses,
//   addStatusUpdate,
//   createShipment,
// } from '../controllers/shipmentController';
// import { validateRequest } from '../middlewares/validateRequest';

// const router = express.Router();

// // POST /shipments/create
// router.post(
//   '/shipments/create',
//   [
//     body('trackingNumber').notEmpty().withMessage('Tracking number is required'),
//     body('origin').notEmpty().withMessage('Origin is required'),
//     body('destination').notEmpty().withMessage('Destination is required'),
//     body('status')
//       .optional()
//       .isIn(['Pending', 'In Transit', 'Delivered', 'Cancelled'])
//       .withMessage('Invalid status value'),
//   ],
//   validateRequest,
//   createShipment
// );

// // GET /shipments/:shipmentId/track
// router.get(
//   '/shipments/:shipmentId/track',
//   [
//     param('shipmentId').isMongoId().withMessage('Invalid shipment ID'),
//   ],
//   validateRequest,
//   getShipmentWithStatuses
// );

// // POST /shipments/:shipmentId/status
// router.post(
//   '/shipments/:shipmentId/status',
//   [
//     param('shipmentId').isMongoId().withMessage('Invalid shipment ID'),
//     body('location').notEmpty().withMessage('Location is required'),
//     body('status')
//       .notEmpty()
//       .isIn(['Pending', 'In Transit', 'Delivered', 'Cancelled'])
//       .withMessage('Invalid status'),
//     body('timestamp')
//       .optional()
//       .isISO8601()
//       .toDate()
//       .withMessage('Invalid timestamp format (expected ISO 8601)'),
//   ],
//   validateRequest,
//   addStatusUpdate
// );

// export default router;
