import React, { useState } from "react";
import {
    MdClose,
    MdPersonAdd,
    MdEmail,
    MdPhone,
    MdLocationOn,
    MdBadge,
    MdCalendarToday,
    MdLock,
    MdVisibility,
    MdVisibilityOff,
    MdUpload,
    MdDescription,
    MdCheckCircle,
    MdMedicalServices,
    MdLocalPharmacy,
    MdSupervisorAccount,
    MdAdminPanelSettings,
    MdAssignmentInd,
    MdKeyboardArrowDown,
} from "react-icons/md";
import "./AddStaffModal.css";

const AddStaffModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        position: "",
        role: "technician",
        department: "pharmacy",
        joinDate: new Date().toISOString().split("T")[0],
        salary: "",
        specialization: "",
        licenseNumber: "",
        licenseExpiry: "",
        emergencyContact: "",
        emergencyPhone: "",
        qualifications: [],
        experience: "",
        notes: "",
    });

    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false,
    });

    const [profileImage, setProfileImage] = useState(null);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const roles = [
        { value: "pharmacist", label: "Pharmacist", icon: <MdLocalPharmacy /> },
        {
            value: "technician",
            label: "Pharmacy Technician",
            icon: <MdMedicalServices />,
        },
        { value: "manager", label: "Manager", icon: <MdSupervisorAccount /> },
        {
            value: "admin",
            label: "Administrator",
            icon: <MdAdminPanelSettings />,
        },
        {
            value: "receptionist",
            label: "Receptionist",
            icon: <MdAssignmentInd />,
        },
    ];

    const departments = [
        { value: "pharmacy", label: "Pharmacy" },
        { value: "administration", label: "Administration" },
        { value: "inventory", label: "Inventory" },
        { value: "billing", label: "Billing" },
        { value: "customer_service", label: "Customer Service" },
    ];

    const positions = {
        pharmacist: [
            "Senior Pharmacist",
            "Clinical Pharmacist",
            "Retail Pharmacist",
        ],
        technician: ["Lead Technician", "Certified Technician", "Trainee"],
        manager: ["Store Manager", "Department Manager", "Shift Manager"],
        admin: ["System Admin", "HR Admin", "Finance Admin"],
        receptionist: [
            "Front Desk",
            "Customer Service",
            "Appointment Coordinator",
        ],
    };

    const qualifications = [
        "Pharm.D",
        "B.Pharm",
        "M.Pharm",
        "Pharmacy Technician Certification",
        "CPHT",
        "Sterile Compounding Certification",
        "Immunization Certification",
        "MBA in Healthcare",
    ];

    const permissionsList = [
        {
            id: "view_inventory",
            label: "View Inventory",
            description: "Can view medicine stock",
        },
        {
            id: "edit_inventory",
            label: "Edit Inventory",
            description: "Can add/update medicines",
        },
        {
            id: "process_prescriptions",
            label: "Process Prescriptions",
            description: "Can dispense medicines",
        },
        {
            id: "view_patients",
            label: "View Patients",
            description: "Can access patient records",
        },
        {
            id: "edit_patients",
            label: "Edit Patients",
            description: "Can update patient information",
        },
        {
            id: "create_bills",
            label: "Create Bills",
            description: "Can generate invoices",
        },
        {
            id: "view_reports",
            label: "View Reports",
            description: "Can access system reports",
        },
        {
            id: "manage_users",
            label: "Manage Users",
            description: "Can add/edit other staff",
        },
        {
            id: "system_settings",
            label: "System Settings",
            description: "Can modify system settings",
        },
        {
            id: "backup_restore",
            label: "Backup & Restore",
            description: "Can backup system data",
        },
    ];

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Clear error for this field
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: null,
            }));
        }

        // Update positions based on role
        if (field === "role") {
            setFormData((prev) => ({
                ...prev,
                position: "",
            }));
        }
    };

    const handlePasswordChange = (field, value) => {
        setPassword((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                // 5MB limit
                setErrors((prev) => ({
                    ...prev,
                    profileImage: "File size should be less than 5MB",
                }));
                return;
            }
            if (!file.type.startsWith("image/")) {
                setErrors((prev) => ({
                    ...prev,
                    profileImage: "Please upload an image file",
                }));
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
            setErrors((prev) => ({
                ...prev,
                profileImage: null,
            }));
        }
    };

    const handlePermissionToggle = (permissionId) => {
        setSelectedPermissions((prev) => {
            if (prev.includes(permissionId)) {
                return prev.filter((id) => id !== permissionId);
            } else {
                return [...prev, permissionId];
            }
        });
    };

    const handleQualificationToggle = (qualification) => {
        setFormData((prev) => {
            const currentQuals = [...prev.qualifications];
            if (currentQuals.includes(qualification)) {
                return {
                    ...prev,
                    qualifications: currentQuals.filter(
                        (q) => q !== qualification,
                    ),
                };
            } else {
                return {
                    ...prev,
                    qualifications: [...currentQuals, qualification],
                };
            }
        });
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.firstName.trim())
                newErrors.firstName = "First name is required";
            if (!formData.lastName.trim())
                newErrors.lastName = "Last name is required";
            if (!formData.email.trim()) {
                newErrors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Invalid email format";
            }
            if (!formData.phone.trim()) {
                newErrors.phone = "Phone number is required";
            } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) {
                newErrors.phone = "Invalid phone number";
            }
            if (!formData.role) newErrors.role = "Role is required";
            if (!formData.position) newErrors.position = "Position is required";
        }

        if (step === 2) {
            if (password.newPassword.length < 8) {
                newErrors.newPassword =
                    "Password must be at least 8 characters";
            }
            if (password.newPassword !== password.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, 3));
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        if (!validateStep(3)) return;

        setIsSubmitting(true);
        try {
            const staffData = {
                ...formData,
                profileImage,
                permissions: selectedPermissions,
                password: password.newPassword,
                status: "active",
                createdAt: new Date().toISOString(),
            };

            // In a real app, you would make an API call here
            console.log("Submitting staff data:", staffData);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (onSave) {
                onSave(staffData);
            }
            handleReset();
            onClose();
        } catch (error) {
            console.error("Error adding staff:", error);
            setErrors((prev) => ({
                ...prev,
                submit: "Failed to add staff member. Please try again.",
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            position: "",
            role: "technician",
            department: "pharmacy",
            joinDate: new Date().toISOString().split("T")[0],
            salary: "",
            specialization: "",
            licenseNumber: "",
            licenseExpiry: "",
            emergencyContact: "",
            emergencyPhone: "",
            qualifications: [],
            experience: "",
            notes: "",
        });
        setPassword({
            newPassword: "",
            confirmPassword: "",
            showPassword: false,
            showConfirmPassword: false,
        });
        setProfileImage(null);
        setSelectedPermissions([]);
        setErrors({});
        setCurrentStep(1);
    };

    const renderStepIndicator = () => (
        <div className="step-indicator">
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
                <span className="step-number">1</span>
                <span className="step-label">Basic Info</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
                <span className="step-number">2</span>
                <span className="step-label">Security</span>
            </div>
            <div className="step-line"></div>
            <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
                <span className="step-number">3</span>
                <span className="step-label">Permissions</span>
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="form-step">
            <h3>Basic Information</h3>
            <div className="form-grid">
                {/* Profile Image Upload */}
                <div className="form-group profile-upload">
                    <label>Profile Photo</label>
                    <div className="upload-area">
                        <div className="upload-preview">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile preview"
                                    className="profile-preview"
                                />
                            ) : (
                                <div className="upload-placeholder">
                                    <MdUpload className="upload-icon" />
                                    <span>Upload Photo</span>
                                    <span className="upload-hint">
                                        JPG, PNG up to 5MB
                                    </span>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="file-input"
                        />
                        <label htmlFor="profileImage" className="upload-btn">
                            Choose File
                        </label>
                        {errors.profileImage && (
                            <span className="error-message">
                                {errors.profileImage}
                            </span>
                        )}
                    </div>
                </div>

                {/* Personal Information */}
                <div className="form-group">
                    <label>
                        <MdPersonAdd className="input-icon" />
                        First Name *
                    </label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                        }
                        placeholder="Enter first name"
                        className={errors.firstName ? "error" : ""}
                    />
                    {errors.firstName && (
                        <span className="error-message">
                            {errors.firstName}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label>
                        <MdPersonAdd className="input-icon" />
                        Last Name *
                    </label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                        }
                        placeholder="Enter last name"
                        className={errors.lastName ? "error" : ""}
                    />
                    {errors.lastName && (
                        <span className="error-message">{errors.lastName}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>
                        <MdEmail className="input-icon" />
                        Email Address *
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                            handleInputChange("email", e.target.value)
                        }
                        placeholder="staff@pharmacare.com"
                        className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                        <span className="error-message">{errors.email}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>
                        <MdPhone className="input-icon" />
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                        }
                        placeholder="+1 (555) 123-4567"
                        className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && (
                        <span className="error-message">{errors.phone}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>
                        <MdLocationOn className="input-icon" />
                        Address
                    </label>
                    <textarea
                        value={formData.address}
                        onChange={(e) =>
                            handleInputChange("address", e.target.value)
                        }
                        placeholder="Enter residential address"
                        rows="3"
                    />
                </div>

                {/* Professional Information */}
                <div className="form-group">
                    <label>
                        <MdBadge className="input-icon" />
                        Role *
                    </label>
                    <div className="role-options">
                        {roles.map((role) => (
                            <button
                                key={role.value}
                                type="button"
                                className={`role-option ${formData.role === role.value ? "selected" : ""}`}
                                onClick={() =>
                                    handleInputChange("role", role.value)
                                }
                            >
                                <span className="role-icon">{role.icon}</span>
                                <span className="role-label">{role.label}</span>
                            </button>
                        ))}
                    </div>
                    {errors.role && (
                        <span className="error-message">{errors.role}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Position *</label>
                    <div className="custom-select">
                        <select
                            value={formData.position}
                            onChange={(e) =>
                                handleInputChange("position", e.target.value)
                            }
                            className={errors.position ? "error" : ""}
                        >
                            <option value="">Select Position</option>
                            {positions[formData.role]?.map((pos) => (
                                <option
                                    key={pos}
                                    value={pos
                                        .toLowerCase()
                                        .replace(/\s+/g, "_")}
                                >
                                    {pos}
                                </option>
                            ))}
                        </select>
                        <MdKeyboardArrowDown className="select-arrow" />
                    </div>
                    {errors.position && (
                        <span className="error-message">{errors.position}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Department</label>
                    <div className="custom-select">
                        <select
                            value={formData.department}
                            onChange={(e) =>
                                handleInputChange("department", e.target.value)
                            }
                        >
                            {departments.map((dept) => (
                                <option key={dept.value} value={dept.value}>
                                    {dept.label}
                                </option>
                            ))}
                        </select>
                        <MdKeyboardArrowDown className="select-arrow" />
                    </div>
                </div>

                <div className="form-group">
                    <label>
                        <MdCalendarToday className="input-icon" />
                        Join Date
                    </label>
                    <input
                        type="date"
                        value={formData.joinDate}
                        onChange={(e) =>
                            handleInputChange("joinDate", e.target.value)
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Salary ($)</label>
                    <input
                        type="number"
                        value={formData.salary}
                        onChange={(e) =>
                            handleInputChange("salary", e.target.value)
                        }
                        placeholder="e.g., 5000"
                        min="0"
                        step="100"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="form-step">
            <h3>Security & Credentials</h3>

            <div className="password-section">
                <div className="form-group">
                    <label>
                        <MdLock className="input-icon" />
                        New Password *
                    </label>
                    <div className="password-input">
                        <input
                            type={password.showPassword ? "text" : "password"}
                            value={password.newPassword}
                            onChange={(e) =>
                                handlePasswordChange(
                                    "newPassword",
                                    e.target.value,
                                )
                            }
                            placeholder="Enter strong password"
                            className={errors.newPassword ? "error" : ""}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() =>
                                handlePasswordChange(
                                    "showPassword",
                                    !password.showPassword,
                                )
                            }
                        >
                            {password.showPassword ? (
                                <MdVisibilityOff />
                            ) : (
                                <MdVisibility />
                            )}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <span className="error-message">
                            {errors.newPassword}
                        </span>
                    )}

                    <div className="password-strength">
                        <div className="strength-indicator">
                            <div
                                className={`strength-bar ${password.newPassword.length >= 8 ? "weak" : ""}`}
                            ></div>
                            <div
                                className={`strength-bar ${password.newPassword.length >= 12 ? "medium" : ""}`}
                            ></div>
                            <div
                                className={`strength-bar ${/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password.newPassword) ? "strong" : ""}`}
                            ></div>
                        </div>
                        <div className="strength-text">
                            {password.newPassword.length === 0 &&
                                "Enter password"}
                            {password.newPassword.length > 0 &&
                                password.newPassword.length < 8 &&
                                "Weak"}
                            {password.newPassword.length >= 8 &&
                                password.newPassword.length < 12 &&
                                "Medium"}
                            {password.newPassword.length >= 12 &&
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
                                    password.newPassword,
                                ) &&
                                "Strong"}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>
                        <MdLock className="input-icon" />
                        Confirm Password *
                    </label>
                    <div className="password-input">
                        <input
                            type={
                                password.showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            value={password.confirmPassword}
                            onChange={(e) =>
                                handlePasswordChange(
                                    "confirmPassword",
                                    e.target.value,
                                )
                            }
                            placeholder="Confirm password"
                            className={errors.confirmPassword ? "error" : ""}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() =>
                                handlePasswordChange(
                                    "showConfirmPassword",
                                    !password.showConfirmPassword,
                                )
                            }
                        >
                            {password.showConfirmPassword ? (
                                <MdVisibilityOff />
                            ) : (
                                <MdVisibility />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <span className="error-message">
                            {errors.confirmPassword}
                        </span>
                    )}
                </div>

                <div className="password-requirements">
                    <h4>Password Requirements:</h4>
                    <ul>
                        <li
                            className={
                                password.newPassword.length >= 8
                                    ? "met"
                                    : "unmet"
                            }
                        >
                            <MdCheckCircle /> At least 8 characters
                        </li>
                        <li
                            className={
                                /[A-Z]/.test(password.newPassword)
                                    ? "met"
                                    : "unmet"
                            }
                        >
                            <MdCheckCircle /> One uppercase letter
                        </li>
                        <li
                            className={
                                /[a-z]/.test(password.newPassword)
                                    ? "met"
                                    : "unmet"
                            }
                        >
                            <MdCheckCircle /> One lowercase letter
                        </li>
                        <li
                            className={
                                /[0-9]/.test(password.newPassword)
                                    ? "met"
                                    : "unmet"
                            }
                        >
                            <MdCheckCircle /> One number
                        </li>
                        <li
                            className={
                                /[@$!%*?&]/.test(password.newPassword)
                                    ? "met"
                                    : "unmet"
                            }
                        >
                            <MdCheckCircle /> One special character
                        </li>
                    </ul>
                </div>
            </div>

            <div className="form-grid">
                <div className="form-group">
                    <label>License Number</label>
                    <input
                        type="text"
                        value={formData.licenseNumber}
                        onChange={(e) =>
                            handleInputChange("licenseNumber", e.target.value)
                        }
                        placeholder="e.g., PH123456"
                    />
                </div>

                <div className="form-group">
                    <label>License Expiry Date</label>
                    <input
                        type="date"
                        value={formData.licenseExpiry}
                        onChange={(e) =>
                            handleInputChange("licenseExpiry", e.target.value)
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Specialization</label>
                    <input
                        type="text"
                        value={formData.specialization}
                        onChange={(e) =>
                            handleInputChange("specialization", e.target.value)
                        }
                        placeholder="e.g., Clinical Pharmacy"
                    />
                </div>

                <div className="form-group">
                    <label>Years of Experience</label>
                    <input
                        type="number"
                        value={formData.experience}
                        onChange={(e) =>
                            handleInputChange("experience", e.target.value)
                        }
                        placeholder="e.g., 5"
                        min="0"
                        max="50"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="form-step">
            <h3>Permissions & Qualifications</h3>

            <div className="permissions-section">
                <h4>System Permissions</h4>
                <p className="section-description">
                    Select the permissions you want to grant to this staff
                    member. Permissions are role-based and can be customized.
                </p>

                <div className="permissions-grid">
                    {permissionsList.map((permission) => (
                        <div
                            key={permission.id}
                            className={`permission-card ${selectedPermissions.includes(permission.id) ? "selected" : ""}`}
                            onClick={() =>
                                handlePermissionToggle(permission.id)
                            }
                        >
                            <div className="permission-header">
                                <div className="permission-checkbox">
                                    {selectedPermissions.includes(
                                        permission.id,
                                    ) && (
                                        <MdCheckCircle className="check-icon" />
                                    )}
                                </div>
                                <div className="permission-info">
                                    <h5>{permission.label}</h5>
                                    <p>{permission.description}</p>
                                </div>
                            </div>
                            <div className="permission-badge">
                                {permission.id.includes("view")
                                    ? "Read"
                                    : permission.id.includes("edit")
                                      ? "Write"
                                      : permission.id.includes("manage")
                                        ? "Admin"
                                        : "Execute"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="qualifications-section">
                <h4>Qualifications</h4>
                <div className="qualifications-list">
                    {qualifications.map((qual) => (
                        <div
                            key={qual}
                            className={`qualification-tag ${formData.qualifications.includes(qual) ? "selected" : ""}`}
                            onClick={() => handleQualificationToggle(qual)}
                        >
                            {qual}
                            {formData.qualifications.includes(qual) && (
                                <MdCheckCircle className="check-icon" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="additional-info">
                <div className="form-group">
                    <label>
                        <MdDescription className="input-icon" />
                        Additional Notes
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) =>
                            handleInputChange("notes", e.target.value)
                        }
                        placeholder="Any additional information about the staff member..."
                        rows="4"
                    />
                </div>

                <div className="emergency-contact">
                    <h4>Emergency Contact</h4>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Contact Name</label>
                            <input
                                type="text"
                                value={formData.emergencyContact}
                                onChange={(e) =>
                                    handleInputChange(
                                        "emergencyContact",
                                        e.target.value,
                                    )
                                }
                                placeholder="Emergency contact person"
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Phone</label>
                            <input
                                type="tel"
                                value={formData.emergencyPhone}
                                onChange={(e) =>
                                    handleInputChange(
                                        "emergencyPhone",
                                        e.target.value,
                                    )
                                }
                                placeholder="Emergency phone number"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="add-staff-modal">
                {/* Modal Header */}
                <div className="modal-header">
                    <div className="header-left">
                        <MdPersonAdd className="modal-icon" />
                        <div>
                            <h2>Add New Staff Member</h2>
                            <p className="modal-subtitle">
                                Fill in the details to add a new staff member to
                                the system
                            </p>
                        </div>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <MdClose />
                    </button>
                </div>

                {/* Step Indicator */}
                {renderStepIndicator()}

                {/* Modal Body */}
                <div className="modal-body">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                    <div className="footer-left">
                        <button className="btn-secondary" onClick={handleReset}>
                            Reset Form
                        </button>
                    </div>
                    <div className="footer-right">
                        {currentStep > 1 && (
                            <button
                                className="btn-outline"
                                onClick={handleBack}
                            >
                                Back
                            </button>
                        )}
                        {currentStep < 3 ? (
                            <button
                                className="btn-primary"
                                onClick={handleNext}
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                className="btn-success"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Adding Staff...
                                    </>
                                ) : (
                                    "Add Staff Member"
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {errors.submit && (
                    <div className="error-banner">
                        <span className="error-icon">⚠</span>
                        {errors.submit}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddStaffModal;
