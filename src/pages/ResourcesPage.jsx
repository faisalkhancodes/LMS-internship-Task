import React, { useState } from "react";
import {
  Library,
  FileText,
  Download,
  ArrowUpRight,
  ShieldCheck,
  BrainCircuit,
  Zap,
  Code2,
  Sparkles,
} from "lucide-react";
import { useLearning } from "../context/LearningContext";

export default function ResourcesPage({ onOpenResource }) {
  const { resources, addToast } = useLearning();
  const [filterCat, setFilterCat] = useState("All");

  const categories = ["All", "Security", "Software", "AI & Data", "Cloud"];

  const filtered = resources.filter(
    (r) => filterCat === "All" || r.category === filterCat
  );

  const getIcon = (cat) => {
    switch (cat) {
      case "Security":
        return <ShieldCheck size={22} />;
      case "AI & Data":
        return <BrainCircuit size={22} />;
      case "Cloud":
        return <Zap size={22} />;
      default:
        return <Code2 size={22} />;
    }
  };

  const handleDirectDownload = (e, resource) => {
    e.stopPropagation();
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
    addToast("Resource Downloaded", `Downloaded ${resource.title}.`, "success");
  };

  return (
    <div className="resources-page">
      <div className="resources-intro-hero">
        <div className="resource-hero-icon">
          <Library size={32} />
        </div>
        <div className="resource-hero-content">
          <h2>Engineering & Security Study Library</h2>
          <p>
            Field-tested checklists, distributed system blueprints, OWASP vulnerability cheat sheets, and LLM architecture guides.
          </p>
          <div className="resource-count-badge">
            <FileText size={15} /> {resources.length} guides and reference templates
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="category-tabs resources-filter-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-tab ${filterCat === cat ? "category-tab-active" : ""}`}
            onClick={() => setFilterCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource Grid */}
      <div className="resource-list-grid">
        {filtered.map((resource) => (
          <article
            className="resource-card-adv"
            key={resource.id}
            onClick={() => onOpenResource(resource)}
          >
            <div className="resource-card-top">
              <div className="resource-icon-adv">{getIcon(resource.category)}</div>
              <div className="resource-category-pill">{resource.category}</div>
            </div>

            <div className="resource-card-body">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
            </div>

            <div className="resource-card-footer">
              <span className="resource-meta-tag">
                {resource.type} · {resource.size}
              </span>
              <div className="resource-actions-group">
                <button
                  className="icon-button resource-download-btn"
                  title="Direct Download"
                  onClick={(e) => handleDirectDownload(e, resource)}
                >
                  <Download size={16} />
                </button>
                <button className="button button-secondary read-guide-btn">
                  Read Guide <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
