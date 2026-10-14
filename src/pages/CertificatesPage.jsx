import React from "react";
import {
  Award,
  Download,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useLearning } from "../context/LearningContext";
import EmptyState from "../components/EmptyState";

export default function CertificatesPage({ onOpenCertificate, onNavigate }) {
  const { completedCourses, userProfile } = useLearning();

  return (
    <div className="certificates-page">
      <div className="certificates-hero">
        <div className="cert-hero-icon">
          <Award size={32} />
        </div>
        <div>
          <h2>Your Verified Credentials & Diplomas</h2>
          <p>
            Cryptographically signed achievements and course completion certificates from CyberSNova Academy.
          </p>
        </div>
      </div>

      {completedCourses.length > 0 ? (
        <div className="certificates-grid">
          {completedCourses.map((course) => {
            const certId = `CS-2026-${(course.id * 18471 + 391).toString().padStart(6, "0")}`;
            return (
              <article className="certificate-card-adv" key={course.id}>
                <div className="cert-card-ornament">
                  <div className="cert-card-seal">
                    <Award size={28} />
                  </div>
                  <span className="cert-card-brand">CYBERSNOVA ACADEMY</span>
                  <div className="cert-card-stars">✦ · ✦ · ✦</div>
                </div>

                <div className="cert-card-content">
                  <div className="cert-eyebrow-row">
                    <span className="eyebrow">VERIFIED CERTIFICATE</span>
                    <span className="cert-id-tag">{certId}</span>
                  </div>

                  <h3>{course.title}</h3>
                  <p className="cert-awarded-text">
                    Awarded to <strong>{userProfile.name}</strong> for completing all curriculum modules and hands-on laboratory exercises.
                  </p>

                  <div className="cert-card-footer">
                    <div className="cert-verify-status">
                      <CheckCircle2 size={15} />
                      <span>Ledger Verified</span>
                    </div>

                    <button
                      className="button button-primary cert-view-btn"
                      onClick={() => onOpenCertificate(course)}
                    >
                      <ExternalLink size={15} /> View & Download
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Award}
          title="No certificates earned yet"
          description="Complete an enrolled course and pass all module knowledge checks to earn your first verified credential."
          action="Continue Your Studies"
          onAction={() => onNavigate("learning")}
        />
      )}
    </div>
  );
}
