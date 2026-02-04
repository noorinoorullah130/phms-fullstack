import React, { useState } from "react";

import "./Staff.css";
import {
    MdAdd,
    MdSearch,
    MdFilterList,
    MdEdit,
    MdDelete,
    MdVisibility,
    MdEmail,
    MdPhone,
    MdCalendarToday,
    MdBadge,
    MdWork,
    MdLocationOn,
    MdSecurity,
    MdMoreVert,
    MdDownload,
    MdMailOutline,
    MdAccessTime,
    MdGroup,
} from "react-icons/md";
import { FaUserMd, FaUserNurse, FaUserCog, FaUserSecret } from "react-icons/fa";

const Staff = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [viewMode, setViewMode] = useState("grid");

    // Sample staff data
    const staffMembers = [
        {
            id: "EMP-001",
            name: "Dr. Sarah Johnson",
            role: "Pharmacist",
            email: "sarah.j@pharmacare.com",
            phone: "(555) 123-4567",
            hireDate: "2020-03-15",
            status: "active",
            schedule: "Full-time",
            department: "Pharmacy",
            avatar: "👩‍⚕️",
            permissions: ["prescription", "inventory", "sales"],
            lastActive: "Today, 10:30 AM",
        },
        {
            id: "EMP-002",
            name: "Mike Williams",
            role: "Pharmacy Technician",
            email: "mike.w@pharmacare.com",
            phone: "(555) 234-5678",
            hireDate: "2021-06-22",
            status: "active",
            schedule: "Full-time",
            department: "Pharmacy",
            avatar: "👨‍🔬",
            permissions: ["inventory", "sales"],
            lastActive: "Today, 9:15 AM",
        },
        {
            id: "EMP-003",
            name: "Lisa Chen",
            role: "Store Manager",
            email: "lisa.c@pharmacare.com",
            phone: "(555) 345-6789",
            hireDate: "2019-08-10",
            status: "active",
            schedule: "Full-time",
            department: "Management",
            avatar: "👩‍💼",
            permissions: ["all"],
            lastActive: "Today, 8:45 AM",
        },
        {
            id: "EMP-004",
            name: "Robert Davis",
            role: "Cashier",
            email: "robert.d@pharmacare.com",
            phone: "(555) 456-7890",
            hireDate: "2022-01-30",
            status: "active",
            schedule: "Part-time",
            department: "Front Desk",
            avatar: "💁‍♂️",
            permissions: ["sales"],
            lastActive: "Yesterday, 5:30 PM",
        },
        {
            id: "EMP-005",
            name: "Emily Wilson",
            role: "Pharmacist",
            email: "emily.w@pharmacare.com",
            phone: "(555) 567-8901",
            hireDate: "2021-11-05",
            status: "on-leave",
            schedule: "Full-time",
            department: "Pharmacy",
            avatar: "👩‍⚕️",
            permissions: ["prescription", "inventory"],
            lastActive: "Jan 15, 2024",
        },
        {
            id: "EMP-006",
            name: "David Miller",
            role: "Inventory Manager",
            email: "david.m@pharmacare.com",
            phone: "(555) 678-9012",
            hireDate: "2020-09-18",
            status: "active",
            schedule: "Full-time",
            department: "Inventory",
            avatar: "👨‍💼",
            permissions: ["inventory", "purchase"],
            lastActive: "Today, 11:00 AM",
        },
    ];

    const roles = [
        "all",
        "Pharmacist",
        "Pharmacy Technician",
        "Store Manager",
        "Cashier",
        "Inventory Manager",
    ];
    const departments = ["Pharmacy", "Management", "Front Desk", "Inventory"];
    const schedules = ["Full-time", "Part-time", "Contract", "Temporary"];

    // Statistics
    const totalStaff = staffMembers.length;
    const activeStaff = staffMembers.filter(
        (staff) => staff.status === "active",
    ).length;
    const onLeaveStaff = staffMembers.filter(
        (staff) => staff.status === "on-leave",
    ).length;
    const pharmacistCount = staffMembers.filter(
        (staff) => staff.role === "Pharmacist",
    ).length;

    const getRoleIcon = (role) => {
        switch (role) {
            case "Pharmacist":
                return <FaUserMd />;
            case "Pharmacy Technician":
                return <FaUserNurse />;
            case "Store Manager":
                return <FaUserCog />;
            case "Inventory Manager":
                return <FaUserSecret />;
            default:
                return <MdBadge />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "active":
                return "#10b981";
            case "on-leave":
                return "#f59e0b";
            case "inactive":
                return "#ef4444";
            default:
                return "#6b7280";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "active":
                return "Active";
            case "on-leave":
                return "On Leave";
            case "inactive":
                return "Inactive";
            default:
                return "Unknown";
        }
    };

    const getPermissionLabel = (permission) => {
        switch (permission) {
            case "prescription":
                return "Prescription";
            case "inventory":
                return "Inventory";
            case "sales":
                return "Sales";
            case "purchase":
                return "Purchase";
            case "reports":
                return "Reports";
            case "all":
                return "Full Access";
            default:
                return permission;
        }
    };

    const filteredStaff = staffMembers.filter((staff) => {
        const matchesSearch =
            staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "all" || staff.role === roleFilter;
        const matchesStatus =
            statusFilter === "all" || staff.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const handleViewProfile = (staffId) => {
        alert(`Viewing profile for staff ID: ${staffId}`);
        // Navigate to staff profile page or open modal
    };

    const handleEditStaff = (staffId) => {
        alert(`Editing staff ID: ${staffId}`);
        // Open edit modal or navigate to edit page
    };

    const handleEmailStaff = (email) => {
        alert(`Opening email client for: ${email}`);
        // window.location.href = `mailto:${email}`;
    };

    return (
        <div className="staff">
            {/* Header */}
            <div className="staff-header">
                <div className="header-content">
                    <h1>Staff Management</h1>
                    <p>Manage your pharmacy staff members and permissions</p>
                </div>
                <button className="add-staff-btn">
                    <MdAdd className="btn-icon" />
                    Add Staff Member
                </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon total">
                        <MdGroup />
                    </div>
                    <div className="stat-content">
                        <h3>Total Staff</h3>
                        <p className="stat-number">{totalStaff}</p>
                        <p className="stat-change">Across all departments</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon active">
                        <MdWork />
                    </div>
                    <div className="stat-content">
                        <h3>Active Staff</h3>
                        <p className="stat-number">{activeStaff}</p>
                        <p className="stat-change">Currently working</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon pharmacists">
                        <FaUserMd />
                    </div>
                    <div className="stat-content">
                        <h3>Pharmacists</h3>
                        <p className="stat-number">{pharmacistCount}</p>
                        <p className="stat-change">Licensed professionals</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon leave">
                        <MdAccessTime />
                    </div>
                    <div className="stat-content">
                        <h3>On Leave</h3>
                        <p className="stat-number">{onLeaveStaff}</p>
                        <p className="stat-change">Currently unavailable</p>
                    </div>
                </div>
            </div>

            {/* Controls Section */}
            <div className="controls-section">
                <div className="search-box">
                    <MdSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <label>Role</label>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="filter-select"
                        >
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role === "all" ? "All Roles" : role}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="on-leave">On Leave</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <button className="filter-btn">
                        <MdFilterList className="btn-icon" />
                        More Filters
                    </button>

                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                            onClick={() => setViewMode("grid")}
                            title="Grid View"
                        >
                            ▦
                        </button>
                        <button
                            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                            onClick={() => setViewMode("list")}
                            title="List View"
                        >
                            ☰
                        </button>
                    </div>

                    <button className="export-btn">
                        <MdDownload className="btn-icon" />
                        Export
                    </button>
                </div>
            </div>

            {/* Staff Grid/List View */}
            {viewMode === "grid" ? (
                <div className="staff-grid">
                    {filteredStaff.map((staff) => (
                        <div key={staff.id} className="staff-card">
                            <div className="card-header">
                                <div className="staff-avatar">
                                    <span className="avatar-icon">
                                        {staff.avatar}
                                    </span>
                                    <span
                                        className="status-dot"
                                        style={{
                                            backgroundColor: getStatusColor(
                                                staff.status,
                                            ),
                                        }}
                                    ></span>
                                </div>
                                <div className="staff-basic-info">
                                    <h3>{staff.name}</h3>
                                    <div className="staff-role">
                                        {getRoleIcon(staff.role)}
                                        <span>{staff.role}</span>
                                    </div>
                                    <div className="staff-id">{staff.id}</div>
                                </div>
                                <button className="more-options">
                                    <MdMoreVert />
                                </button>
                            </div>

                            <div className="card-body">
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <MdEmail className="contact-icon" />
                                        <span className="contact-text">
                                            {staff.email}
                                        </span>
                                    </div>
                                    <div className="contact-item">
                                        <MdPhone className="contact-icon" />
                                        <span className="contact-text">
                                            {staff.phone}
                                        </span>
                                    </div>
                                </div>

                                <div className="staff-details">
                                    <div className="detail-item">
                                        <MdWork className="detail-icon" />
                                        <div className="detail-content">
                                            <small>Department</small>
                                            <span>{staff.department}</span>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <MdCalendarToday className="detail-icon" />
                                        <div className="detail-content">
                                            <small>Hire Date</small>
                                            <span>
                                                {formatDate(staff.hireDate)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="permissions-section">
                                    <div className="section-header">
                                        <MdSecurity className="section-icon" />
                                        <span>Permissions</span>
                                    </div>
                                    <div className="permissions-list">
                                        {staff.permissions.map(
                                            (perm, index) => (
                                                <span
                                                    key={index}
                                                    className="permission-tag"
                                                >
                                                    {getPermissionLabel(perm)}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>

                                <div className="last-active">
                                    <small>
                                        Last active: {staff.lastActive}
                                    </small>
                                </div>
                            </div>

                            {/* Updated Action Buttons */}
                            <div className="card-footer">
                                <button
                                    className="action-btn edit-btn"
                                    onClick={() => handleEditStaff(staff.id)}
                                    title="Edit Staff"
                                >
                                    <MdVisibility className="action-icon" />
                                    <span className="action-text">Edit</span>
                                </button>
                                <button
                                    className="action-btn edit-btn"
                                    onClick={() => handleEditStaff(staff.id)}
                                    title="Edit Staff"
                                >
                                    <MdEdit className="action-icon" />
                                    <span className="action-text">Edit</span>
                                </button>
                                <button
                                    className="action-btn email-btn"
                                    onClick={() =>
                                        handleEmailStaff(staff.email)
                                    }
                                    title="Send Email"
                                >
                                    <MdMailOutline className="action-icon" />
                                    <span className="action-text">Email</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="staff-list">
                    <div className="list-header">
                        <div className="list-cell">Staff Member</div>
                        <div className="list-cell">Role</div>
                        <div className="list-cell">Department</div>
                        <div className="list-cell">Schedule</div>
                        <div className="list-cell">Status</div>
                        <div className="list-cell">Actions</div>
                    </div>

                    {filteredStaff.map((staff) => (
                        <div key={staff.id} className="list-row">
                            <div className="list-cell staff-info">
                                <div className="list-avatar">
                                    {staff.avatar}
                                </div>
                                <div className="list-details">
                                    <strong>{staff.name}</strong>
                                    <small>{staff.email}</small>
                                </div>
                            </div>
                            <div className="list-cell">
                                <div className="role-cell">
                                    {getRoleIcon(staff.role)}
                                    <span>{staff.role}</span>
                                </div>
                            </div>
                            <div className="list-cell">
                                <MdLocationOn className="cell-icon" />
                                <span>{staff.department}</span>
                            </div>
                            <div className="list-cell">
                                <span className="schedule-badge">
                                    {staff.schedule}
                                </span>
                            </div>
                            <div className="list-cell">
                                <span
                                    className="status-badge"
                                    style={{
                                        backgroundColor: getStatusColor(
                                            staff.status,
                                        ),
                                    }}
                                >
                                    {getStatusText(staff.status)}
                                </span>
                            </div>
                            <div className="list-cell actions">
                                <button
                                    className="icon-btn view-btn"
                                    title="View Profile"
                                    onClick={() => handleViewProfile(staff.id)}
                                >
                                    <MdVisibility />
                                </button>
                                <button
                                    className="icon-btn edit-btn"
                                    title="Edit"
                                    onClick={() => handleEditStaff(staff.id)}
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    className="icon-btn email-btn"
                                    title="Email"
                                    onClick={() =>
                                        handleEmailStaff(staff.email)
                                    }
                                >
                                    <MdMailOutline />
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
            )}

            {filteredStaff.length === 0 && (
                <div className="no-results">
                    <div className="no-results-icon">👥</div>
                    <h3>No staff members found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}

            {/* Quick Actions */}
            <div className="quick-actions-section">
                <h3>Quick Actions</h3>
                <div className="quick-actions-grid">
                    <button className="quick-action-btn">
                        <div className="action-icon">📋</div>
                        <span>Schedule Shift</span>
                        <small>Create new schedule</small>
                    </button>

                    <button className="quick-action-btn">
                        <div className="action-icon">📧</div>
                        <span>Send Announcement</span>
                        <small>Email all staff</small>
                    </button>

                    <button className="quick-action-btn">
                        <div className="action-icon">📊</div>
                        <span>Attendance Report</span>
                        <small>View attendance</small>
                    </button>

                    <button className="quick-action-btn">
                        <div className="action-icon">🔐</div>
                        <span>Permission Groups</span>
                        <small>Manage access levels</small>
                    </button>
                </div>
            </div>

            {/* Today's Schedule */}
            <div className="schedule-section">
                <div className="section-header">
                    <h3>Today's Schedule</h3>
                    <button className="view-schedule-btn">
                        View Full Schedule →
                    </button>
                </div>
                <div className="schedule-timeline">
                    <div className="time-slot">
                        <div className="time-label">Morning (8AM - 12PM)</div>
                        <div className="staff-on-duty">
                            <span className="staff-tag">Dr. Sarah Johnson</span>
                            <span className="staff-tag">Mike Williams</span>
                            <span className="staff-tag">Robert Davis</span>
                        </div>
                    </div>
                    <div className="time-slot">
                        <div className="time-label">Afternoon (12PM - 4PM)</div>
                        <div className="staff-on-duty">
                            <span className="staff-tag">Lisa Chen</span>
                            <span className="staff-tag">David Miller</span>
                            <span className="staff-tag">Mike Williams</span>
                        </div>
                    </div>
                    <div className="time-slot">
                        <div className="time-label">Evening (4PM - 8PM)</div>
                        <div className="staff-on-duty">
                            <span className="staff-tag">Dr. Sarah Johnson</span>
                            <span className="staff-tag">Robert Davis</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Staff;
