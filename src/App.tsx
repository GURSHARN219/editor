import React, { useState } from 'react';
import Split from 'react-split';
import { ActivityBar } from './components/ActivityBar';
import { FileExplorer } from './components/FileExplorer';
import { CodeEditor } from './components/Editor';
import { StatusBar } from './components/StatusBar';
import { Terminal } from './components/Terminal';

function App() {
  const [showTerminal, setShowTerminal] = useState(true);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <ActivityBar />
        <Split
          className="flex"
          sizes={[20, 80]}
          minSize={[200, 400]}
          gutterSize={4}
          gutterStyle={() => ({
            backgroundColor: '#333',
            cursor: 'col-resize',
          })}
        >
          <FileExplorer />
          <Split
            direction="vertical"
            sizes={[70, 30]}
            minSize={[200, 100]}
            gutterSize={4}
            gutterStyle={() => ({
              backgroundColor: '#333',
              cursor: 'row-resize',
            })}
          >
            <CodeEditor />
            {showTerminal && <Terminal />}
          </Split>
        </Split>
      </div>
      <StatusBar />
    </div>
  );
}

export default App;