import {
  FaHashtag,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaLocationArrow,
  FaClock,
  FaTruck,
  FaCalendarAlt,
} from 'react-icons/fa';

interface ShipmentDetailsProps {
  shipmentId: string;
  origin: string;
  destination: string;
  currentStatus: string;
  currentLocation?: string;
  lastUpdated?: string;
  estimatedDelivery?: string;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({
  shipmentId,
  origin,
  destination,
  currentStatus,
  currentLocation,
  lastUpdated,
  estimatedDelivery,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaTruck className="text-blue-600" /> Shipment Progress
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <div className="flex items-start gap-3">
          <FaHashtag className="text-blue-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-gray-500">Shipment ID</p>
            <p className="font-semibold">{shipmentId}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaMapMarkedAlt className="text-green-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-gray-500">Origin</p>
            <p className="font-semibold">{origin}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="text-red-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-gray-500">Destination</p>
            <p className="font-semibold">{destination}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <FaLocationArrow className="text-yellow-500 mt-1" />
          <div>
            <p className="text-sm font-medium text-gray-500">Current Status</p>
            <p className="font-semibold">{currentStatus}</p>
          </div>
        </div>

        {currentLocation && (
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-purple-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-500">Current Location</p>
              <p className="font-semibold">{currentLocation}</p>
            </div>
          </div>
        )}

        {lastUpdated && (
          <div className="flex items-start gap-3">
            <FaClock className="text-blue-400 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p className="font-semibold">{new Date(lastUpdated).toLocaleString()}</p>
            </div>
          </div>
        )}

        {estimatedDelivery && (
          <div className="flex items-start gap-3">
            <FaCalendarAlt className="text-indigo-500 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-500">Estimated Delivery</p>
              <p className="font-semibold">{estimatedDelivery}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentDetails;
