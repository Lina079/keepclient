import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function AppLayout() {
  return (
    <div className="app-layout">
      {/* SIDEBAR IZQUIERDO */}
      <Sidebar />

      {/* CONTENIDO PRINCIPAL */}
      <div className="app-layout__content">
        <main className="app-layout__main">
          <Outlet />
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer__inner">
            <div className="footer__brand">
              <span className="footer__dot" aria-hidden="true" />
              <span>KeepClient · © 2026 by Lina Castro</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}