import React, { useState } from "react";

import "./Stock.css";
import {
    MdSearch,
    MdFilterList,
    MdDownload,
    MdAdd,
    MdWarning,
    MdEdit,
    MdDelete,
} from "react-icons/md";
import AddStockModal from "../../components/AddStockModal/AddStockModal";

const Stock = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [stockStatus, setStockStatus] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sample stock data
    const stockItems = [
        {
            id: 1,
            name: "Paracetamol 500mg",
            category: "Pain Relief",
            currentStock: 150,
            minStock: 50,
            expiryDate: "2024-12-31",
            status: "good",
        },
        {
            id: 2,
            name: "Amoxicillin 250mg",
            category: "Antibiotic",
            currentStock: 25,
            minStock: 100,
            expiryDate: "2024-10-15",
            status: "low",
        },
        {
            id: 3,
            name: "Metformin 500mg",
            category: "Diabetic",
            currentStock: 80,
            minStock: 30,
            expiryDate: "2025-03-20",
            status: "good",
        },
        {
            id: 4,
            name: "Atorvastatin 20mg",
            category: "Cholesterol",
            currentStock: 15,
            minStock: 40,
            expiryDate: "2024-11-30",
            status: "critical",
        },
        {
            id: 5,
            name: "Omeprazole 20mg",
            category: "Acid Reducer",
            currentStock: 120,
            minStock: 50,
            expiryDate: "2025-06-30",
            status: "good",
        },
        {
            id: 6,
            name: "Ibuprofen 400mg",
            category: "Pain Relief",
            currentStock: 35,
            minStock: 60,
            expiryDate: "2024-09-25",
            status: "low",
        },
        {
            id: 7,
            name: "Lisinopril 10mg",
            category: "Blood Pressure",
            currentStock: 95,
            minStock: 40,
            expiryDate: "2025-02-15",
            status: "good",
        },
        {
            id: 8,
            name: "Salbutamol Inhaler",
            category: "Respiratory",
            currentStock: 8,
            minStock: 25,
            expiryDate: "2024-08-10",
            status: "critical",
        },
    ];

    const categories = [
        "all",
        "Pain Relief",
        "Antibiotic",
        "Diabetic",
        "Cholesterol",
        "Acid Reducer",
        "Blood Pressure",
        "Respiratory",
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "critical":
                return "#ef4444";
            case "low":
                return "#f59e0b";
            case "good":
                return "#10b981";
            default:
                return "#6b7280";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "critical":
                return "Critical";
            case "low":
                return "Low Stock";
            case "good":
                return "In Stock";
            default:
                return "Unknown";
        }
    };

    const filteredItems = stockItems.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" || item.category === selectedCategory;
        const matchesStatus =
            stockStatus === "all" || item.status === stockStatus;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const totalItems = stockItems.length;
    const criticalItems = stockItems.filter(
        (item) => item.status === "critical",
    ).length;
    const lowStockItems = stockItems.filter(
        (item) => item.status === "low",
    ).length;
    const totalValue = stockItems.reduce(
        (sum, item) => sum + item.currentStock * 5,
        0,
    ); // Sample calculation

    const handleAddStock = (stockData) => {
        // Handle adding stock
        console.log("Adding stock:", stockData);
    };

    return (
        <div className="stock">
            {/* Header Section */}
            <div className="stock-header">
                <div className="header-content">
                    <h1>Inventory Management</h1>
                    <p>Monitor and manage your pharmacy stock levels</p>
                </div>
                <button
                    className="add-stock-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    <MdAdd className="btn-icon" />
                    Add New Stock
                </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon total">📦</div>
                    <div className="stat-content">
                        <h3>Total Items</h3>
                        <p className="stat-number">{totalItems}</p>
                        <p className="stat-change">Active in inventory</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-card critical">
                        <div className="stat-icon critical">⚠️</div>
                        <div className="stat-content">
                            <h3>Critical Stock</h3>
                            <p className="stat-number">{criticalItems}</p>
                            <p className="stat-change">
                                Needs immediate attention
                            </p>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-card low">
                        <div className="stat-icon low">📉</div>
                        <div className="stat-content">
                            <h3>Low Stock</h3>
                            <p className="stat-number">{lowStockItems}</p>
                            <p className="stat-change">Need reordering</p>
                        </div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-card value">
                        <div className="stat-icon value">💰</div>
                        <div className="stat-content">
                            <h3>Total Value</h3>
                            <p className="stat-number">
                                ${totalValue.toLocaleString()}
                            </p>
                            <p className="stat-change">Current stock worth</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className="controls-section">
                <div className="search-box">
                    <MdSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search medicines..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <label>Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                            className="filter-select"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === "all" ? "All Categories" : cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Stock Status</label>
                        <select
                            value={stockStatus}
                            onChange={(e) => setStockStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Status</option>
                            <option value="good">In Stock</option>
                            <option value="low">Low Stock</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>

                    <button className="filter-btn">
                        <MdFilterList className="btn-icon" />
                        More Filters
                    </button>

                    <button className="export-btn">
                        <MdDownload className="btn-icon" />
                        Export
                    </button>
                </div>
            </div>

            {/* Stock Table */}
            <div className="stock-table-container">
                <div className="table-header">
                    <h3>Current Stock ({filteredItems.length} items)</h3>
                    <div className="table-actions">
                        <button className="action-btn edit">Bulk Edit</button>
                        <button className="action-btn delete">
                            Delete Selected
                        </button>
                    </div>
                </div>

                <div className="stock-table">
                    <div className="table-row header-row">
                        <div className="table-cell">Medicine Name</div>
                        <div className="table-cell">Category</div>
                        <div className="table-cell">Current Stock</div>
                        <div className="table-cell">Min Stock</div>
                        <div className="table-cell">Expiry Date</div>
                        <div className="table-cell">Status</div>
                        <div className="table-cell">Actions</div>
                    </div>

                    {filteredItems.map((item) => (
                        <div key={item.id} className="table-row">
                            <div className="table-cell medicine-name">
                                <div className="medicine-info">
                                    <span className="medicine-icon">💊</span>
                                    <span>{item.name}</span>
                                </div>
                            </div>
                            <div className="table-cell">{item.category}</div>
                            <div className="table-cell">
                                <div className="stock-count">
                                    {item.currentStock}
                                    {item.currentStock <= item.minStock && (
                                        <MdWarning className="warning-icon" />
                                    )}
                                </div>
                            </div>
                            <div className="table-cell">{item.minStock}</div>
                            <div className="table-cell expiry-date">
                                {item.expiryDate}
                                {new Date(item.expiryDate) <
                                    new Date(
                                        Date.now() + 30 * 24 * 60 * 60 * 1000,
                                    ) && (
                                    <span className="expiry-warning">Soon</span>
                                )}
                            </div>
                            <div className="table-cell">
                                <span
                                    className="status-badge"
                                    style={{
                                        backgroundColor: getStatusColor(
                                            item.status,
                                        ),
                                    }}
                                >
                                    {getStatusText(item.status)}
                                </span>
                            </div>
                            <div className="table-cell actions">
                                <button
                                    className="icon-btn edit-btn"
                                    title="Edit"
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    className="icon-btn delete-btn"
                                    title="Delete"
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="no-results">
                        <p>No stock items found matching your criteria.</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="pagination">
                    <button className="page-btn prev">Previous</button>
                    <div className="page-numbers">
                        <span className="page-number active">1</span>
                        <span className="page-number">2</span>
                        <span className="page-number">3</span>
                        <span className="dots">...</span>
                        <span className="page-number">10</span>
                    </div>
                    <button className="page-btn next">Next</button>
                </div>
            </div>

            {/* Modal */}
            <AddStockModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddStock={handleAddStock}
            />
        </div>
    );
};

export default Stock;
