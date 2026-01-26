import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import Home from "../pages/Home/Home";
import Clients from "../pages/Clients/Clients";
import ClientDetail from "../pages/ClientDetail/ClientDetail";
import Retention from "../pages/Retention/Retention";
import Settings from "../pages/Settings/Settings";

export default function AppRouter() {
return (
<Routes>
    <Route element={<AppLayout />}>
{/* Redirección default */}
<Route path="/" element={<Navigate to="/home" replace />} />

{/* Rutas principales */}
<Route path="/home" element={<Home />} />
<Route path="/clients" element={<Clients />} />
<Route path="/clients/:clientId" element={<ClientDetail />} />
<Route path="/retention" element={<Retention />} />
<Route path="/settings" element={<Settings />} />


{/* 404 */}
<Route path="*" element={<div style={{ padding: 24 }}>404 - Not found</div>} />
    </Route>
</Routes>
);
}