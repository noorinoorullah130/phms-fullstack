import React from "react";

import "./Sidebar.css";
import { NavLink } from "react-router";
import {
    MdDashboard,
    MdLocalPharmacy,
    MdInventory,
    MdShoppingCart,
    MdSell,
    MdAssessment,
    MdPeople,
    MdReceipt,
    MdSettings,
    MdHelp,
    MdLogout,
} from "react-icons/md";

const Sidebar = () => {
    const menuItems = [
        {
            id: "dashboard",
            icon: <MdDashboard />,
            label: "Dashboard",
            path: "dashboard",
        },
        {
            id: "medicine",
            icon: <MdLocalPharmacy />,
            label: "Medicines",
            path: "medicine",
        },
        {
            id: "stock",
            icon: <MdInventory />,
            label: "Stock",
            path: "stock",
        },
        {
            id: "purchase",
            icon: <MdShoppingCart />,
            label: "Purchase",
            path: "purchase",
        },
        {
            id: "sales",
            icon: <MdSell />,
            label: "Sales",
            path: "sales",
        },
        {
            id: "reports",
            icon: <MdAssessment />,
            label: "Reports",
            path: "reports",
        },
        {
            id: "staff",
            icon: <MdPeople />,
            label: "Staff",
            path: "staff",
        },
        {
            id: "billing",
            icon: <MdReceipt />,
            label: "Billing",
            path: "billing",
        },
        {
            id: "settings",
            icon: <MdSettings />,
            label: "Settings",
            path: "settings",
        },
        {
            id: "help",
            icon: <MdHelp />,
            label: "Help",
            path: "help",
        },
    ];

    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logging out...");
        // Example: localStorage.removeItem("token");
        // navigate("/login");
    };

    return (
        <aside className="sidebar">
            {/* Navigation Menu */}
            <nav className="sidebar-nav">
                <div className="nav-section">
                    <h3 className="section-title">MAIN MENU</h3>
                    <ul className="nav-menu">
                        {menuItems.slice(0, 8).map((item) => (
                            <li key={item.id}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                >
                                    <span className="nav-icon">
                                        {item.icon}
                                    </span>
                                    <span className="nav-label">
                                        {item.label}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="nav-section">
                    <h3 className="section-title">SYSTEM</h3>
                    <ul className="nav-menu">
                        {menuItems.slice(8).map((item) => (
                            <li key={item.id}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "nav-link active"
                                            : "nav-link"
                                    }
                                >
                                    <span className="nav-icon">
                                        {item.icon}
                                    </span>
                                    <span className="nav-label">
                                        {item.label}
                                    </span>
                                </NavLink>
                            </li>
                        ))}
                        {/* Logout Button */}
                        <li>
                            <button
                                className="nav-link logout-btn"
                                onClick={handleLogout}
                            >
                                <span className="nav-icon">
                                    <MdLogout />
                                </span>
                                <span className="nav-label">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
