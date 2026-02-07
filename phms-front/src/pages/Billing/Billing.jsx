import React, { useState } from "react";

import "./Billing.css";
import {
    MdAdd,
    MdFilterList,
    MdDownload,
    MdPrint,
    MdVisibility,
    MdAttachMoney,
    MdReceipt,
    MdPendingActions,
    MdCancel,
    MdDelete,
} from "react-icons/md";
import BillingModal from "../../components/BillingModal/BillingModal";
import Pagination from "../../components/Pagination/Pagination";

const Billing = () => {
    const [isBillingOpen, setIsBillingOpen] = useState(false);

    // Sample prescription data (optional)
    const samplePrescription = {
        id: "RX-2024-001",
        patientId: "PT-2024-001",
        patientName: "John Doe",
        medicines: [
            {
                id: 1,
                name: "Paracetamol 500mg",
                quantity: 2,
                price: 2.5,
                requiresPrescription: false,
            },
            {
                id: 2,
                name: "Amoxicillin 500mg",
                quantity: 1,
                price: 8.75,
                requiresPrescription: true,
            },
        ],
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
                    onClick={() => setIsBillingOpen(true)}
                >
                    <MdAdd className="btn-icon" />
                    New Invoice
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
                        <p className="stat-number">6</p>
                        <p className="stat-change">This month</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon revenue">
                        <MdAttachMoney />
                    </div>
                    <div className="stat-content">
                        <h3>Total Revenue</h3>
                        <p className="stat-number">$2,067.38</p>
                        <p className="stat-change">This month</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon pending">
                        <MdPendingActions />
                    </div>
                    <div className="stat-content">
                        <h3>Pending Amount</h3>
                        <p className="stat-number">$1,449.03</p>
                        <p className="stat-change">Awaiting payment</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon overdue">
                        <MdCancel />
                    </div>
                    <div className="stat-content">
                        <h3>Overdue Invoices</h3>
                        <p className="stat-number">1</p>
                        <p className="stat-change">Need attention</p>
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
                        <label>Invoice Status</label>
                        <select className="filter-select">
                            <option value="all">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="overdue">Overdue</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Payment Method</label>
                        <select className="filter-select">
                            <option value="all">All Methods</option>
                            <option value="cash">Cash</option>
                            <option value="credit-card">Credit Card</option>
                            <option value="debit-card">Debit Card</option>
                            <option value="insurance">Insurance</option>
                            <option value="bank-transfer">Bank Transfer</option>
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
                    <h3>Invoices (6)</h3>
                </div>

                <table className="invoices-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Invoice #</th>
                            <th>Invoice Type</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>INV-2024-001</td>
                            <td>Sale</td>
                            <td>John Smith</td>
                            <td>Jan 20, 2024</td>
                            <td>$129.92</td>
                            <td className="actions">
                                <button
                                    className="icon-btn view-btn"
                                    title="View Invoice"
                                >
                                    <MdVisibility />
                                </button>
                                <button
                                    className="icon-btn print-btn"
                                    title="Print Invoice"
                                >
                                    <MdPrint />
                                </button>
                                <button
                                    className="icon-btn delete-btn"
                                    title="Delete Invoice"
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

            <BillingModal
                isOpen={isBillingOpen}
                onClose={() => setIsBillingOpen(false)}
                prescription={samplePrescription}
            />
        </div>
    );
};

export default Billing;
