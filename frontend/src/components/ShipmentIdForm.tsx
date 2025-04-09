import React from 'react';

interface ShipmentIdFormProps {
  shipmentId: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  errorMessage?: string;
}

const ShipmentIdForm: React.FC<ShipmentIdFormProps> = ({
  shipmentId,
  onChange,
  onSubmit,
  errorMessage,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full ">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full mt-4">
          <input
            type="text"
            value={shipmentId}
            onChange={onChange}
            placeholder="Enter Shipment ID"
            className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-gray-300 border border-white/20 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            Track
          </button>
        </div>
      </div>

      {errorMessage && <p className="text-red-600 text-sm mt-1">{errorMessage}</p>}
    </form>
  );
};

export default ShipmentIdForm;
