import React, { useState } from "react";
import "./PurchaseModal.css";
import {
    MdClose,
    MdAdd,
    MdRemove,
    MdLocalShipping,
    MdCalendarToday,
    MdAttachMoney,
} from "react-icons/md";

const PurchaseModal = ({ isOpen, onClose, onSave }) => {
    const [purchaseData, setPurchaseData] = useState({
        supplier: "",
        orderDate: new Date().toISOString().split("T")[0],
        expectedDate: "",
        notes: "",
        items: [{ id: 1, medicine: "", quantity: 1, unitPrice: 0, total: 0 }],
    });

    const suppliers = [
        {
            id: 1,
            name: "MediCorp Pharmaceuticals",
            contact: "contact@medicorp.com",
        },
        {
            id: 2,
            name: "HealthPlus Distributors",
            contact: "sales@healthplus.com",
        },
        {
            id: 3,
            name: "PharmaCare Suppliers",
            contact: "orders@pharmacare.com",
        },
        {
            id: 4,
            name: "Global Medical Inc.",
            contact: "support@globalmedical.com",
        },
        { id: 5, name: "BioPharma Solutions", contact: "info@biopharma.com" },
    ];

    const medicines = [
        {
            id: 1,
            name: "Paracetamol 500mg",
            category: "Pain Relief",
            unitPrice: 2.5,
        },
        {
            id: 2,
            name: "Amoxicillin 250mg",
            category: "Antibiotic",
            unitPrice: 4.75,
        },
        {
            id: 3,
            name: "Metformin 500mg",
            category: "Diabetic",
            unitPrice: 3.2,
        },
        {
            id: 4,
            name: "Atorvastatin 20mg",
            category: "Cholesterol",
            unitPrice: 5.1,
        },
        {
            id: 5,
            name: "Omeprazole 20mg",
            category: "Acid Reducer",
            unitPrice: 3.8,
        },
        {
            id: 6,
            name: "Ibuprofen 400mg",
            category: "Pain Relief",
            unitPrice: 2.9,
        },
        {
            id: 7,
            name: "Lisinopril 10mg",
            category: "Blood Pressure",
            unitPrice: 4.25,
        },
        {
            id: 8,
            name: "Salbutamol Inhaler",
            category: "Respiratory",
            unitPrice: 8.5,
        },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPurchaseData({
            ...purchaseData,
            [name]: value,
        });
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...purchaseData.items];
        updatedItems[index] = {
            ...updatedItems[index],
            [field]: value,
        };

        // Calculate total if quantity or unitPrice changes
        if (field === "quantity" || field === "unitPrice") {
            const quantity =
                field === "quantity" ? value : updatedItems[index].quantity;
            const unitPrice =
                field === "unitPrice"
                    ? parseFloat(value) || 0
                    : updatedItems[index].unitPrice;
            updatedItems[index].total = quantity * unitPrice;
        }

        setPurchaseData({
            ...purchaseData,
            items: updatedItems,
        });
    };

    const addNewItem = () => {
        setPurchaseData({
            ...purchaseData,
            items: [
                ...purchaseData.items,
                {
                    id: Date.now(),
                    medicine: "",
                    quantity: 1,
                    unitPrice: 0,
                    total: 0,
                },
            ],
        });
    };

    const removeItem = (index) => {
        if (purchaseData.items.length > 1) {
            const updatedItems = purchaseData.items.filter(
                (_, i) => i !== index,
            );
            setPurchaseData({
                ...purchaseData,
                items: updatedItems,
            });
        }
    };

    const calculateTotal = () => {
        return purchaseData.items.reduce(
            (sum, item) => sum + (item.total || 0),
            0,
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const purchaseOrder = {
            ...purchaseData,
            totalAmount: calculateTotal(),
            orderNumber: `PO-${new Date().getFullYear()}-${Math.floor(
                Math.random() * 1000,
            )
                .toString()
                .padStart(3, "0")}`,
            createdAt: new Date().toISOString(),
            status: "pending",
        };

        onSave(purchaseOrder);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="purchase-modal">
                {/* Modal Header */}
                <div className="modal-header">
                    <h2>New Purchase Order</h2>
                    <button className="close-btn" onClick={onClose}>
                        <MdClose />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-content">
                        {/* Basic Information */}
                        <div className="form-section">
                            <h3 className="section-title">Order Information</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="supplier">Supplier *</label>
                                    <select
                                        id="supplier"
                                        name="supplier"
                                        value={purchaseData.supplier}
                                        onChange={handleInputChange}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">
                                            Select Supplier
                                        </option>
                                        {suppliers.map((supplier) => (
                                            <option
                                                key={supplier.id}
                                                value={supplier.name}
                                            >
                                                {supplier.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="orderDate">
                                        Order Date *
                                    </label>
                                    <div className="input-with-icon">
                                        <MdCalendarToday className="input-icon" />
                                        <input
                                            type="date"
                                            id="orderDate"
                                            name="orderDate"
                                            value={purchaseData.orderDate}
                                            onChange={handleInputChange}
                                            className="form-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="expectedDate">
                                        Expected Delivery
                                    </label>
                                    <div className="input-with-icon">
                                        <MdLocalShipping className="input-icon" />
                                        <input
                                            type="date"
                                            id="expectedDate"
                                            name="expectedDate"
                                            value={purchaseData.expectedDate}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="notes">Notes (Optional)</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={purchaseData.notes}
                                    onChange={handleInputChange}
                                    className="form-textarea"
                                    placeholder="Any special instructions or notes..."
                                    rows="3"
                                />
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="form-section">
                            <div className="section-header">
                                <h3 className="section-title">Order Items</h3>
                                <button
                                    type="button"
                                    className="add-item-btn"
                                    onClick={addNewItem}
                                >
                                    <MdAdd />
                                    Add Item
                                </button>
                            </div>

                            <div className="items-table">
                                <div className="table-header-row">
                                    <div className="table-cell">Medicine</div>
                                    <div className="table-cell">Quantity</div>
                                    <div className="table-cell">Unit Price</div>
                                    <div className="table-cell">Total</div>
                                    <div className="table-cell">Action</div>
                                </div>

                                {purchaseData.items.map((item, index) => (
                                    <div key={item.id} className="table-row">
                                        <div className="table-cell">
                                            <select
                                                value={item.medicine}
                                                onChange={(e) =>
                                                    handleItemChange(
                                                        index,
                                                        "medicine",
                                                        e.target.value,
                                                    )
                                                }
                                                className="item-select"
                                            >
                                                <option value="">
                                                    Select Medicine
                                                </option>
                                                {medicines.map((medicine) => (
                                                    <option
                                                        key={medicine.id}
                                                        value={medicine.name}
                                                    >
                                                        {medicine.name} - $
                                                        {medicine.unitPrice.toFixed(
                                                            2,
                                                        )}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="table-cell">
                                            <div className="quantity-control">
                                                <button
                                                    type="button"
                                                    className="qty-btn"
                                                    onClick={() =>
                                                        handleItemChange(
                                                            index,
                                                            "quantity",
                                                            Math.max(
                                                                1,
                                                                item.quantity -
                                                                    1,
                                                            ),
                                                        )
                                                    }
                                                >
                                                    <MdRemove />
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "quantity",
                                                            parseInt(
                                                                e.target.value,
                                                            ) || 1,
                                                        )
                                                    }
                                                    className="qty-input"
                                                    min="1"
                                                />
                                                <button
                                                    type="button"
                                                    className="qty-btn"
                                                    onClick={() =>
                                                        handleItemChange(
                                                            index,
                                                            "quantity",
                                                            item.quantity + 1,
                                                        )
                                                    }
                                                >
                                                    <MdAdd />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="table-cell">
                                            <div className="input-with-currency">
                                                <span className="currency">
                                                    $
                                                </span>
                                                <input
                                                    type="number"
                                                    value={item.unitPrice}
                                                    onChange={(e) =>
                                                        handleItemChange(
                                                            index,
                                                            "unitPrice",
                                                            parseFloat(
                                                                e.target.value,
                                                            ) || 0,
                                                        )
                                                    }
                                                    className="price-input"
                                                    min="0"
                                                    step="0.01"
                                                />
                                            </div>
                                        </div>

                                        <div className="table-cell total-cell">
                                            <div className="input-with-currency">
                                                <span className="currency">
                                                    $
                                                </span>
                                                <input
                                                    type="text"
                                                    value={item.total.toFixed(
                                                        2,
                                                    )}
                                                    readOnly
                                                    className="total-input"
                                                />
                                            </div>
                                        </div>

                                        <div className="table-cell">
                                            {purchaseData.items.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="remove-btn"
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                >
                                                    <MdRemove />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary Section */}
                        <div className="summary-section">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax (10%)</span>
                                <span>
                                    ${(calculateTotal() * 0.1).toFixed(2)}
                                </span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <div className="shipping-input">
                                    <span className="currency">$</span>
                                    <input
                                        type="number"
                                        defaultValue="0"
                                        className="shipping-amount"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <div className="summary-row total">
                                <span>Total Amount</span>
                                <span className="total-amount">
                                    <MdAttachMoney />$
                                    {(calculateTotal() * 1.1).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Create Purchase Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PurchaseModal;
