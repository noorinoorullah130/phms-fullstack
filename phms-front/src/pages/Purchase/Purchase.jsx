import React from "react";
import "./Purchase.css";
import {
    MdAdd,
    MdSearch,
    MdFilterList,
    MdDownload,
    MdEdit,
    MdDelete,
    MdVisibility,
    MdLocalShipping,
    MdCheckCircle,
    MdPending,
    MdAttachMoney,
} from "react-icons/md";
import Pagination from "../../components/Pagination/Pagination";

const Purchase = () => {
    return (
        <div className="purchase">
            {/* Header */}
            <div className="purchase-header">
                <div className="header-content">
                    <h1>Purchase Management</h1>
                    <p>Manage purchase orders and supplier transactions</p>
                </div>
                <button className="new-order-btn">
                    <MdAdd className="btn-icon" />
                    New Purchase Order
                </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon total">
                        <MdAttachMoney />
                    </div>
                    <div className="stat-content">
                        <h3>Total Orders</h3>
                        <p className="stat-number">2</p>
                        <p className="stat-change">This month</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon pending">
                        <MdPending />
                    </div>
                    <div className="stat-content">
                        <h3>Pending Orders</h3>
                        <p className="stat-number">1</p>
                        <p className="stat-change">Awaiting delivery</p>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className="controls-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by PO number or supplier..."
                        className="search-input"
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <label>Order Status</label>
                        <select className="filter-select">
                            <option value="all">All Status</option>
                            <option value="delivered">Delivered</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Date Range</label>
                        <select className="filter-select">
                            <option value="all">All Time</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>

                    <button className="filter-btn">
                        <MdFilterList className="btn-icon" />
                        More Filters
                    </button>

                    <button className="export-btn">
                        <MdDownload className="btn-icon" />
                        Export Orders
                    </button>
                </div>
            </div>

            {/* Purchase Orders Table */}
            <div className="orders-table-container">
                <div className="table-header">
                    <h3>Purchase Orders (2)</h3>
                </div>

                <table className="orders-table">
                    <thead>
                        <tr className="header-row">
                            <th>PO Number</th>
                            <th>Supplier</th>
                            <th>Items</th>
                            <th>Total Amount</th>
                            <th>Order Date</th>
                            <th>Expected Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Purchase 1 */}
                        <tr>
                            <td>PO-2024-001</td>
                            <td>MediCorp Pharmaceuticals</td>
                            <td>12 items</td>
                            <td>2,450.75</td>
                            <td>Jan 15, 2024</td>
                            <td>Jan 25, 2024</td>
                            <td>Delivered</td>
                            <td className="actions">
                                <button
                                    className="icon-btn view-btn"
                                    title="View Details"
                                >
                                    <MdVisibility />
                                </button>
                                <button
                                    className="icon-btn edit-btn"
                                    title="Edit Order"
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    className="icon-btn delete-btn"
                                    title="Delete Order"
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

export default Purchase;
