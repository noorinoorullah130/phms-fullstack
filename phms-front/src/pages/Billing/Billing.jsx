import React, { useState } from "react";

import "./Billing.css";
import {
    MdAdd,
    MdSearch,
    MdFilterList,
    MdDownload,
    MdPrint,
    MdEdit,
    MdDelete,
    MdVisibility,
    MdAttachMoney,
    MdReceipt,
    MdCreditCard,
    MdAccountBalance,
    MdLocalAtm,
    MdPendingActions,
    MdCheckCircle,
    MdCancel,
    MdRefresh,
    MdQrCode,
    MdSend,
    MdCopyAll,
    MdCalendarToday,
    MdPerson,
    MdPhone,
    MdEmail,
    MdLocationOn,
} from "react-icons/md";

const Billing = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
    const [activeTab, setActiveTab] = useState("invoices");

    // Sample invoices data
    const invoices = [
        {
            id: "INV-2024-001",
            customer: "John Smith",
            customerId: "CUST-001",
            date: "2024-01-20",
            dueDate: "2024-02-20",
            amount: 125.5,
            tax: 9.42,
            discount: 5.0,
            total: 129.92,
            status: "paid",
            paymentMethod: "credit-card",
            items: 3,
            invoiceType: "sale",
            notes: "Prescription filled",
        },
        {
            id: "INV-2024-002",
            customer: "Sarah Johnson",
            customerId: "CUST-002",
            date: "2024-01-19",
            dueDate: "2024-02-19",
            amount: 85.75,
            tax: 6.43,
            discount: 0.0,
            total: 92.18,
            status: "paid",
            paymentMethod: "cash",
            items: 2,
            invoiceType: "sale",
            notes: "Over-the-counter",
        },
        {
            id: "INV-2024-003",
            customer: "Mike Brown",
            customerId: "CUST-003",
            date: "2024-01-18",
            dueDate: "2024-02-18",
            amount: 245.0,
            tax: 18.38,
            discount: 15.0,
            total: 248.38,
            status: "pending",
            paymentMethod: "insurance",
            items: 5,
            invoiceType: "sale",
            notes: "Monthly medication",
        },
        {
            id: "INV-2024-004",
            customer: "Lisa Wilson",
            customerId: "CUST-004",
            date: "2024-01-17",
            dueDate: "2024-02-17",
            amount: 67.25,
            tax: 5.04,
            discount: 0.0,
            total: 72.29,
            status: "overdue",
            paymentMethod: "debit-card",
            items: 1,
            invoiceType: "sale",
            notes: "First aid supplies",
        },
        {
            id: "INV-2024-005",
            customer: "Robert Davis",
            customerId: "CUST-005",
            date: "2024-01-16",
            dueDate: "2024-02-16",
            amount: 320.8,
            tax: 24.06,
            discount: 20.0,
            total: 324.86,
            status: "paid",
            paymentMethod: "credit-card",
            items: 8,
            invoiceType: "sale",
            notes: "Family prescriptions",
        },
        {
            id: "INV-2024-006",
            customer: "MediCorp Pharmaceuticals",
            customerId: "SUPP-001",
            date: "2024-01-15",
            dueDate: "2024-02-15",
            amount: 1250.75,
            tax: 0.0,
            discount: 50.0,
            total: 1200.75,
            status: "pending",
            paymentMethod: "bank-transfer",
            items: 15,
            invoiceType: "purchase",
            notes: "Monthly stock order",
        },
    ];

    // Sample payment methods data
    const paymentMethods = [
        {
            id: "cash",
            name: "Cash",
            icon: <MdLocalAtm />,
            total: 2450.5,
            count: 42,
        },
        {
            id: "credit-card",
            name: "Credit Card",
            icon: <MdCreditCard />,
            total: 3850.75,
            count: 65,
        },
        {
            id: "debit-card",
            name: "Debit Card",
            icon: <MdCreditCard />,
            total: 1250.25,
            count: 28,
        },
        {
            id: "insurance",
            name: "Insurance",
            icon: <MdAccountBalance />,
            total: 7850.0,
            count: 15,
        },
        {
            id: "bank-transfer",
            name: "Bank Transfer",
            icon: <MdAccountBalance />,
            total: 5200.5,
            count: 8,
        },
    ];

    // Statistics
    const totalInvoices = invoices.length;
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const pendingAmount = invoices
        .filter((inv) => inv.status === "pending" || inv.status === "overdue")
        .reduce((sum, inv) => sum + inv.total, 0);
    const overdueInvoices = invoices.filter(
        (inv) => inv.status === "overdue",
    ).length;

    const getStatusColor = (status) => {
        switch (status) {
            case "paid":
                return "#10b981";
            case "pending":
                return "#f59e0b";
            case "overdue":
                return "#ef4444";
            case "cancelled":
                return "#6b7280";
            default:
                return "#6b7280";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "paid":
                return <MdCheckCircle />;
            case "pending":
                return <MdPendingActions />;
            case "overdue":
                return <MdCancel />;
            case "cancelled":
                return <MdCancel />;
            default:
                return null;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "paid":
                return "Paid";
            case "pending":
                return "Pending";
            case "overdue":
                return "Overdue";
            case "cancelled":
                return "Cancelled";
            default:
                return "Unknown";
        }
    };

    const getPaymentMethodIcon = (method) => {
        switch (method) {
            case "cash":
                return <MdLocalAtm />;
            case "credit-card":
                return <MdCreditCard />;
            case "debit-card":
                return <MdCreditCard />;
            case "insurance":
                return <MdAccountBalance />;
            case "bank-transfer":
                return <MdAccountBalance />;
            default:
                return <MdAttachMoney />;
        }
    };

    const getPaymentMethodText = (method) => {
        switch (method) {
            case "cash":
                return "Cash";
            case "credit-card":
                return "Credit Card";
            case "debit-card":
                return "Debit Card";
            case "insurance":
                return "Insurance";
            case "bank-transfer":
                return "Bank Transfer";
            default:
                return method;
        }
    };

    const filteredInvoices = invoices.filter((invoice) => {
        const matchesSearch =
            invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || invoice.status === statusFilter;
        const matchesPaymentMethod =
            paymentMethodFilter === "all" ||
            invoice.paymentMethod === paymentMethodFilter;

        return matchesSearch && matchesStatus && matchesPaymentMethod;
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

    const isOverdue = (dueDate) => {
        return new Date(dueDate) < new Date();
    };

    const handleGenerateInvoice = () => {
        alert("Generating new invoice...");
        // Logic to generate new invoice
    };

    const handlePrintInvoice = (invoiceId) => {
        alert(`Printing invoice: ${invoiceId}`);
        // Logic to print invoice
    };

    const handleSendInvoice = (invoiceId, customerEmail) => {
        alert(`Sending invoice ${invoiceId} to ${customerEmail}`);
        // Logic to send invoice via email
    };

    const handleMarkAsPaid = (invoiceId) => {
        alert(`Marking invoice ${invoiceId} as paid`);
        // Logic to update invoice status
    };

    return (
        <div className="billing">
            {/* Header */}
            <div className="billing-header">
                <div className="header-content">
                    <h1>Billing & Invoicing</h1>
                    <p>Manage invoices, payments, and billing operations</p>
                </div>
                <button
                    className="new-invoice-btn"
                    onClick={handleGenerateInvoice}
                >
                    <MdAdd className="btn-icon" />
                    New Invoice
                </button>
            </div>

            {/* Tabs */}
            <div className="billing-tabs">
                <button
                    className={`tab-btn ${activeTab === "invoices" ? "active" : ""}`}
                    onClick={() => setActiveTab("invoices")}
                >
                    <MdReceipt className="tab-icon" />
                    Invoices
                </button>
                <button
                    className={`tab-btn ${activeTab === "payments" ? "active" : ""}`}
                    onClick={() => setActiveTab("payments")}
                >
                    <MdAttachMoney className="tab-icon" />
                    Payments
                </button>
                <button
                    className={`tab-btn ${activeTab === "customers" ? "active" : ""}`}
                    onClick={() => setActiveTab("customers")}
                >
                    <MdPerson className="tab-icon" />
                    Customers
                </button>
                <button
                    className={`tab-btn ${activeTab === "reports" ? "active" : ""}`}
                    onClick={() => setActiveTab("reports")}
                >
                    <MdReceipt className="tab-icon" />
                    Billing Reports
                </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon total">
                        <MdReceipt />
                    </div>
                    <div className="stat-content">
                        <h3>Total Invoices</h3>
                        <p className="stat-number">{totalInvoices}</p>
                        <p className="stat-change">This month</p>
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
                        <p className="stat-change">This month</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon pending">
                        <MdPendingActions />
                    </div>
                    <div className="stat-content">
                        <h3>Pending Amount</h3>
                        <p className="stat-number">
                            {formatCurrency(pendingAmount)}
                        </p>
                        <p className="stat-change">Awaiting payment</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon overdue">
                        <MdCancel />
                    </div>
                    <div className="stat-content">
                        <h3>Overdue Invoices</h3>
                        <p className="stat-number">{overdueInvoices}</p>
                        <p className="stat-change">Need attention</p>
                    </div>
                </div>
            </div>

            {/* Payment Methods Summary */}
            <div className="payment-methods-summary">
                <h3>Payment Methods Summary</h3>
                <div className="methods-grid">
                    {paymentMethods.map((method) => (
                        <div key={method.id} className="method-card">
                            <div className="method-icon">{method.icon}</div>
                            <div className="method-content">
                                <h4>{method.name}</h4>
                                <p className="method-amount">
                                    {formatCurrency(method.total)}
                                </p>
                                <p className="method-count">
                                    {method.count} transactions
                                </p>
                            </div>
                        </div>
                    ))}
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
                        <label>Invoice Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="overdue">Overdue</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Payment Method</label>
                        <select
                            value={paymentMethodFilter}
                            onChange={(e) =>
                                setPaymentMethodFilter(e.target.value)
                            }
                            className="filter-select"
                        >
                            <option value="all">All Methods</option>
                            <option value="cash">Cash</option>
                            <option value="credit-card">Credit Card</option>
                            <option value="debit-card">Debit Card</option>
                            <option value="insurance">Insurance</option>
                            <option value="bank-transfer">Bank Transfer</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Date Range</label>
                        <select className="filter-select">
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
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

            {/* Invoices Table */}
            <div className="invoices-table-container">
                <div className="table-header">
                    <h3>Invoices ({filteredInvoices.length})</h3>
                    <div className="table-actions">
                        <button className="action-btn bulk-print">
                            <MdPrint className="action-icon" />
                            Bulk Print
                        </button>
                        <button className="action-btn bulk-send">
                            <MdSend className="action-icon" />
                            Bulk Send
                        </button>
                    </div>
                </div>

                <div className="invoices-table">
                    <div className="table-row header-row">
                        <div className="table-cell">Invoice #</div>
                        <div className="table-cell">Customer</div>
                        <div className="table-cell">Date</div>
                        <div className="table-cell">Due Date</div>
                        <div className="table-cell">Amount</div>
                        <div className="table-cell">Status</div>
                        <div className="table-cell">Payment Method</div>
                        <div className="table-cell">Actions</div>
                    </div>

                    {filteredInvoices.map((invoice) => (
                        <div key={invoice.id} className="table-row">
                            <div className="table-cell invoice-number">
                                <div className="invoice-info">
                                    <strong>{invoice.id}</strong>
                                    <small>
                                        {invoice.invoiceType === "purchase"
                                            ? "Purchase"
                                            : "Sale"}
                                    </small>
                                </div>
                                <button className="qr-btn" title="Show QR Code">
                                    <MdQrCode />
                                </button>
                            </div>
                            <div className="table-cell customer">
                                <div className="customer-info">
                                    <strong>{invoice.customer}</strong>
                                    <small>{invoice.customerId}</small>
                                </div>
                            </div>
                            <div className="table-cell date">
                                {formatDate(invoice.date)}
                            </div>
                            <div className="table-cell due-date">
                                <div className="due-date-info">
                                    {formatDate(invoice.dueDate)}
                                    {invoice.status === "pending" &&
                                        isOverdue(invoice.dueDate) && (
                                            <span className="overdue-badge">
                                                Overdue
                                            </span>
                                        )}
                                </div>
                            </div>
                            <div className="table-cell amount">
                                <div className="amount-details">
                                    <strong>
                                        {formatCurrency(invoice.total)}
                                    </strong>
                                    <div className="breakdown">
                                        <small>
                                            Sub:{" "}
                                            {formatCurrency(invoice.amount)}
                                        </small>
                                        {invoice.discount > 0 && (
                                            <small className="discount">
                                                Disc: -
                                                {formatCurrency(
                                                    invoice.discount,
                                                )}
                                            </small>
                                        )}
                                        <small>
                                            Tax: {formatCurrency(invoice.tax)}
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="table-cell">
                                <span
                                    className="status-badge"
                                    style={{
                                        backgroundColor: getStatusColor(
                                            invoice.status,
                                        ),
                                    }}
                                >
                                    {getStatusIcon(invoice.status)}
                                    {getStatusText(invoice.status)}
                                </span>
                            </div>
                            <div className="table-cell payment-method">
                                <div className="payment-method-info">
                                    {getPaymentMethodIcon(
                                        invoice.paymentMethod,
                                    )}
                                    <span>
                                        {getPaymentMethodText(
                                            invoice.paymentMethod,
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="table-cell actions">
                                <button
                                    className="icon-btn view-btn"
                                    title="View Invoice"
                                    onClick={() =>
                                        alert(`Viewing invoice: ${invoice.id}`)
                                    }
                                >
                                    <MdVisibility />
                                </button>
                                <button
                                    className="icon-btn print-btn"
                                    title="Print Invoice"
                                    onClick={() =>
                                        handlePrintInvoice(invoice.id)
                                    }
                                >
                                    <MdPrint />
                                </button>
                                <button
                                    className="icon-btn send-btn"
                                    title="Send Invoice"
                                    onClick={() =>
                                        handleSendInvoice(
                                            invoice.id,
                                            "customer@example.com",
                                        )
                                    }
                                >
                                    <MdSend />
                                </button>
                                {invoice.status !== "paid" && (
                                    <button
                                        className="icon-btn mark-paid-btn"
                                        title="Mark as Paid"
                                        onClick={() =>
                                            handleMarkAsPaid(invoice.id)
                                        }
                                    >
                                        <MdCheckCircle />
                                    </button>
                                )}
                                <button
                                    className="icon-btn copy-btn"
                                    title="Copy Invoice"
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            invoice.id,
                                        );
                                        alert(
                                            `Invoice ID ${invoice.id} copied to clipboard!`,
                                        );
                                    }}
                                >
                                    <MdCopyAll />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredInvoices.length === 0 && (
                    <div className="no-results">
                        <div className="no-results-icon">📄</div>
                        <h3>No invoices found</h3>
                        <p>Try adjusting your search or filters</p>
                    </div>
                )}
            </div>

            {/* Quick Invoice Actions */}
            <div className="quick-actions-section">
                <h3>Quick Invoice Actions</h3>
                <div className="quick-actions-grid">
                    <button className="quick-action-btn">
                        <div className="action-icon">📧</div>
                        <span>Send Reminders</span>
                        <small>Send payment reminders</small>
                    </button>

                    <button className="quick-action-btn">
                        <div className="action-icon">🔄</div>
                        <span>Recurring Invoices</span>
                        <small>Manage recurring bills</small>
                    </button>

                    <button className="quick-action-btn">
                        <div className="action-icon">📊</div>
                        <span>Revenue Report</span>
                        <small>Generate revenue report</small>
                    </button>

                    <button className="quick-action-btn">
                        <div className="action-icon">💳</div>
                        <span>Payment Processing</span>
                        <small>Process payments</small>
                    </button>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="recent-transactions">
                <div className="section-header">
                    <h3>Recent Transactions</h3>
                    <button className="view-all-btn">View All →</button>
                </div>
                <div className="transactions-list">
                    <div className="transaction-item paid">
                        <div className="transaction-icon">💰</div>
                        <div className="transaction-info">
                            <h4>INV-2024-001 • John Smith</h4>
                            <p>Credit Card • Today, 10:30 AM</p>
                        </div>
                        <div className="transaction-amount">
                            <strong>+{formatCurrency(129.92)}</strong>
                        </div>
                    </div>

                    <div className="transaction-item pending">
                        <div className="transaction-icon">⏳</div>
                        <div className="transaction-info">
                            <h4>INV-2024-003 • Mike Brown</h4>
                            <p>Insurance • Yesterday, 2:15 PM</p>
                        </div>
                        <div className="transaction-amount">
                            <strong>+{formatCurrency(248.38)}</strong>
                        </div>
                    </div>

                    <div className="transaction-item overdue">
                        <div className="transaction-icon">⚠️</div>
                        <div className="transaction-info">
                            <h4>INV-2024-004 • Lisa Wilson</h4>
                            <p>Debit Card • Jan 17, 2024</p>
                        </div>
                        <div className="transaction-amount">
                            <strong>+{formatCurrency(72.29)}</strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoice Preview Sidebar */}
            <div className="invoice-preview">
                <h3>Invoice Preview</h3>
                <div className="preview-card">
                    <div className="preview-header">
                        <div className="preview-title">
                            <h4>INV-2024-001</h4>
                            <span className="preview-status paid">Paid</span>
                        </div>
                        <div className="preview-date">Jan 20, 2024</div>
                    </div>

                    <div className="preview-customer">
                        <div className="customer-info">
                            <h5>Bill To:</h5>
                            <p>
                                <strong>John Smith</strong>
                            </p>
                            <p>123 Main Street</p>
                            <p>New York, NY 10001</p>
                            <p>john.smith@email.com</p>
                            <p>(555) 123-4567</p>
                        </div>
                    </div>

                    <div className="preview-items">
                        <div className="items-header">
                            <span>Description</span>
                            <span>Qty</span>
                            <span>Price</span>
                            <span>Total</span>
                        </div>
                        <div className="item-row">
                            <span>Paracetamol 500mg</span>
                            <span>1</span>
                            <span>$15.50</span>
                            <span>$15.50</span>
                        </div>
                        <div className="item-row">
                            <span>Amoxicillin 250mg</span>
                            <span>1</span>
                            <span>$85.00</span>
                            <span>$85.00</span>
                        </div>
                        <div className="item-row">
                            <span>Vitamin C 1000mg</span>
                            <span>1</span>
                            <span>$25.00</span>
                            <span>$25.00</span>
                        </div>
                    </div>

                    <div className="preview-summary">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>$125.50</span>
                        </div>
                        <div className="summary-row discount">
                            <span>Discount</span>
                            <span>-$5.00</span>
                        </div>
                        <div className="summary-row tax">
                            <span>Tax (7.5%)</span>
                            <span>$9.42</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>$129.92</span>
                        </div>
                    </div>

                    <div className="preview-footer">
                        <div className="payment-method">
                            <MdCreditCard />
                            <span>Credit Card •••• 1234</span>
                        </div>
                        <div className="payment-date">Paid on Jan 20, 2024</div>
                    </div>
                </div>

                <div className="preview-actions">
                    <button className="preview-btn print">
                        <MdPrint />
                        Print
                    </button>
                    <button className="preview-btn download">
                        <MdDownload />
                        Download PDF
                    </button>
                    <button className="preview-btn share">
                        <MdSend />
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Billing;
