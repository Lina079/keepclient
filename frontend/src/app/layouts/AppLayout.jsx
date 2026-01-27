// src/app/AppLayout.jsx
import { Outlet } from "react-router-dom";


export default function AppLayout() {
  return (
    <div className="app-layout">
      <main className="app-layout__main">
      <Outlet />
      </main>
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__dot" aria-hidden="true" />
            <span>KeepClient · © 2026 by Lina Castro</span>
          </div>
        </div>
      </footer>
    </div>
  );
}