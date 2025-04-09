// TrackingInputPage.tsx (Updated to handle everything)
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ShipmentDetails from '../components/ShipmentDetails';
import StatusTimeline from '../components/StatusTimeline';

import { AuroraEffect } from '../components/AroraEffect';
import Input from '../components/Input';

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

const TrackingInputPage = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [statuses, setStatuses] = useState<StatusEvent[]>([]);
  const [currentStatus, setCurrentStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const handleTrack = async () => {
    if (!shipmentId.trim()) {
      setErrorMessage('Please enter a shipment ID.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setShipment(null);
    setStatuses([]);
    setCurrentStatus('');

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/shipments/${shipmentId}/track`
      );

      // If shipment found, navigate
      if (response.data?.shipment) {
        navigate(`/track/${shipmentId}`);
      } else {
        setErrorMessage('Shipment ID not found. Please check and try again.');
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        setErrorMessage(`Shipment ID '${shipmentId}' not found.`);
      } else {
        setErrorMessage('A technical error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0d0d2b] via-[#1b1b3a] to-[#000000] text-white relative overflow-hidden">
      <AuroraEffect />
      <Input
        shipmentId={shipmentId}
        onChange={(e) => setShipmentId(e.target.value)}
        onSubmit={handleTrack}
        loading={loading}
        errorMessage={errorMessage}
      />

      {shipment && (
        <div className="w-full max-w-[90%] bg-white p-6 rounded-2xl shadow-md">
          <ShipmentDetails
            shipmentId={shipment.shipmentId}
            origin={shipment.origin}
            destination={shipment.destination}
            currentStatus={currentStatus}
          />
          <StatusTimeline updates={statuses} />
        </div>
      )}
    </div>
  );
};

export default TrackingInputPage;
