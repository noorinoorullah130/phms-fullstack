import React, { useState } from "react";

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
    MdShoppingCart,
    MdCalendarToday,
    MdPrint,
} from "react-icons/md";
import NewSaleModal from "../../components/NewSaleModal/NewSaleModal";

const Sale = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("today");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sample sales data
    const salesData = [
        {
            id: "SALE-2024-001",
            customer: "John Smith",
            items: 3,
            totalAmount: 85.5,
            date: "2024-01-20 10:30",
            paymentMethod: "Cash",
            status: "completed",
            discount: 5.0,
            tax: 6.42,
        },
        {
            id: "SALE-2024-002",
            customer: "Sarah Johnson",
            items: 5,
            totalAmount: 142.75,
            date: "2024-01-20 14:15",
            paymentMethod: "Credit Card",
            status: "completed",
            discount: 10.0,
            tax: 10.71,
        },
        {
            id: "SALE-2024-003",
            customer: "Mike Brown",
            items: 2,
            totalAmount: 32.25,
            date: "2024-01-19 09:45",
            paymentMethod: "Insurance",
            status: "pending",
            discount: 0.0,
            tax: 2.42,
        },
        {
            id: "SALE-2024-004",
            customer: "Lisa Wilson",
            items: 8,
            totalAmount: 215.8,
            date: "2024-01-19 16:20",
            paymentMethod: "Debit Card",
            status: "completed",
            discount: 15.0,
            tax: 16.19,
        },
        {
            id: "SALE-2024-005",
            customer: "Robert Davis",
            items: 1,
            totalAmount: 18.99,
            date: "2024-01-18 11:10",
            paymentMethod: "Cash",
            status: "refunded",
            discount: 0.0,
            tax: 1.42,
        },
    ];

    // Statistics
    const totalSales = salesData.length;
    const todaySales = salesData.filter((sale) =>
        sale.date.includes("2024-01-20"),
    ).length;
    const totalRevenue = salesData.reduce(
        (sum, sale) => sum + sale.totalAmount,
        0,
    );
    const averageSaleValue = totalRevenue / totalSales;
    const totalDiscount = salesData.reduce(
        (sum, sale) => sum + sale.discount,
        0,
    );
    const totalTax = salesData.reduce((sum, sale) => sum + sale.tax, 0);

    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "#10b981";
            case "pending":
                return "#f59e0b";
            case "refunded":
                return "#ef4444";
            case "cancelled":
                return "#6b7280";
            default:
                return "#6b7280";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "completed":
                return "Completed";
            case "pending":
                return "Pending";
            case "refunded":
                return "Refunded";
            case "cancelled":
                return "Cancelled";
            default:
                return "Unknown";
        }
    };

    const filteredSales = salesData.filter((sale) => {
        const matchesSearch =
            sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sale.customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || sale.status === statusFilter;
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

    const formatDateTime = (dateString) => {
        const [date, time] = dateString.split(" ");
        const [year, month, day] = date.split("-");
        const formattedDate = `${month}/${day}/${year.slice(-2)}`;
        return `${formattedDate} ${time}`;
    };

    const handleCompleteSale = (saleData) => {
        console.log("Sale completed:", saleData);
        // Here you would:
        // 1. Save to database
        // 2. Update inventory
        // 3. Print receipt
        // 4. Show success message
    };

    return (
        <div className="sale">
            {/* Header */}
            <div className="sales-header">
                <div className="header-content">
                    <h1>Sales Management</h1>
                    <p>Track and manage all pharmacy sales transactions</p>
                </div>
                <button
                    className="new-sale-btn"
                    onClick={() => setIsModalOpen(true)}
                >
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
                        <h3>Today's Sales</h3>
                        <p className="stat-number">{todaySales}</p>
                        <p className="stat-change">+2 from yesterday</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon revenue">
                        <MdAttachMoney />
                    </div>
                    <div className="stat-content">
                        <h3>Total Revenue</h3>
                        <p className="stat-number">
                            {formatCurrency(totalRevenue)}
                        </p>
                        <p className="stat-change">This week</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon average">
                        <MdTrendingUp />
                    </div>
                    <div className="stat-content">
                        <h3>Avg. Sale Value</h3>
                        <p className="stat-number">
                            {formatCurrency(averageSaleValue)}
                        </p>
                        <p className="stat-change">+5% from last week</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon customers">
                        <MdPeople />
                    </div>
                    <div className="stat-content">
                        <h3>Total Customers</h3>
                        <p className="stat-number">{totalSales}</p>
                        <p className="stat-change">This month</p>
                    </div>
                </div>
            </div>

            {/* Quick Summary */}
            <div className="summary-cards">
                <div className="summary-card">
                    <div className="summary-icon discount">💰</div>
                    <div className="summary-content">
                        <h4>Total Discount</h4>
                        <p className="summary-value">
                            {formatCurrency(totalDiscount)}
                        </p>
                        <small>Given to customers</small>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon tax">🏛️</div>
                    <div className="summary-content">
                        <h4>Total Tax</h4>
                        <p className="summary-value">
                            {formatCurrency(totalTax)}
                        </p>
                        <small>Collected</small>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon items">🛒</div>
                    <div className="summary-content">
                        <h4>Items Sold</h4>
                        <p className="summary-value">
                            {salesData.reduce(
                                (sum, sale) => sum + sale.items,
                                0,
                            )}
                        </p>
                        <small>Total units</small>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon methods">💳</div>
                    <div className="summary-content">
                        <h4>Payment Methods</h4>
                        <p className="summary-value">4</p>
                        <small>Cash, Card, Insurance</small>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className="controls-section">
                <div className="search-box">
                    <MdSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by invoice # or customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <label>Sale Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="refunded">Refunded</option>
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
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="all">All Time</option>
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
                    <h3>Recent Sales ({filteredSales.length})</h3>
                    <div className="table-actions">
                        <button className="action-btn print">
                            <MdPrint className="action-icon" />
                            Print Invoices
                        </button>
                        <button className="action-btn refund">
                            Process Refund
                        </button>
                    </div>
                </div>

                <div className="sales-table">
                    <div className="table-row header-row">
                        <div className="table-cell">Invoice #</div>
                        <div className="table-cell">Customer</div>
                        <div className="table-cell">Items</div>
                        <div className="table-cell">Amount</div>
                        <div className="table-cell">Date & Time</div>
                        <div className="table-cell">Payment Method</div>
                        <div className="table-cell">Status</div>
                        <div className="table-cell">Actions</div>
                    </div>

                    {filteredSales.map((sale) => (
                        <div key={sale.id} className="table-row">
                            <div className="table-cell invoice-number">
                                <strong>{sale.id}</strong>
                                <button
                                    className="receipt-btn"
                                    title="View Receipt"
                                >
                                    <MdReceipt />
                                </button>
                            </div>
                            <div className="table-cell customer">
                                {sale.customer}
                            </div>
                            <div className="table-cell items">
                                {sale.items} items
                            </div>
                            <div className="table-cell amount">
                                <div className="amount-details">
                                    <strong>
                                        {formatCurrency(sale.totalAmount)}
                                    </strong>
                                    <div className="breakdown">
                                        <small>
                                            Discount:{" "}
                                            {formatCurrency(sale.discount)}
                                        </small>
                                        <small>
                                            Tax: {formatCurrency(sale.tax)}
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="table-cell date-time">
                                {formatDateTime(sale.date)}
                            </div>
                            <div className="table-cell payment-method">
                                <span
                                    className={`payment-badge ${sale.paymentMethod.toLowerCase().replace(" ", "-")}`}
                                >
                                    {sale.paymentMethod}
                                </span>
                            </div>
                            <div className="table-cell">
                                <span
                                    className="status-badge"
                                    style={{
                                        backgroundColor: getStatusColor(
                                            sale.status,
                                        ),
                                    }}
                                >
                                    {getStatusText(sale.status)}
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
                            </div>
                        </div>
                    ))}
                </div>

                {filteredSales.length === 0 && (
                    <div className="no-results">
                        <p>No sales found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <NewSaleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCompleteSale={handleCompleteSale}
            />
        </div>
    );
};

export default Sale;
