import React from "react";

import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Pharmacy Dashboard</h2>
                <p>Welcome back! Here's today's overview</p>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📋</div>
                    <div className="stat-content">
                        <h3>Today's Prescriptions</h3>
                        <p className="stat-number">42</p>
                        <p className="stat-change">+5 from yesterday</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-content">
                        <h3>Low Stock Items</h3>
                        <p className="stat-number">8</p>
                        <p className="stat-change">Needs attention</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-content">
                        <h3>Today's Revenue</h3>
                        <p className="stat-number">$2,845</p>
                        <p className="stat-change">+12% from average</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                        <h3>Patients Today</h3>
                        <p className="stat-number">28</p>
                        <p className="stat-change">+3 from yesterday</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="dashboard-main">
                {/* Left Column */}
                <div className="dashboard-left">
                    {/* Pending Prescriptions */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3>Pending Prescriptions</h3>
                            <button className="view-all">View All →</button>
                        </div>
                        <div className="prescriptions-list">
                            {[
                                {
                                    id: 1,
                                    patient: "John Smith",
                                    medication: "Amoxicillin",
                                    time: "10:30 AM",
                                    status: "pending",
                                },
                                {
                                    id: 2,
                                    patient: "Sarah Johnson",
                                    medication: "Lisinopril",
                                    time: "11:15 AM",
                                    status: "ready",
                                },
                                {
                                    id: 3,
                                    patient: "Mike Brown",
                                    medication: "Metformin",
                                    time: "12:00 PM",
                                    status: "pending",
                                },
                                {
                                    id: 4,
                                    patient: "Lisa Wilson",
                                    medication: "Atorvastatin",
                                    time: "1:45 PM",
                                    status: "pending",
                                },
                            ].map((item) => (
                                <div
                                    key={item.id}
                                    className="prescription-item"
                                >
                                    <div className="prescription-info">
                                        <div className="patient-name">
                                            {item.patient}
                                        </div>
                                        <div className="medication">
                                            {item.medication}
                                        </div>
                                    </div>
                                    <div className="prescription-time">
                                        <div className="time">{item.time}</div>
                                        <div
                                            className={`status ${item.status}`}
                                        >
                                            {item.status}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Low Stock Alert */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3>Low Stock Alert</h3>
                            <span className="alert-count">8 items</span>
                        </div>
                        <div className="stock-list">
                            {[
                                {
                                    id: 1,
                                    item: "Paracetamol 500mg",
                                    stock: 15,
                                    min: 50,
                                },
                                {
                                    id: 2,
                                    item: "Ibuprofen 400mg",
                                    stock: 22,
                                    min: 50,
                                },
                                {
                                    id: 3,
                                    item: "Omeprazole 20mg",
                                    stock: 18,
                                    min: 30,
                                },
                            ].map((item) => (
                                <div key={item.id} className="stock-item">
                                    <div className="stock-info">
                                        <div className="item-name">
                                            {item.item}
                                        </div>
                                        <div className="stock-level">
                                            Stock: {item.stock}
                                        </div>
                                    </div>
                                    <button className="order-btn">Order</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="dashboard-right">
                    {/* Quick Actions */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3>Quick Actions</h3>
                        </div>
                        <div className="quick-actions">
                            <button className="action-btn">
                                <span className="action-icon">➕</span>
                                <span className="action-text">
                                    New Prescription
                                </span>
                            </button>
                            <button className="action-btn">
                                <span className="action-icon">📦</span>
                                <span className="action-text">Add Stock</span>
                            </button>
                            <button className="action-btn">
                                <span className="action-icon">👥</span>
                                <span className="action-text">Add Patient</span>
                            </button>
                            <button className="action-btn">
                                <span className="action-icon">📊</span>
                                <span className="action-text">
                                    Generate Report
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h3>Recent Activity</h3>
                        </div>
                        <div className="activity-list">
                            {[
                                {
                                    id: 1,
                                    action: "Prescription filled",
                                    user: "Dr. Smith",
                                    time: "2 mins ago",
                                },
                                {
                                    id: 2,
                                    action: "Stock added",
                                    user: "Admin",
                                    time: "15 mins ago",
                                },
                                {
                                    id: 3,
                                    action: "Patient registered",
                                    user: "Reception",
                                    time: "1 hour ago",
                                },
                                {
                                    id: 4,
                                    action: "Report generated",
                                    user: "Manager",
                                    time: "2 hours ago",
                                },
                            ].map((item) => (
                                <div key={item.id} className="activity-item">
                                    <div className="activity-icon">●</div>
                                    <div className="activity-content">
                                        <div className="activity-action">
                                            {item.action}
                                        </div>
                                        <div className="activity-meta">
                                            <span className="activity-user">
                                                {item.user}
                                            </span>
                                            <span className="activity-time">
                                                {item.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
