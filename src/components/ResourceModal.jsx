import React, { useState, useEffect } from "react";
import {
  X,
  FileText,
  Download,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Clock,
  ShieldCheck,
  BrainCircuit,
  Code2,
  Zap,
} from "lucide-react";
import { useLearning } from "../context/LearningContext";

export default function ResourceModal({ resource, onClose }) {
  const { addToast } = useLearning();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!resource) return null;

  const handleCopy = () => {
    if (resource.content) {
      navigator.clipboard?.writeText(resource.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      addToast("Content Copied", "Resource reference copied to clipboard.", "info");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([resource.content || resource.description], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = resource.downloadFileName || `${resource.title.replace(/\s+/g, "-")}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast("Resource Downloaded", `Saved ${resource.title} to your downloads.`, "success");
  };

  const getIcon = () => {
    switch (resource.category) {
      case "Security":
        return <ShieldCheck size={28} />;
      case "AI & Data":
        return <BrainCircuit size={28} />;
      case "Cloud":
        return <Zap size={28} />;
      default:
        return <Code2 size={28} />;
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal-panel resource-modal-panel" role="dialog" aria-modal="true">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close resource modal">
          <X size={20} />
        </button>

        <div className="resource-modal-header">
          <div className="resource-modal-icon-badge">{getIcon()}</div>
          <div className="resource-modal-meta">
            <span className="eyebrow">
              {resource.type} · {resource.size} · {resource.readTime || "10 min read"}
            </span>
            <h2>{resource.title}</h2>
          </div>
        </div>

        <div className="resource-modal-body">
          <p className="resource-lead-desc">{resource.description}</p>

          <div className="resource-content-box">
            <div className="resource-content-top">
              <span>Study Document Preview</span>
              <div className="resource-content-actions">
                <button className="copy-code-btn" onClick={handleCopy}>
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy Reference"}
                </button>
                <button className="download-btn-mini" onClick={handleDownload}>
                  <Download size={12} /> Download .md
                </button>
              </div>
            </div>
            <pre className="resource-pre">
              <code>{resource.content || resource.description}</code>
            </pre>
          </div>

          <div className="resource-note-banner">
            <Sparkles size={18} />
            <span>
              Curated by CyberSNova security researchers. All field guides and attack blueprints are updated quarterly.
            </span>
          </div>
        </div>

        <div className="resource-modal-footer">
          <button className="button button-secondary" onClick={handleDownload}>
            <Download size={16} /> Save Offline Copy
          </button>
          <button className="button button-primary" onClick={onClose}>
            Done Reading <Check size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
