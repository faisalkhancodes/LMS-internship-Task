import React, { useState } from "react";
import { Terminal as TerminalIcon, Play, RotateCcw, Check, Copy } from "lucide-react";

export default function InteractiveTerminal({ task, courseTitle }) {
  const [history, setHistory] = useState([
    {
      type: "system",
      text: `[CyberSNova Virtual Sandbox v2.4 initialized]\nTarget Environment: Isolated Cyber Lab · Course: ${courseTitle || "Security Lab"}\nType 'help' for available system commands or run the recommended lab command.`,
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCommand = (cmdToRun) => {
    const raw = cmdToRun !== undefined ? cmdToRun : inputVal;
    const trimmed = raw.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: "input", text: `root@cybersnova-lab:~# ${trimmed}` }];

    if (trimmed.toLowerCase() === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    if (trimmed.toLowerCase() === "help") {
      newHistory.push({
        type: "output",
        text: "Available commands:\n  help           Display this help manual\n  clear          Clear the console screen\n  whoami         Display current user credentials\n  lab-info       Show current lab scenario details\n  [lab-command]  Execute the required task command",
      });
    } else if (trimmed.toLowerCase() === "whoami") {
      newHistory.push({
        type: "output",
        text: "faisal_khan (Security Architect · CyberSNova Academy ID #9482)",
      });
    } else if (trimmed.toLowerCase() === "lab-info") {
      newHistory.push({
        type: "output",
        text: `Target: ${task?.prompt || "Standard lab target"}\nCommand to run: ${task?.command || "nmap -sS target.internal"}`,
      });
    } else if (task && (trimmed === task.command.trim() || trimmed.includes(task.command.split(" ")[0]))) {
      newHistory.push({
        type: "output",
        text: task.output,
      });
      newHistory.push({
        type: "success",
        text: "✔ Task execution succeeded! Output matched target vulnerability baseline.",
      });
    } else {
      newHistory.push({
        type: "error",
        text: `bash: ${trimmed}: command unrecognized in restricted sandbox. Try typing: ${task?.command || "help"}`,
      });
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand();
    }
  };

  const handleAutoFill = () => {
    if (task?.command) {
      setInputVal(task.command);
    }
  };

  const handleCopyCommand = () => {
    if (task?.command) {
      navigator.clipboard?.writeText(task.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="terminal-title">
          <TerminalIcon size={14} />
          <span>cybersnova-sandbox: bash</span>
        </div>
        <div className="terminal-actions">
          <button
            className="terminal-btn"
            onClick={() => setHistory([])}
            title="Clear terminal"
          >
            <RotateCcw size={13} /> Clear
          </button>
        </div>
      </div>

      {task && (
        <div className="terminal-task-banner">
          <div className="task-info">
            <span className="task-badge">TASK</span>
            <span className="task-text">{task.prompt}</span>
          </div>
          <div className="task-actions">
            <button className="auto-fill-btn" onClick={handleAutoFill}>
              <Play size={12} /> Fill Command
            </button>
            <button className="copy-cmd-btn" onClick={handleCopyCommand}>
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <div className="terminal-body">
        {history.map((line, idx) => (
          <div key={idx} className={`terminal-line terminal-${line.type}`}>
            <pre>{line.text}</pre>
          </div>
        ))}

        <div className="terminal-prompt-line">
          <span className="prompt-prefix">root@cybersnova-lab:~#</span>
          <input
            type="text"
            className="terminal-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={task ? `Press Enter or run: ${task.command}` : "Type a command..."}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
