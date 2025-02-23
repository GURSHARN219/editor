import React from 'react';
import { Files, Search, GitBranch, Bug, Utensils as Extension, Settings } from 'lucide-react';

export const ActivityBar: React.FC = () => {
  return (
    <div className="w-12 bg-gray-900 flex flex-col items-center py-2">
      <button className="p-2 text-white hover:bg-gray-800 rounded mb-2">
        <Files size={24} />
      </button>
      <button className="p-2 text-gray-400 hover:bg-gray-800 rounded mb-2">
        <Search size={24} />
      </button>
      <button className="p-2 text-gray-400 hover:bg-gray-800 rounded mb-2">
        <GitBranch size={24} />
      </button>
      <button className="p-2 text-gray-400 hover:bg-gray-800 rounded mb-2">
        <Bug size={24} />
      </button>
      <button className="p-2 text-gray-400 hover:bg-gray-800 rounded mb-2">
        <Extension size={24} />
      </button>
      <div className="flex-grow"></div>
      <button className="p-2 text-gray-400 hover:bg-gray-800 rounded">
        <Settings size={24} />
      </button>
    </div>
  );
};