// components/Stock/AddStockModal.jsx
import React, { useState } from "react";

import "./AddStockModal.css";
import { MdClose, MdAdd, MdSearch, MdCheck } from "react-icons/md";

const AddStockModal = ({ isOpen, onClose, onAddStock }) => {
    const [formData, setFormData] = useState({
        medicineId: "",
        batchNumber: "",
        quantity: "",
        purchasePrice: "",
        sellingPrice: "",
        supplier: "",
        purchaseDate: new Date().toISOString().split("T")[0],
        expiryDate: "",
        storageLocation: "Shelf A",
        notes: "",
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [step, setStep] = useState(1); // For multi-step form

    const medicines = [
        { id: 1, name: "Paracetamol 500mg", generic: "Acetaminophen" },
        { id: 2, name: "Amoxicillin 250mg", generic: "Amoxicillin" },
        { id: 3, name: "Metformin 500mg", generic: "Metformin" },
        // ... more medicines
    ];

    const filteredMedicines = medicines.filter(
        (med) =>
            med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            med.generic.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddStock(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="stock-modal" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="modal-header">
                    <h2>Add New Stock</h2>
                    <button className="close-btn" onClick={onClose}>
                        <MdClose />
                    </button>
                </div>

                {/* Step Indicator */}
                <div className="step-indicator">
                    <div className={`step ${step >= 1 ? "active" : ""}`}>
                        <span className="step-number">1</span>
                        <span className="step-label">Select Medicine</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${step >= 2 ? "active" : ""}`}>
                        <span className="step-number">2</span>
                        <span className="step-label">Stock Details</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${step >= 3 ? "active" : ""}`}>
                        <span className="step-number">3</span>
                        <span className="step-label">Confirmation</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Medicine Selection */}
                    {step === 1 && (
                        <div className="modal-step">
                            <div className="form-group">
                                <label>Search Medicine</label>
                                <div className="search-box">
                                    <MdSearch className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search by name or generic..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="search-input"
                                    />
                                </div>
                            </div>

                            <div className="medicines-list">
                                {filteredMedicines.length > 0 ? (
                                    filteredMedicines.map((med) => (
                                        <div
                                            key={med.id}
                                            className={`medicine-item ${formData.medicineId === med.id ? "selected" : ""}`}
                                            onClick={() =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    medicineId: med.id,
                                                }))
                                            }
                                        >
                                            <div className="medicine-info">
                                                <div className="medicine-name">
                                                    {med.name}
                                                </div>
                                                <div className="medicine-generic">
                                                    {med.generic}
                                                </div>
                                            </div>
                                            {formData.medicineId === med.id && (
                                                <MdCheck className="check-icon" />
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-medicines">
                                        <p>
                                            No medicines found. Add a new
                                            medicine first.
                                        </p>
                                        <button
                                            type="button"
                                            className="add-new-btn"
                                        >
                                            <MdAdd /> Add New Medicine
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="step-actions">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => setStep(2)}
                                    disabled={!formData.medicineId}
                                >
                                    Next: Stock Details
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Stock Details */}
                    {step === 2 && (
                        <div className="modal-step">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Batch Number *</label>
                                    <input
                                        type="text"
                                        name="batchNumber"
                                        value={formData.batchNumber}
                                        onChange={handleInputChange}
                                        placeholder="BATCH-001"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Quantity *</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="1"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Purchase Price ($) *</label>
                                    <input
                                        type="number"
                                        name="purchasePrice"
                                        value={formData.purchasePrice}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Selling Price ($) *</label>
                                    <input
                                        type="number"
                                        name="sellingPrice"
                                        value={formData.sellingPrice}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Supplier</label>
                                    <input
                                        type="text"
                                        name="supplier"
                                        value={formData.supplier}
                                        onChange={handleInputChange}
                                        placeholder="Supplier name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Purchase Date</label>
                                    <input
                                        type="date"
                                        name="purchaseDate"
                                        value={formData.purchaseDate}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Expiry Date *</label>
                                    <input
                                        type="date"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Storage Location</label>
                                    <select
                                        name="storageLocation"
                                        value={formData.storageLocation}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Shelf A">Shelf A</option>
                                        <option value="Shelf B">Shelf B</option>
                                        <option value="Refrigerator">
                                            Refrigerator
                                        </option>
                                        <option value="Cabinet">Cabinet</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Notes</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    placeholder="Additional notes..."
                                    rows="3"
                                />
                            </div>

                            <div className="step-actions">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setStep(1)}
                                >
                                    ← Back
                                </button>
                                <button
                                    type="button"
                                    className="btn-primary"
                                    onClick={() => setStep(3)}
                                >
                                    Next: Review
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 3 && (
                        <div className="modal-step">
                            <div className="confirmation-section">
                                <h3>Review Stock Details</h3>

                                <div className="review-grid">
                                    <div className="review-item">
                                        <span className="review-label">
                                            Medicine:
                                        </span>
                                        <span className="review-value">
                                            {medicines.find(
                                                (m) =>
                                                    m.id ===
                                                    formData.medicineId,
                                            )?.name || "Not selected"}
                                        </span>
                                    </div>
                                    <div className="review-item">
                                        <span className="review-label">
                                            Batch Number:
                                        </span>
                                        <span className="review-value">
                                            {formData.batchNumber}
                                        </span>
                                    </div>
                                    <div className="review-item">
                                        <span className="review-label">
                                            Quantity:
                                        </span>
                                        <span className="review-value">
                                            {formData.quantity}
                                        </span>
                                    </div>
                                    <div className="review-item">
                                        <span className="review-label">
                                            Purchase Price:
                                        </span>
                                        <span className="review-value">
                                            ${formData.purchasePrice}
                                        </span>
                                    </div>
                                    <div className="review-item">
                                        <span className="review-label">
                                            Selling Price:
                                        </span>
                                        <span className="review-value">
                                            ${formData.sellingPrice}
                                        </span>
                                    </div>
                                    <div className="review-item">
                                        <span className="review-label">
                                            Expiry Date:
                                        </span>
                                        <span className="review-value">
                                            {formData.expiryDate}
                                        </span>
                                    </div>
                                </div>

                                <div className="stock-summary">
                                    <h4>Stock Summary</h4>
                                    <div className="summary-item">
                                        <span>Total Investment:</span>
                                        <span className="summary-value">
                                            $
                                            {(
                                                formData.quantity *
                                                formData.purchasePrice
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="summary-item">
                                        <span>Potential Revenue:</span>
                                        <span className="summary-value revenue">
                                            $
                                            {(
                                                formData.quantity *
                                                formData.sellingPrice
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="summary-item">
                                        <span>Expected Profit:</span>
                                        <span className="summary-value profit">
                                            $
                                            {(
                                                formData.quantity *
                                                (formData.sellingPrice -
                                                    formData.purchasePrice)
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="step-actions">
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={() => setStep(2)}
                                >
                                    ← Edit Details
                                </button>
                                <button
                                    type="submit"
                                    className="btn-primary submit-btn"
                                >
                                    <MdAdd /> Add to Stock
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddStockModal;
