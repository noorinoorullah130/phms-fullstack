import React from "react";
import "./Stock.css";
import {
    MdAdd,
    MdSearch,
    MdFilterList,
    MdDownload,
    MdEdit,
    MdDelete,
} from "react-icons/md";
import Pagination from "../../components/Pagination/Pagination";

const Stock = () => {
    return (
        <div className="stock">
            {/* Header Section */}
            <div className="stock-header">
                <div className="header-content">
                    <h1>Inventory Management</h1>
                    <p>Monitor and manage your pharmacy stock levels</p>
                </div>
                <button className="add-stock-btn">
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
                        <p className="stat-number">2</p>
                        <p className="stat-change">Active in inventory</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon critical">⚠️</div>
                    <div className="stat-content">
                        <h3>Critical Stock</h3>
                        <p className="stat-number">1</p>
                        <p className="stat-change">Needs immediate attention</p>
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
                        className="search-input"
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <label>Category</label>
                        <select className="filter-select">
                            <option value="all">All Categories</option>
                            <option value="Antibiotic">Antibiotic</option>
                            <option value="Pain Relief">Pain Relief</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Stock Status</label>
                        <select className="filter-select">
                            <option value="all">All Status</option>
                            <option value="good">In Stock</option>
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
                    <h3>Current Stock (2 items)</h3>
                </div>

                <table className="stock-table">
                    <thead>
                        <tr className="header-row">
                            <th>Medicine Name</th>
                            <th>Category</th>
                            <th>Current Stock</th>
                            <th>Min Stock</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Item 1 */}
                        <tr>
                            <td>Paracetamol 500mg</td>
                            <td>Pain Relief</td>
                            <td>150</td>
                            <td>50</td>
                            <td>2024-12-31</td>
                            <td>In Stock</td>
                            <td className="actions">
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
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Pagination */}
                <Pagination />
            </div>
        </div>
    );
};

export default Stock;
