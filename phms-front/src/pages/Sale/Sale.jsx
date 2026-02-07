import React from "react";
import "./Sale.css";
import {
    MdAdd,
    MdSearch,
    MdFilterList,
    MdDownload,
    MdEdit,
    MdDelete,
    MdVisibility,
    MdReceipt,
    MdAttachMoney,
    MdTrendingUp,
    MdPeople,
} from "react-icons/md";

const Sale = () => {
    return (
        <div className="sale">
            {/* Header */}
            <div className="sales-header">
                <div className="header-content">
                    <h1>Sales Management</h1>
                    <p>Track and manage all pharmacy sales transactions</p>
                </div>
                <button className="new-sale-btn">
                    <MdAdd className="btn-icon" />
                    New Sale
                </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon total">
                        <MdReceipt />
                    </div>
                    <div className="stat-content">
                        <h3>Total Sales</h3>
                        <p className="stat-number">2</p>
                        <p className="stat-change">Today</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon revenue">
                        <MdAttachMoney />
                    </div>
                    <div className="stat-content">
                        <h3>Total Revenue</h3>
                        <p className="stat-number">$228.25</p>
                        <p className="stat-change">This week</p>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className="controls-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by invoice # or customer..."
                        className="search-input"
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <label>Sale Status</label>
                        <select className="filter-select">
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Date Range</label>
                        <select className="filter-select">
                            <option value="today">Today</option>
                        </select>
                    </div>

                    <button className="filter-btn">
                        <MdFilterList className="btn-icon" />
                        More Filters
                    </button>

                    <button className="export-btn">
                        <MdDownload className="btn-icon" />
                        Export Sales
                    </button>
                </div>
            </div>

            {/* Sales Table */}
            <div className="sales-table-container">
                <div className="table-header">
                    <h3>Recent Sales (2)</h3>
                </div>

                <table className="sales-table">
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Payment Method</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>SALE-2024-001</td>
                            <td>John Smith</td>
                            <td>3 items</td>
                            <td>$85.50</td>
                            <td>01/20/24 10:30</td>
                            <td>Cash</td>
                            <td className="actions">
                                <button
                                    className="icon-btn view-btn"
                                    title="View Details"
                                >
                                    <MdVisibility />
                                </button>
                                <button
                                    className="icon-btn edit-btn"
                                    title="Edit Sale"
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    className="icon-btn delete-btn"
                                    title="Delete Sale"
                                >
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Sale;
