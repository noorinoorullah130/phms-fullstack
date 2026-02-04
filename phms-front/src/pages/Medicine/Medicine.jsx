import React, { useState } from "react";

import "./Medicine.css";

const Medicine = () => {
    const [medicineData, setMedicineData] = useState({
        medicineName: "",
        genericName: "",
        brand: "",
        category: "",
        strength: "",
        expireDate: "",
        currentQuantity: "",
        lastUpdated: new Date().toLocaleDateString(),
    });

    const categories = [
        "Antibiotic",
        "Analgesic",
        "Antihypertensive",
        "Antidiabetic",
        "Antidepressant",
        "Vitamin",
        "Other",
    ];

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setMedicineData({
            ...medicineData,
            [id]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Medicine Data:", medicineData);
        // Add your form submission logic here
    };

    return (
        <div className="medicine">
            <div className="medicine-header">
                <div className="header-content">
                    <h2>Add New Medicine</h2>
                    <p>
                        Add new medicines and their details to the pharmacy
                        inventory
                    </p>
                </div>
                <div className="medicine-stats">
                    <div className="stat-item">
                        <span className="stat-number">1,245</span>
                        <span className="stat-label">Total Medicines</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">42</span>
                        <span className="stat-label">Low Stock</span>
                    </div>
                </div>
            </div>

            <div className="medicine-form-section">
                <form className="medicine-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {/* Medicine Name */}
                        <div className="form-group">
                            <label
                                htmlFor="medicineName"
                                className="form-label"
                            >
                                Medicine Name *
                            </label>
                            <input
                                type="text"
                                id="medicineName"
                                className="form-input"
                                placeholder="e.g., Paracetamol 500mg"
                                value={medicineData.medicineName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Generic Name */}
                        <div className="form-group">
                            <label htmlFor="genericName" className="form-label">
                                Generic Name *
                            </label>
                            <input
                                type="text"
                                id="genericName"
                                className="form-input"
                                placeholder="e.g., Acetaminophen"
                                value={medicineData.genericName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Brand */}
                        <div className="form-group">
                            <label htmlFor="brand" className="form-label">
                                Brand Name
                            </label>
                            <input
                                type="text"
                                id="brand"
                                className="form-input"
                                placeholder="e.g., Tylenol"
                                value={medicineData.brand}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Category */}
                        <div className="form-group">
                            <label htmlFor="category" className="form-label">
                                Category *
                            </label>
                            <select
                                id="category"
                                className="form-select"
                                value={medicineData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Strength */}
                        <div className="form-group">
                            <label htmlFor="strength" className="form-label">
                                Strength *
                            </label>
                            <div className="input-with-unit">
                                <input
                                    type="text"
                                    id="strength"
                                    className="form-input"
                                    placeholder="e.g., 500"
                                    value={medicineData.strength}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span className="unit">mg</span>
                            </div>
                        </div>

                        {/* Expire Date */}
                        <div className="form-group">
                            <label htmlFor="expireDate" className="form-label">
                                Expiry Date *
                            </label>
                            <input
                                type="date"
                                id="expireDate"
                                className="form-input"
                                value={medicineData.expireDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {/* Current Quantity */}
                        <div className="form-group">
                            <label
                                htmlFor="currentQuantity"
                                className="form-label"
                            >
                                Current Quantity *
                            </label>
                            <div className="quantity-input">
                                <input
                                    type="number"
                                    id="currentQuantity"
                                    className="form-input"
                                    placeholder="0"
                                    min="0"
                                    value={medicineData.currentQuantity}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="quantity-actions">
                                    <button type="button" className="qty-btn">
                                        +
                                    </button>
                                    <button type="button" className="qty-btn">
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Last Updated */}
                        <div className="form-group">
                            <label className="form-label">Last Updated</label>
                            <div className="last-updated-display">
                                {medicineData.lastUpdated}
                            </div>
                            <small className="form-hint">
                                Automatically updated
                            </small>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            <span className="btn-icon">💊</span>
                            Add Medicine
                        </button>
                        <button type="button" className="cancel-btn">
                            Cancel
                        </button>
                    </div>
                </form>

                {/* Quick Tips */}
                <div className="quick-tips">
                    <h3>📝 Quick Tips</h3>
                    <ul className="tips-list">
                        <li>All fields marked with * are required</li>
                        <li>Use generic names when possible</li>
                        <li>Check expiry dates regularly</li>
                        <li>Update stock quantities after each transaction</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Medicine;
