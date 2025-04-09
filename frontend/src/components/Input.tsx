// src/components/Input.tsx
import ShipmentIdForm from './ShipmentIdForm';

interface InputProps {
  shipmentId: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  loading: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({ shipmentId, onChange, onSubmit, loading, errorMessage }) => {
  return (
    <div className="inputField z-10 w-full max-w-[90%] md:max-w-2xl bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300 mb-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
          📦 Shipment Tracker
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          Enter your Shipment ID to track your package in real-time.
        </p>
      </div>

      <ShipmentIdForm
        shipmentId={shipmentId}
        onChange={onChange}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
      />

      {loading && (
        <p className="text-center text-blue-400 mt-4 animate-pulse">Loading shipment data...</p>
      )}
    </div>
  );
};

export default Input;
