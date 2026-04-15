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
      {/* Tab Content */}
      <div style={{ width: "100%", height: "100%" }}>
        {activeTab === "book" && <BookPage />}
        {activeTab === "game" && <GamePage />}
      </div>
    </div>
  );
}

/* ── Inline Styles ─────────────────────────── */
export default App;
