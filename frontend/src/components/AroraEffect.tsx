// components/AuroraEffect.tsx

import { motion } from 'framer-motion';

export const AuroraEffect = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 opacity-30 blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, 100, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-300px] right-[-150px] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-violet-500 opacity-30 blur-3xl"
        animate={{ x: [0, -100, 0], y: [0, -100, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};
