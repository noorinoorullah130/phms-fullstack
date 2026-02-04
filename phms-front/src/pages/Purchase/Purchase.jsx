import React, { useState } from "react";

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
    MdCancel,
    MdCalendarToday,
    MdAttachMoney,
} from "react-icons/md";
import PurchaseModal from "../../components/PurchaseModal/PurchaseModal";

const Purchase = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sample purchase orders
    const purchaseOrders = [
        {
            id: "PO-2024-001",
            supplier: "MediCorp Pharmaceuticals",
            items: 12,
            totalAmount: 2450.75,
            orderDate: "2024-01-15",
            expectedDate: "2024-01-25",
            status: "delivered",
            paid: true,
        },
        {
            id: "PO-2024-002",
            supplier: "HealthPlus Distributors",
            items: 8,
            totalAmount: 1850.5,
            orderDate: "2024-01-18",
            expectedDate: "2024-01-28",
            status: "pending",
            paid: false,
        },
        {
            id: "PO-2024-003",
            supplier: "PharmaCare Suppliers",
            items: 15,
            totalAmount: 3200.0,
            orderDate: "2024-01-10",
            expectedDate: "2024-01-20",
            status: "processing",
            paid: true,
        },
        {
            id: "PO-2024-004",
            supplier: "Global Medical Inc.",
            items: 6,
            totalAmount: 950.25,
            orderDate: "2024-01-05",
            expectedDate: "2024-01-15",
            status: "cancelled",
            paid: false,
        },
        {
            id: "PO-2024-005",
            supplier: "MediCorp Pharmaceuticals",
            items: 20,
            totalAmount: 4150.0,
            orderDate: "2024-01-20",
            expectedDate: "2024-01-30",
            status: "pending",
            paid: false,
        },
    ];

    // Statistics
    const totalOrders = purchaseOrders.length;
    const pendingOrders = purchaseOrders.filter(
        (order) => order.status === "pending",
    ).length;
    const totalSpent = purchaseOrders.reduce(
        (sum, order) => sum + order.totalAmount,
        0,
    );
    const averageOrderValue = totalSpent / totalOrders;

    const getStatusColor = (status) => {
        switch (status) {
            case "delivered":
                return "#10b981";
            case "processing":
                return "#3b82f6";
            case "pending":
                return "#f59e0b";
            case "cancelled":
                return "#ef4444";
            default:
                return "#6b7280";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "delivered":
                return <MdCheckCircle />;
            case "processing":
                return <MdLocalShipping />;
            case "pending":
                return <MdPending />;
            case "cancelled":
                return <MdCancel />;
            default:
                return null;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "delivered":
                return "Delivered";
            case "processing":
                return "Processing";
            case "pending":
                return "Pending";
            case "cancelled":
                return "Cancelled";
            default:
                return "Unknown";
        }
    };

    const filteredOrders = purchaseOrders.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.supplier.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || order.status === statusFilter;
        const matchesDate = dateFilter === "all" || true; // Simplified date filter

        return matchesSearch && matchesStatus && matchesDate;
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const handleSavePurchase = (purchaseData) => {
        console.log("New Purchase Order:", purchaseData);
        // Save to backend or update state
    };

    return (
        <div className="purchase">
            {/* Header */}
            <div className="purchase-header">
                <div className="header-content">
                    <h1>Purchase Management</h1>
                    <p>Manage purchase orders and supplier transactions</p>
                </div>
                <button
                    className="new-order-btn"
                    onClick={() => setIsModalOpen(true)}
                >
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
                        <p className="stat-number">{totalOrders}</p>
                        <p className="stat-change">This month</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon pending">
                        <MdPending />
                    </div>
                    <div className="stat-content">
                        <h3>Pending Orders</h3>
                        <p className="stat-number">{pendingOrders}</p>
                        <p className="stat-change">Awaiting delivery</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon amount">
                        <MdAttachMoney />
                    </div>
                    <div className="stat-content">
                        <h3>Total Spent</h3>
                        <p className="stat-number">
                            {formatCurrency(totalSpent)}
                        </p>
                        <p className="stat-change">This month</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon average">
                        <MdCalendarToday />
                    </div>
                    <div className="stat-content">
                        <h3>Avg. Order Value</h3>
                        <p className="stat-number">
                            {formatCurrency(averageOrderValue)}
                        </p>
                        <p className="stat-change">Per order</p>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className="controls-section">
                <div className="search-box">
                    <MdSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by PO number or supplier..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <label>Order Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Date Range</label>
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
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
                    <h3>Purchase Orders ({filteredOrders.length})</h3>
                    <div className="table-actions">
                        <button className="action-btn print">
                            Print Selected
                        </button>
                        <button className="action-btn mark">
                            Mark as Paid
                        </button>
                    </div>
                </div>

                <div className="orders-table">
                    <div className="table-row header-row">
                        <div className="table-cell">PO Number</div>
                        <div className="table-cell">Supplier</div>
                        <div className="table-cell">Items</div>
                        <div className="table-cell">Total Amount</div>
                        <div className="table-cell">Order Date</div>
                        <div className="table-cell">Expected Date</div>
                        <div className="table-cell">Status</div>
                        <div className="table-cell">Payment</div>
                        <div className="table-cell">Actions</div>
                    </div>

                    {filteredOrders.map((order) => (
                        <div key={order.id} className="table-row">
                            <div className="table-cell po-number">
                                <strong>{order.id}</strong>
                            </div>
                            <div className="table-cell supplier">
                                {order.supplier}
                            </div>
                            <div className="table-cell items">
                                {order.items} items
                            </div>
                            <div className="table-cell amount">
                                <strong>
                                    {formatCurrency(order.totalAmount)}
                                </strong>
                            </div>
                            <div className="table-cell order-date">
                                {formatDate(order.orderDate)}
                            </div>
                            <div className="table-cell expected-date">
                                {formatDate(order.expectedDate)}
                                {new Date(order.expectedDate) < new Date() &&
                                    order.status !== "delivered" && (
                                        <span className="date-warning">
                                            Overdue
                                        </span>
                                    )}
                            </div>
                            <div className="table-cell">
                                <div
                                    className="status-badge"
                                    style={{
                                        backgroundColor: getStatusColor(
                                            order.status,
                                        ),
                                    }}
                                >
                                    {getStatusIcon(order.status)}
                                    {getStatusText(order.status)}
                                </div>
                            </div>
                            <div className="table-cell payment">
                                <span
                                    className={`payment-status ${order.paid ? "paid" : "unpaid"}`}
                                >
                                    {order.paid ? "Paid" : "Unpaid"}
                                </span>
                            </div>
                            <div className="table-cell actions">
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
                            </div>
                        </div>
                    ))}
                </div>

                {filteredOrders.length === 0 && (
                    <div className="no-results">
                        <p>No purchase orders found matching your criteria.</p>
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
            <PurchaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSavePurchase}
            />
        </div>
    );
};

export default Purchase;
