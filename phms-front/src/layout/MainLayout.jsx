import React from "react";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <div className="main-layout">
            <Header />
            <div className="main-content">
                <Sidebar />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
