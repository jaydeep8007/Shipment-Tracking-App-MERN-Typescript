// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import TrackingInputPage from './pages/TrackingInputPage';
import TrackingResultPage from './pages/TrackingResultPage';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
      <Routes>
        <Route path="/" element={<TrackingInputPage />} />
        <Route path="/track/:shipmentId" element={<TrackingResultPage />} />
      </Routes>
    </div>
  );
};

export default App;
