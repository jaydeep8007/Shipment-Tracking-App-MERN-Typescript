import {
  FaBox,
  FaCheckCircle,
  FaClock,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaShippingFast,
  FaSpinner,
  FaTruckMoving,
} from 'react-icons/fa';

interface StatusUpdate {
  status: string;
  location?: string;
  timestamp?: string;
}

interface StatusTimelineProps {
  updates: StatusUpdate[];
}

const getStatusIcon = (status: string, completed: boolean) => {
  const baseClass = completed ? 'text-blue-600' : 'text-gray-400';

  switch (status.toLowerCase()) {
    case 'order placed':
    case 'order confirmed':
      return <FaBox className={baseClass} size={20} />;
    case 'processing':
      return <FaSpinner className={`${baseClass} animate-spin`} size={20} />;
    case 'shipped':
      return <FaTruckMoving className={baseClass} size={20} />;
    case 'in transit':
      return <FaShippingFast className={baseClass} size={20} />;
    case 'out for delivery':
      return <FaLocationArrow className={baseClass} size={20} />;
    case 'delivered':
      return <FaCheckCircle className={baseClass} size={20} />;
    default:
      return <FaBox className="text-gray-400" size={20} />;
  }
};

const StatusTimeline: React.FC<StatusTimelineProps> = ({ updates }) => {
  const hasDelivered = updates.some((u) => u.status.toLowerCase() === 'delivered');

  const updatedTimeline = hasDelivered
    ? updates
    : [
        ...updates,
        {
          status: 'Delivered',
          location: '',
          timestamp: '',
        },
      ];

  const completedSteps = updatedTimeline.filter((u) => u.timestamp).length;
  const totalSteps = updatedTimeline.length;
  const progress = Math.floor((completedSteps / totalSteps) * 100);

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tracking Timeline</h2>

      <div className="relative">
        {/* Desktop Progress Bar */}
        <div className="hidden md:block absolute top-1.5 left-0 right-0 h-[9%] bg-gray-200 z-0 rounded-full" />
        <div
          className="hidden md:block absolute top-1.5 left-0 h-[9%] bg-blue-600 z-10 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />

        {/* Mobile Vertical Progress */}
        <div className="md:hidden absolute top-0 left-[5px] w-[6%] bg-gray-200 h-full rounded-full z-0" />
        <div
          className="md:hidden absolute top-0 left-[5px] w-[6%] bg-blue-600 rounded-full z-10 transition-all duration-300"
          style={{ height: `${progress}%` }}
        />

        <ul className="flex flex-col md:flex-row md:justify-between relative z-20">
          {updatedTimeline.map((update, index) => {
            const isCompleted = !!update.timestamp;

            return (
              <li
                key={index}
                className="relative flex md:flex-col items-start md:items-center mb-10 md:mb-0 md:flex-1 text-left md:text-center"
              >
                {/* Dot */}
                <div className="flex items-center md:flex-col md:items-center md:justify-center z-30">
                  <div className="relative z-20">
                    <div className="w-6 h-6 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-sm">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          isCompleted ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Text content */}
                <div className="ml-8 md:ml-0 md:mt-6">
                  <p
                    className={`flex items-center gap-2 md:flex-col md:gap-1 font-semibold ${
                      isCompleted ? 'text-gray-800' : 'text-gray-500 italic'
                    }`}
                  >
                    {getStatusIcon(update.status, isCompleted)}
                    {update.status}
                  </p>

                  {update.location && (
                    <p className="text-sm text-gray-500 flex items-center gap-1 md:justify-center mt-1">
                      <FaMapMarkerAlt size={14} />
                      {update.location}
                    </p>
                  )}

                  {update.timestamp && (
                    <p className="text-xs text-gray-400 flex items-center gap-1 md:justify-center mt-1">
                      <FaClock size={14} />
                      {new Date(update.timestamp).toLocaleString()}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default StatusTimeline;
