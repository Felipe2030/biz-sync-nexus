
import React from 'react';

const AppLogo = ({ collapsed = false }: { collapsed?: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-8 w-8 overflow-hidden rounded-full bg-mobserv-blue border-2 border-white/20 shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
          M
        </div>
      </div>
      {!collapsed && (
        <div className="flex items-center">
          <span className="text-white text-xl font-bold">mob</span>
          <span className="text-gray-300 text-xl font-semibold">serv</span>
          <span className="text-xs text-gray-400 mt-1">®</span>
        </div>
      )}
    </div>
  );
};

export default AppLogo;
