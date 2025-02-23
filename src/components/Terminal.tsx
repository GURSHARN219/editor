import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

export const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (terminalRef.current && !xtermRef.current) {
      const term = new XTerm({
        theme: {
          background: '#1e1e1e',
          foreground: '#ffffff',
        },
        fontSize: 14,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        cursorBlink: true,
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();

      term.writeln('Welcome to VS Code-like Terminal');
      term.writeln('Type "help" for available commands\r\n');

      term.onKey(({ key, domEvent }) => {
        const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

        if (domEvent.keyCode === 13) {
          term.writeln('');
          term.write('\r\n$ ');
        } else if (printable) {
          term.write(key);
        }
      });

      term.write('$ ');
      xtermRef.current = term;

      return () => {
        term.dispose();
      };
    }
  }, []);

  return <div ref={terminalRef} className="h-full w-full bg-[#1e1e1e]" />;
};