import React, { useState } from "react";
import "./NewSaleModal.css";
import {
    MdClose,
    MdSearch,
    MdAdd,
    MdRemove,
    MdDelete,
    MdReceipt,
    MdLocalOffer,
    MdCalculate,
    MdPerson,
} from "react-icons/md";

const NewSaleModal = ({ isOpen, onClose, onCompleteSale }) => {
    const [customerName, setCustomerName] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [discount, setDiscount] = useState(0);
    const [tax, setTax] = useState(8.5); // Default tax rate
    const [notes, setNotes] = useState("");

    // Sample medicine data
    const medicines = [
        {
            id: 1,
            name: "Paracetamol 500mg",
            price: 5.0,
            stock: 150,
            category: "Pain Relief",
        },
        {
            id: 2,
            name: "Ibuprofen 400mg",
            price: 7.5,
            stock: 80,
            category: "Pain Relief",
        },
        {
            id: 3,
            name: "Amoxicillin 250mg",
            price: 12.0,
            stock: 45,
            category: "Antibiotic",
        },
        {
            id: 4,
            name: "Vitamin C 1000mg",
            price: 10.0,
            stock: 120,
            category: "Supplements",
        },
        {
            id: 5,
            name: "Omeprazole 20mg",
            price: 8.75,
            stock: 65,
            category: "Acid Reducer",
        },
        {
            id: 6,
            name: "Cetirizine 10mg",
            price: 6.25,
            stock: 95,
            category: "Allergy",
        },
    ];

    // Cart state
    const [cart, setCart] = useState([]);

    // Filter medicines based on search
    const filteredMedicines = medicines.filter(
        (medicine) =>
            medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            medicine.category.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Add medicine to cart
    const addToCart = (medicine) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (item) => item.id === medicine.id,
            );
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === medicine.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            } else {
                return [...prevCart, { ...medicine, quantity: 1 }];
            }
        });
    };

    // Update cart item quantity
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item,
            ),
        );
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // Calculate totals
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const discountAmount = (subtotal * discount) / 100;
    const taxAmount = ((subtotal - discountAmount) * tax) / 100;
    const total = subtotal - discountAmount + taxAmount;

    // Clear cart
    const clearCart = () => {
        setCart([]);
        setCustomerName("");
        setDiscount(0);
        setNotes("");
    };

    // Complete sale
    const handleCompleteSale = () => {
        if (cart.length === 0) {
            alert("Please add items to the cart");
            return;
        }

        const saleData = {
            customerName: customerName || "Walk-in Customer",
            items: cart,
            subtotal,
            discount: discountAmount,
            tax: taxAmount,
            total,
            paymentMethod,
            date: new Date().toISOString(),
            notes,
        };

        onCompleteSale(saleData);
        clearCart();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="new-sale-modal">
                {/* Modal Header */}
                <div className="modal-header">
                    <h2>New Sale</h2>
                    <button className="close-btn" onClick={onClose}>
                        <MdClose />
                    </button>
                </div>

                <div className="modal-content">
                    {/* Left Column - Product Selection */}
                    <div className="product-selection">
                        {/* Customer Info */}
                        <div className="customer-section">
                            <div className="section-header">
                                <MdPerson className="section-icon" />
                                <h3>Customer Information</h3>
                            </div>
                            <div className="customer-input">
                                <input
                                    type="text"
                                    placeholder="Customer Name (Optional)"
                                    value={customerName}
                                    onChange={(e) =>
                                        setCustomerName(e.target.value)
                                    }
                                    className="customer-name-input"
                                />
                                <input
                                    type="text"
                                    placeholder="Phone Number (Optional)"
                                    className="customer-phone-input"
                                />
                            </div>
                        </div>

                        {/* Medicine Search */}
                        <div className="search-section">
                            <div className="search-box">
                                <MdSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search medicines..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="search-input"
                                />
                            </div>
                        </div>

                        {/* Medicine Grid */}
                        <div className="medicine-grid">
                            {filteredMedicines.map((medicine) => (
                                <div
                                    key={medicine.id}
                                    className="medicine-card"
                                >
                                    <div className="medicine-info">
                                        <h4>{medicine.name}</h4>
                                        <p className="medicine-category">
                                            {medicine.category}
                                        </p>
                                        <div className="medicine-details">
                                            <span className="price">
                                                ${medicine.price.toFixed(2)}
                                            </span>
                                            <span className="stock">
                                                Stock: {medicine.stock}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => addToCart(medicine)}
                                    >
                                        <MdAdd />
                                        Add
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Cart & Checkout */}
                    <div className="cart-section">
                        {/* Cart Header */}
                        <div className="cart-header">
                            <h3>
                                <MdReceipt className="cart-icon" />
                                Shopping Cart
                                {cart.length > 0 && (
                                    <span className="cart-count">
                                        ({cart.length})
                                    </span>
                                )}
                            </h3>
                            {cart.length > 0 && (
                                <button
                                    className="clear-cart-btn"
                                    onClick={clearCart}
                                >
                                    Clear All
                                </button>
                            )}
                        </div>

                        {/* Cart Items */}
                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <div className="empty-cart">
                                    <p>No items in cart</p>
                                    <small>
                                        Search and add medicines to start a sale
                                    </small>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="item-info">
                                            <h4>{item.name}</h4>
                                            <p className="item-category">
                                                {item.category}
                                            </p>
                                        </div>

                                        <div className="item-controls">
                                            <div className="quantity-controls">
                                                <button
                                                    className="qty-btn decrease"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity - 1,
                                                        )
                                                    }
                                                >
                                                    <MdRemove />
                                                </button>
                                                <span className="quantity">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="qty-btn increase"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity + 1,
                                                        )
                                                    }
                                                >
                                                    <MdAdd />
                                                </button>
                                            </div>

                                            <div className="item-price">
                                                $
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </div>

                                            <button
                                                className="remove-btn"
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                            >
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Cart Summary */}
                        <div className="cart-summary">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="summary-row discount-row">
                                <div className="discount-control">
                                    <MdLocalOffer className="discount-icon" />
                                    <span>Discount</span>
                                    <div className="discount-input">
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={discount}
                                            onChange={(e) =>
                                                setDiscount(
                                                    Math.min(
                                                        100,
                                                        Math.max(
                                                            0,
                                                            e.target.value,
                                                        ),
                                                    ),
                                                )
                                            }
                                            className="discount-percent"
                                        />
                                        <span>%</span>
                                    </div>
                                </div>
                                <span>-${discountAmount.toFixed(2)}</span>
                            </div>

                            <div className="summary-row">
                                <div className="tax-control">
                                    <MdCalculate className="tax-icon" />
                                    <span>Tax ({tax}%)</span>
                                </div>
                                <span>${taxAmount.toFixed(2)}</span>
                            </div>

                            <div className="summary-row total-row">
                                <span>Total</span>
                                <span className="total-amount">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="payment-section">
                            <h4>Payment Method</h4>
                            <div className="payment-options">
                                {[
                                    "cash",
                                    "credit card",
                                    "debit card",
                                    "insurance",
                                ].map((method) => (
                                    <label
                                        key={method}
                                        className="payment-option"
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={method}
                                            checked={paymentMethod === method}
                                            onChange={(e) =>
                                                setPaymentMethod(e.target.value)
                                            }
                                        />
                                        <span className="payment-label">
                                            {method.charAt(0).toUpperCase() +
                                                method.slice(1)}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="notes-section">
                            <h4>Notes (Optional)</h4>
                            <textarea
                                placeholder="Add any notes about this sale..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="notes-input"
                                rows="3"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <button className="cancel-btn" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                className="complete-sale-btn"
                                onClick={handleCompleteSale}
                                disabled={cart.length === 0}
                            >
                                Complete Sale
                                <span className="total-display">
                                    ${total.toFixed(2)}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewSaleModal;
