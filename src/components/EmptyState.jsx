import React from "react";
import { ArrowRight } from "lucide-react";

export default function EmptyState({ icon: Icon, title, description, action, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon size={26} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action && (
        <button className="button button-primary" onClick={onAction}>
          {action}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
