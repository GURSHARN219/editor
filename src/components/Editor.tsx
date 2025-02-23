import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, StopCircle } from 'lucide-react';

const sampleCode = `function greeting(name: string) {
  return \`Hello, \${name}!\`;
}

console.log(greeting("World"));`;

export const CodeEditor: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>('');

  const handleRun = () => {
    setIsRunning(true);
    try {
      // Create a safe evaluation context
      const evalContext = {
        console: {
          log: (...args: any[]) => {
            setOutput(prev => prev + args.join(' ') + '\n');
          }
        }
      };
      
      // Simulate code execution
      new Function('console', sampleCode).call(null, evalContext.console);
    } catch (error) {
      setOutput(prev => prev + 'Error: ' + (error as Error).message + '\n');
    }
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setOutput(prev => prev + 'Execution stopped.\n');
  };

  return (
    <div className="h-full w-full bg-[#1e1e1e] flex flex-col">
      <div className="flex items-center bg-[#252526] px-4 py-2 border-b border-[#3c3c3c]">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className={`p-2 rounded flex items-center ${
            isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3c3c3c]'
          }`}
        >
          <Play size={16} className="text-green-500 mr-2" />
          <span className="text-white text-sm">Run</span>
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className={`p-2 rounded flex items-center ml-2 ${
            !isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#3c3c3c]'
          }`}
        >
          <StopCircle size={16} className="text-red-500 mr-2" />
          <span className="text-white text-sm">Stop</span>
        </button>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          defaultValue={sampleCode}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            folding: true,
            bracketPairColorization: {
              enabled: true
            }
          }}
        />
      </div>
      {output && (
        <div className="bg-[#1e1e1e] border-t border-[#3c3c3c] p-4">
          <div className="font-mono text-sm text-white whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};