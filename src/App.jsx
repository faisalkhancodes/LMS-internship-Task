import React, { useState } from "react";
import { LearningProvider, useLearning } from "./context/LearningContext";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import NotificationToast from "./components/NotificationToast";
import CommandPalette from "./components/CommandPalette";
import CourseModal from "./components/CourseModal";
import CertificateModal from "./components/CertificateModal";
import ResourceModal from "./components/ResourceModal";
import ProfileModal from "./components/ProfileModal";

import DashboardPage from "./pages/DashboardPage";
import CatalogPage from "./pages/CatalogPage";
import MyLearningPage from "./pages/MyLearningPage";
import ResourcesPage from "./pages/ResourcesPage";
import CertificatesPage from "./pages/CertificatesPage";
import AchievementsPage from "./pages/AchievementsPage";

import { Sparkles, TrendingUp } from "lucide-react";

const pageTitles = {
  dashboard: "Overview Workspace",
  catalog: "Course & Lab Catalog",
  learning: "My Learning Paths",
  resources: "Study Resource Library",
  certificates: "Official Certificates",
  achievements: "Cyber Badges & Progression",
};

function AppShell() {
  const { courses, theme, stats } = useLearning();

  const [currentPage, setCurrentPage] = useState("dashboard");
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [activeCertificateCourse, setActiveCertificateCourse] = useState(null);
  const [activeResource, setActiveResource] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCourse = courses.find((c) => c.id === activeCourseId);

  const handleOpenCourse = (course) => {
    setActiveCourseId(course.id);
  };

  const handleOpenCertificate = (course) => {
    setActiveCertificateCourse(course);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (currentPage !== "catalog" && query.trim()) {
      setCurrentPage("catalog");
    }
  };

  return (
    <div className={`app-shell ${theme === "dark" ? "dark-mode" : ""}`}>
      {/* Sidebar Navigation */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
        menuOpen={mobileMenuOpen}
        onCloseMenu={() => setMobileMenuOpen(false)}
        onOpenProfile={() => setProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="main-area">
        <Topbar
          pageTitle={pageTitles[currentPage] || "Academy"}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onOpenMenu={() => setMobileMenuOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenProfile={() => setProfileOpen(true)}
        />

        <div className="page-content">
          <div className="page-heading">
            <div>
              <span className="eyebrow">
                {currentPage === "dashboard" ? "CYBERSNOVA ENGINEERING WORKSPACE" : "CYBERSNOVA ACADEMY"}
              </span>
              <h1>{pageTitles[currentPage]}</h1>
              <p>
                {currentPage === "dashboard" && "A little deliberate practice each day compounds into elite engineering capability."}
                {currentPage === "catalog" && "Master offensive cybersecurity, high-scale architectures, and applied neural networks."}
                {currentPage === "learning" && "Track your modules, resume hands-on labs, and review completed specializations."}
                {currentPage === "resources" && "Downloadable blueprints, incident checklists, and cloud architecture templates."}
                {currentPage === "certificates" && "Official cryptographically verified credentials issued by CyberSNova Academy."}
                {currentPage === "achievements" && "Track your XP gains, engineering tier progression, and unlockable badges."}
              </p>
            </div>

            {currentPage !== "dashboard" && (
              <div className="overall-progress">
                <span className="overall-icon">
                  <TrendingUp size={17} />
                </span>
                <span>
                  <small>Academy Mastery</small>
                  <strong>{stats.overallProgress}%</strong>
                </span>
              </div>
            )}
          </div>

          {/* Page Routing */}
          {currentPage === "dashboard" && (
            <DashboardPage
              onOpenCourse={handleOpenCourse}
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === "catalog" && (
            <CatalogPage
              onOpenCourse={handleOpenCourse}
              initialQuery={searchQuery}
            />
          )}

          {currentPage === "learning" && (
            <MyLearningPage
              onOpenCourse={handleOpenCourse}
              onOpenCertificate={handleOpenCertificate}
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === "resources" && (
            <ResourcesPage onOpenResource={setActiveResource} />
          )}

          {currentPage === "certificates" && (
            <CertificatesPage
              onOpenCertificate={handleOpenCertificate}
              onNavigate={setCurrentPage}
            />
          )}

          {currentPage === "achievements" && (
            <AchievementsPage onOpenProfile={() => setProfileOpen(true)} />
          )}

          {/* Footer */}
          <footer className="page-footer">
            <span>© 2026 CyberSNova Academy · Advanced Engineering & Security LMS</span>
            <span>
              Engineered for practitioners pushing the frontier of tech <Sparkles size={13} />
            </span>
          </footer>
        </div>
      </main>

      {/* Modals & Overlays */}
      {activeCourse && (
        <CourseModal
          course={activeCourse}
          onClose={() => setActiveCourseId(null)}
          onOpenCertificate={handleOpenCertificate}
        />
      )}

      {activeCertificateCourse && (
        <CertificateModal
          course={activeCertificateCourse}
          onClose={() => setActiveCertificateCourse(null)}
        />
      )}

      {activeResource && (
        <ResourceModal
          resource={activeResource}
          onClose={() => setActiveResource(null)}
        />
      )}

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={(val) => setCommandPaletteOpen(typeof val === "boolean" ? val : false)}
        onSelectCourse={handleOpenCourse}
        onSelectPage={setCurrentPage}
        onSelectResource={setActiveResource}
      />

      {/* Global Notifications Toast */}
      <NotificationToast />
    </div>
  );
}

export default function App() {
  return (
    <LearningProvider>
      <AppShell />
    </LearningProvider>
  );
}
