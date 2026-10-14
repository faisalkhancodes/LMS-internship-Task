import React, { useState } from "react";
import {
  X,
  Award,
  Download,
  Printer,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  QrCode,
  Check,
} from "lucide-react";
import { useLearning } from "../context/LearningContext";

export default function CertificateModal({ course, onClose }) {
  const { userProfile, addToast } = useLearning();
  const [copiedLink, setCopiedLink] = useState(false);

  if (!course) return null;

  const certId = `CS-2026-${(course.id * 18471 + 391).toString().padStart(6, "0")}`;
  const issueDate = "October 15, 2026";

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CyberSNova Academy Certificate - ${course.title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Manrope:wght@400;600;700&display=swap');
    body {
      margin: 0;
      padding: 40px;
      background: #0f111a;
      font-family: 'Manrope', sans-serif;
      color: #e2e8f0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .cert-frame {
      max-width: 900px;
      width: 100%;
      background: #161926;
      border: 12px double #6758e8;
      border-radius: 12px;
      padding: 60px 50px;
      text-align: center;
      box-shadow: 0 25px 60px rgba(0,0,0,0.6);
      position: relative;
    }
    .cert-brand {
      color: #8175ed;
      font-family: 'Cinzel', serif;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin-bottom: 24px;
    }
    .cert-title {
      font-family: 'Cinzel', serif;
      font-size: 38px;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 16px;
      letter-spacing: 1px;
    }
    .cert-sub {
      color: #94a3b8;
      font-size: 15px;
      margin-bottom: 24px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .cert-name {
      font-size: 42px;
      font-weight: 800;
      color: #a594fd;
      border-bottom: 2px solid #333954;
      display: inline-block;
      padding: 0 40px 10px;
      margin: 10px 0 24px;
    }
    .cert-desc {
      font-size: 16px;
      color: #cbd5e1;
      max-width: 600px;
      margin: 0 auto 30px;
      line-height: 1.6;
    }
    .cert-course {
      color: #38bdf8;
      font-weight: 700;
      font-size: 24px;
      display: block;
      margin-top: 10px;
    }
    .cert-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 50px;
      padding-top: 30px;
      border-top: 1px solid #282f49;
    }
    .cert-meta {
      text-align: left;
      font-size: 12px;
      color: #64748b;
      line-height: 1.6;
    }
    .cert-meta strong {
      color: #94a3b8;
    }
    .cert-seal {
      width: 80px;
      height: 80px;
      border: 2px dashed #8175ed;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #8175ed;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="cert-frame">
    <div class="cert-brand">CYBERSNOVA ACADEMY · GLOBAL CREDENTIAL</div>
    <h1 class="cert-title">Certificate of Completion</h1>
    <div class="cert-sub">This is proudly conferred upon</div>
    <div class="cert-name">${userProfile.name}</div>
    <p class="cert-desc">
      for demonstrating master-level proficiency and successful completion of all architectural modules and security labs in:
      <span class="cert-course">${course.title}</span>
    </p>
    <div class="cert-footer">
      <div class="cert-meta">
        <div><strong>Certificate ID:</strong> ${certId}</div>
        <div><strong>Issue Date:</strong> ${issueDate}</div>
        <div><strong>Status:</strong> Cryptographically Verified</div>
      </div>
      <div class="cert-seal">
        <span>CYBER</span>
        <span>SNOVA</span>
        <span>VERIFIED</span>
      </div>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CyberSNova-Certificate-${course.id}-${userProfile.name.replace(/\s+/g, "_")}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast("Certificate Downloaded", "Self-contained HTML certificate saved to your device.", "success");
  };

  const handleCopyLink = () => {
    const fakeUrl = `https://verify.cybersnova.academy/cert/${certId}`;
    navigator.clipboard?.writeText(fakeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
    addToast("Verification Link Copied", fakeUrl, "info");
  };

  return (
    <div className="modal-backdrop cert-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel cert-modal-panel" role="dialog" aria-modal="true">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close certificate">
          <X size={20} />
        </button>

        {/* Certificate Printable Canvas */}
        <div className="certificate-render-canvas" id="printable-certificate">
          <div className="cert-border-outer">
            <div className="cert-border-inner">
              {/* Header */}
              <div className="cert-header">
                <div className="cert-badge-crest">
                  <Award size={36} />
                </div>
                <div className="cert-subheading">CYBERSNOVA ACADEMY · GLOBAL CREDENTIAL</div>
                <h1 className="cert-main-title">Certificate of Completion</h1>
                <p className="cert-conferred-text">THIS CREDENTIAL IS PROUDLY CONFERRED UPON</p>
              </div>

              {/* Recipient */}
              <div className="cert-recipient-name">{userProfile.name}</div>

              {/* Body */}
              <p className="cert-achievement-text">
                for demonstrating technical excellence and successfully finishing all curriculum modules, practical hands-on labs, and knowledge verifications in
              </p>

              <div className="cert-course-name">{course.title}</div>

              {/* Bottom Metadata & Signatures */}
              <div className="cert-meta-grid">
                <div className="cert-meta-col">
                  <span className="cert-meta-label">INSTRUCTOR</span>
                  <strong className="cert-meta-val">{course.instructor}</strong>
                  <span className="cert-meta-sub">{course.role || "Lead Instructor"}</span>
                </div>

                <div className="cert-seal-col">
                  <div className="cert-official-seal">
                    <ShieldCheck size={26} />
                    <span>CYBERSNOVA</span>
                    <small>VERIFIED</small>
                  </div>
                </div>

                <div className="cert-meta-col cert-meta-right">
                  <span className="cert-meta-label">CREDENTIAL IDENTIFIER</span>
                  <strong className="cert-meta-val">{certId}</strong>
                  <span className="cert-meta-sub">Issued on {issueDate}</span>
                </div>
              </div>

              {/* Security Verification Bar */}
              <div className="cert-security-bar">
                <div className="cert-sec-left">
                  <CheckCircle2 size={15} />
                  <span>Verified Authenticity · CyberSNova Academy Blockchain Ledger</span>
                </div>
                <span className="cert-hash">SHA-256: 7f8a9b2c...4d1e</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="cert-actions-bar">
          <button className="button button-secondary" onClick={handleCopyLink}>
            {copiedLink ? <Check size={16} /> : <Share2 size={16} />}
            {copiedLink ? "Link Copied" : "Share Credential"}
          </button>

          <button className="button button-secondary" onClick={handlePrint}>
            <Printer size={16} /> Print / PDF
          </button>

          <button className="button button-primary" onClick={handleDownloadHtml}>
            <Download size={16} /> Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
