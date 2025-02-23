import React from 'react';

export const StatusBar: React.FC = () => {
  return (
    <div className="h-6 bg-[#007acc] text-white flex items-center px-2 text-sm">
      <div className="flex items-center space-x-4">
        <span>main*</span>
        <span>TypeScript</span>
        <span>Ln 1, Col 1</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};