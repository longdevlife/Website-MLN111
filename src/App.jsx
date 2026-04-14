import { useState } from "react";
import { BookPage } from "./book/BookPage";
import { GamePage } from "./game/GamePage";

const TABS = [
  { id: "book", label: "Sách 3D" },
  { id: "game", label: "Quiz Game" },
];

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return TABS.find((t) => t.id === hash) ? hash : "book";
  });

  const handleTabChange = (id) => {
    setActiveTab(id);
    window.location.hash = id;
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Tab Navigation Bar */}
      <nav style={navStyle}>
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
  paddingTop: "12px",
};

const navInner = {
  display: "flex",
  gap: "4px",
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  borderRadius: "14px",
  padding: "4px",
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
