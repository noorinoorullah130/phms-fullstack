import React, { useState } from "react";

import "./Staff.css";
import {
    MdAdd,
    MdSearch,
    MdFilterList,
    MdDownload,
    MdEdit,
    MdDelete,
    MdEmail,
    MdWork,
} from "react-icons/md";
import AddStaffModal from "../../components/AddStaffModal/AddStaffModal";
import Pagination from "../../components/Pagination/Pagination";

const Staff = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveStaff = (staffData) => {
        // Save staff data to your backend
        console.log("Staff saved:", staffData);
    };

    return (
        <div className="staff">
            {/* Header */}
            <div className="staff-header">
                <div className="header-content">
                    <h1>Staff Management</h1>
                    <p>Manage your pharmacy staff members and permissions</p>
                </div>
                <button
                    className="add-staff-btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    <MdAdd className="btn-icon" />
                    Add Staff Member
                </button>
            </div>
            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon total">
                        <MdWork />
                    </div>
                    <div className="stat-content">
                        <h3>Total Staff</h3>
                        <p className="stat-number">1</p>
                        <p className="stat-change">Currently working</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon active">
                        <MdWork />
                    </div>
                    <div className="stat-content">
                        <h3>Active Staff</h3>
                        <p className="stat-number">1</p>
                        <p className="stat-change">Currently working</p>
                    </div>
                </div>
            </div>
            {/* Controls Section */}
            <div className="controls-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by name, email, or ID..."
                        className="search-input"
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <label>Role</label>
                        <select className="filter-select">
                            <option value="all">All Roles</option>
                            <option value="Pharmacist">Pharmacist</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Status</label>
                        <select className="filter-select">
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
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
            {/* Staff Table */}
            <div className="staff-table-container">
                <div className="table-header">
                    <h3>Staff Members (1)</h3>
                </div>

                <table className="staff-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Schedule</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>EMP-001</td>
                            <td>Dr. Sarah Johnson</td>
                            <td>Pharmacist</td>
                            <td>sarah.j@pharmacare.com</td>
                            <td>(555) 123-4567</td>
                            <td>Pharmacy</td>
                            <td>
                                <span className="schedule-badge">
                                    Full-time
                                </span>
                            </td>
                            <td className="actions">
                                <button
                                    className="icon-btn view-btn"
                                    title="View Profile"
                                >
                                    <MdEmail />
                                </button>
                                <button
                                    className="icon-btn edit-btn"
                                    title="Edit Staff"
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    className="icon-btn delete-btn"
                                    title="Delete Staff"
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
            <AddStaffModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveStaff}
            />
        </div>
    );
};

export default Staff;
