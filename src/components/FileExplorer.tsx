import React from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

const sampleFiles: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      { name: 'App.tsx', type: 'file' },
      { name: 'main.tsx', type: 'file' },
      { name: 'index.css', type: 'file' },
    ],
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { name: 'index.html', type: 'file' },
      { name: 'favicon.ico', type: 'file' },
    ],
  },
  { name: 'package.json', type: 'file' },
  { name: 'README.md', type: 'file' },
];

interface FileTreeProps {
  files: FileNode[];
  level?: number;
}

const FileTree: React.FC<FileTreeProps> = ({ files, level = 0 }) => {
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set());

  const toggleFolder = (name: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  return (
    <div className="pl-4">
      {files.map((file) => (
        <div key={file.name}>
          <div
            className="flex items-center py-1 hover:bg-gray-800 cursor-pointer rounded px-2"
            onClick={() => file.type === 'folder' && toggleFolder(file.name)}
          >
            {file.type === 'folder' && (
              <span className="mr-1">
                {expandedFolders.has(file.name) ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            )}
            {file.type === 'folder' ? (
              <Folder size={16} className="mr-2 text-blue-400" />
            ) : (
              <File size={16} className="mr-2 text-gray-400" />
            )}
            <span className="text-sm">{file.name}</span>
          </div>
          {file.type === 'folder' &&
            expandedFolders.has(file.name) &&
            file.children && (
              <FileTree files={file.children} level={level + 1} />
            )}
        </div>
      ))}
    </div>
  );
};

export const FileExplorer: React.FC = () => {
  return (
    <div className="h-full bg-gray-900 text-white p-2">
      <div className="text-sm font-semibold mb-2 px-4">EXPLORER</div>
      <FileTree files={sampleFiles} />
    </div>
  );
};