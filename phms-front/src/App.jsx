import React from "react";

import { Navigate, Route, Routes } from "react-router";

import Login from "./pages/Login/Login";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Medicine from "./pages/Medicine/Medicine";
import Stock from "./pages/Stock/Stock";
import Purchase from "./pages/Purchase/Purchase";
import Sale from "./pages/Sale/Sale";
import Reports from "./pages/Reports/Reports";
import Staff from "./pages/Staff/Staff";
import Billing from "./pages/Billing/Billing";
import Settings from "./pages/Settings/Settings";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/app" element={<MainLayout />}>
                    <Route
                        index
                        element={<Navigate to="dashboard" replace />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="medicine" element={<Medicine />} />
                    <Route path="stock" element={<Stock />} />
                    <Route path="purchase" element={<Purchase />} />
                    <Route path="sales" element={<Sale />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="staff" element={<Staff />} />
                    <Route path="billing" element={<Billing />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
