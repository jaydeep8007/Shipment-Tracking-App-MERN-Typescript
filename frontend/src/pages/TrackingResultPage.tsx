// TrackingResultPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ShipmentDetails from '../components/ShipmentDetails';
import StatusTimeline from '../components/StatusTimeline';
import Navbar from '../components/Navbar';
import { AuroraEffect } from '../components/AroraEffect';

interface Shipment {
  shipmentId: string;
  origin: string;
  destination: string;
  status: string;
}

interface StatusEvent {
  status: string;
  location: string;
  timestamp: string;
}

const TrackingResultPage = () => {
  const { shipmentId } = useParams<{ shipmentId: string }>();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [statuses, setStatuses] = useState<StatusEvent[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [technicalError, setTechnicalError] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/shipments/${shipmentId}/track`
        );

        const { shipment, statuses, currentStatus, currentLocation } = response.data;

        if (shipment) {
          setShipment(shipment);
          setStatuses(statuses || []);
          setCurrentStatus(currentStatus || shipment.status);
          setCurrentLocation(currentLocation || null);
        } else {
          setNotFound(true);
        }
      } catch (err: any) {
        if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          setTechnicalError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    if (shipmentId) fetchShipment();
  }, [shipmentId]);

  if (loading) {
    return <div className="text-center mt-8 text-blue-600">Loading shipment data...</div>;
  }

  if (notFound) {
    return (
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md p-4 text-center mt-6">
        ❌ Shipment ID <strong>{shipmentId}</strong> not found. Please check and try again.
      </div>
    );
  }

  if (technicalError) {
    return (
      <div className="bg-red-100 border border-red-300 text-red-800 rounded-md p-4 text-center mt-6">
        ⚠️ A technical error occurred while fetching shipment data. <br />
        Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0d0d2b] via-[#1b1b3a] to-[#000000] text-white relative overflow-hidden">
      <div className="mb-20 lg:mb-10">
        <Navbar />
      </div>
      <AuroraEffect />
      <div className="z-10">
        {shipment && (
          <>
            <ShipmentDetails
              shipmentId={shipment.shipmentId}
              origin={shipment.origin}
              destination={shipment.destination}
              currentStatus={currentStatus}
              currentLocation={currentLocation}
            />
            <StatusTimeline updates={statuses} />
          </>
        )}
        {/* 👇 Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mt-6 w-full justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 shadow-md"
        >
          🔙 Back to Tracking Page
        </button>
      </div>
    </div>
  );
};

export default TrackingResultPage;
