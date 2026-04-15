import { useState, useEffect } from "react";
import { BookPage } from "./book/BookPage";
import { GamePage } from "./game/GamePage";

const TABS = [
  { id: "book", label: "Sách 3D" },
  { id: "game", label: "Quiz Game" },
];

function getActiveTab() {
  const hash = window.location.hash.replace("#", "");
  const path = window.location.pathname.replace("/", "");
  const from = TABS.find(t => t.id === hash || t.id === path);
  return from ? from.id : "game";
}

function App() {
  const [activeTab, setActiveTab] = useState(getActiveTab);
  const [navHovered, setNavHovered] = useState(false);

  // React to browser back/forward and hash changes
  useEffect(() => {
    const onNav = () => setActiveTab(getActiveTab());
    window.addEventListener("hashchange", onNav);
    window.addEventListener("popstate", onNav);
    return () => {
      window.removeEventListener("hashchange", onNav);
      window.removeEventListener("popstate", onNav);
    };
  }, []);

  const handleTabChange = (id) => {
    setActiveTab(id);
    window.location.hash = id;
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Tab Navigation Bar – chỉ hiện ở trang Sách 3D */}
      {activeTab === "book" && (
        <>
          <nav
            style={{
              ...navStyle,
              opacity: navHovered ? 1 : 0,
              transform: `translateX(-50%) ${navHovered ? "translateY(0)" : "translateY(-8px)"}`,
              transition: "opacity 0.3s ease, transform 0.3s ease",
              pointerEvents: navHovered ? "auto" : "none",
            }}
            onMouseEnter={() => setNavHovered(true)}
            onMouseLeave={() => setNavHovered(false)}
          >
            <div style={navInner}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    ...tabBtn,
                    ...(activeTab === tab.id ? tabBtnActive : {}),
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Invisible hover trigger at top center */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "260px",
              height: "48px",
              zIndex: 999,
              cursor: "default",
            }}
            onMouseEnter={() => setNavHovered(true)}
            onMouseLeave={() => setNavHovered(false)}
          />
        </>
      )}

      {/* Tab Content */}
      <div style={{ width: "100%", height: "100%" }}>
        {activeTab === "book" && <BookPage />}
        {activeTab === "game" && <GamePage />}
      </div>
    </div>
  );
}

/* ── Inline Styles ─────────────────────────── */
const navStyle = {
  position: "fixed",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
};

const navInner = {
  display: "flex",
  gap: "4px",
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderRadius: "14px",
  padding: "4px",
  marginTop: "12px",
  border: "1px solid rgba(212,204,196,0.6)",
  boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
};

const tabBtn = {
  padding: "8px 20px",
  border: "none",
  borderRadius: "10px",
  background: "transparent",
  color: "#8B8680",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "Inter, sans-serif",
  letterSpacing: "0.3px",
  transition: "all 0.25s ease",
  whiteSpace: "nowrap",
};

const tabBtnActive = {
  background: "#1A1A1A",
  color: "#FAFAF8",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
};

export default App;
