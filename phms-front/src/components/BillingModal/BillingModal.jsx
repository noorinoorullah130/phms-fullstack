import React, { useState, useEffect } from "react";
import {
    MdClose,
    MdReceipt,
    MdLocalPharmacy,
    MdPerson,
    MdCreditCard,
    MdAttachMoney,
    MdHealthAndSafety,
    MdDescription,
    MdCalendarToday,
    MdAddCircle,
    MdRemoveCircle,
    MdDelete,
    MdPrint,
    MdSave,
    MdSend,
    MdDiscount,
    MdLocalOffer,
    MdInfo,
    MdWarning,
    MdCheckCircle,
    MdArrowBack,
    MdQrCode,
    MdDownload,
    MdShare,
    MdPayment,
} from "react-icons/md";
import "./BillingModal.css";

const BillingModal = ({ isOpen, onClose, prescription, patient }) => {
    const [step, setStep] = useState(1);
    const [billingData, setBillingData] = useState({
        patientId: "",
        prescriptionId: "",
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
        items: [],
        subtotal: 0,
        tax: 0,
        discount: 0,
        discountType: "percentage", // or "fixed"
        discountAmount: 0,
        total: 0,
        paymentMethod: "cash",
        insuranceCoverage: 0,
        patientPayable: 0,
        notes: "",
        status: "pending",
    });

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
        cashReceived: 0,
        change: 0,
        upiId: "",
        insuranceId: "",
        policyNumber: "",
        insuranceCompany: "",
    });

    const [invoiceData, setInvoiceData] = useState({
        invoiceNumber: `INV-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, "0")}${Math.floor(
            Math.random() * 10000,
        )
            .toString()
            .padStart(4, "0")}`,
        invoiceDate: new Date().toLocaleDateString(),
        invoiceTime: new Date().toLocaleTimeString(),
        cashier: "Dr. Jonathan Smith",
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showInsurance, setShowInsurance] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [invoiceGenerated, setInvoiceGenerated] = useState(false);

    // Sample medicines data
    const medicines = [
        {
            id: 1,
            name: "Paracetamol 500mg",
            genericName: "Acetaminophen",
            type: "Tablet",
            stock: 150,
            price: 2.5,
            requiresPrescription: false,
        },
        {
            id: 2,
            name: "Amoxicillin 500mg",
            genericName: "Amoxicillin",
            type: "Capsule",
            stock: 80,
            price: 8.75,
            requiresPrescription: true,
        },
        {
            id: 3,
            name: "Ibuprofen 400mg",
            genericName: "Ibuprofen",
            type: "Tablet",
            stock: 120,
            price: 3.25,
            requiresPrescription: false,
        },
        {
            id: 4,
            name: "Cetirizine 10mg",
            genericName: "Cetirizine HCl",
            type: "Tablet",
            stock: 200,
            price: 1.8,
            requiresPrescription: false,
        },
        {
            id: 5,
            name: "Omeprazole 20mg",
            genericName: "Omeprazole",
            type: "Capsule",
            stock: 90,
            price: 5.5,
            requiresPrescription: true,
        },
        {
            id: 6,
            name: "Metformin 500mg",
            genericName: "Metformin HCl",
            type: "Tablet",
            stock: 110,
            price: 4.25,
            requiresPrescription: true,
        },
        {
            id: 7,
            name: "Aspirin 81mg",
            genericName: "Acetylsalicylic Acid",
            type: "Tablet",
            stock: 180,
            price: 1.5,
            requiresPrescription: false,
        },
        {
            id: 8,
            name: "Lisinopril 10mg",
            genericName: "Lisinopril",
            type: "Tablet",
            stock: 75,
            price: 6.75,
            requiresPrescription: true,
        },
    ];

    const paymentMethods = [
        { id: "cash", label: "Cash", icon: <MdAttachMoney /> },
        { id: "credit_card", label: "Credit Card", icon: <MdCreditCard /> },
        { id: "debit_card", label: "Debit Card", icon: <MdCreditCard /> },
        { id: "upi", label: "UPI", icon: <MdPayment /> },
        { id: "insurance", label: "Insurance", icon: <MdHealthAndSafety /> },
        { id: "wallet", label: "Digital Wallet", icon: <MdPayment /> },
    ];

    const insuranceCompanies = [
        { id: "blue_cross", name: "Blue Cross Blue Shield", coverage: 80 },
        { id: "aetna", name: "Aetna", coverage: 75 },
        { id: "united", name: "UnitedHealthcare", coverage: 85 },
        { id: "cigna", name: "Cigna", coverage: 70 },
        { id: "humana", name: "Humana", coverage: 90 },
    ];

    const taxRate = 7.5; // 7.5%

    // Load prescription data if provided
    useEffect(() => {
        if (prescription) {
            const prescriptionItems = prescription.medicines.map((med) => ({
                id: med.id,
                name: med.name,
                quantity: med.quantity,
                unitPrice: med.price,
                total: med.quantity * med.price,
                prescriptionRequired: med.requiresPrescription,
            }));

            const subtotal = prescriptionItems.reduce(
                (sum, item) => sum + item.total,
                0,
            );
            const tax = subtotal * (taxRate / 100);
            const total = subtotal + tax;

            setBillingData((prev) => ({
                ...prev,
                patientId: prescription.patientId,
                prescriptionId: prescription.id,
                items: prescriptionItems,
                subtotal,
                tax,
                total,
            }));
        }
    }, [prescription]);

    // Calculate totals when items change
    useEffect(() => {
        const subtotal = billingData.items.reduce(
            (sum, item) => sum + item.total,
            0,
        );
        const tax = subtotal * (taxRate / 100);

        let discountAmount = 0;
        if (billingData.discountType === "percentage") {
            discountAmount = subtotal * (billingData.discount / 100);
        } else {
            discountAmount = billingData.discount;
        }

        const total = Math.max(0, subtotal + tax - discountAmount);
        const patientPayable = total - billingData.insuranceCoverage;

        setBillingData((prev) => ({
            ...prev,
            subtotal,
            tax,
            discountAmount,
            total,
            patientPayable,
        }));
    }, [
        billingData.items,
        billingData.discount,
        billingData.discountType,
        billingData.insuranceCoverage,
    ]);

    const handleAddMedicine = () => {
        if (!selectedMedicine || quantity <= 0) return;

        const existingItem = billingData.items.find(
            (item) => item.id === selectedMedicine.id,
        );

        if (existingItem) {
            // Update quantity if already exists
            setBillingData((prev) => ({
                ...prev,
                items: prev.items.map((item) =>
                    item.id === selectedMedicine.id
                        ? {
                              ...item,
                              quantity: item.quantity + quantity,
                              total:
                                  (item.quantity + quantity) * item.unitPrice,
                          }
                        : item,
                ),
            }));
        } else {
            // Add new item
            const newItem = {
                id: selectedMedicine.id,
                name: selectedMedicine.name,
                genericName: selectedMedicine.genericName,
                quantity,
                unitPrice: selectedMedicine.price,
                total: quantity * selectedMedicine.price,
                prescriptionRequired: selectedMedicine.requiresPrescription,
            };

            setBillingData((prev) => ({
                ...prev,
                items: [...prev.items, newItem],
            }));
        }

        setSelectedMedicine(null);
        setQuantity(1);
        setSearchQuery("");
    };

    const handleRemoveItem = (itemId) => {
        setBillingData((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== itemId),
        }));
    };

    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) {
            handleRemoveItem(itemId);
            return;
        }

        setBillingData((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === itemId
                    ? {
                          ...item,
                          quantity: newQuantity,
                          total: newQuantity * item.unitPrice,
                      }
                    : item,
            ),
        }));
    };

    const handleDiscountChange = (value) => {
        setBillingData((prev) => ({
            ...prev,
            discount: parseFloat(value) || 0,
        }));
    };

    const handlePaymentMethodChange = (method) => {
        setBillingData((prev) => ({
            ...prev,
            paymentMethod: method,
        }));
    };

    const handleInsuranceSelect = (insurance) => {
        setPaymentDetails((prev) => ({
            ...prev,
            insuranceCompany: insurance.name,
            insuranceId: insurance.id,
        }));

        const coverageAmount = billingData.total * (insurance.coverage / 100);
        setBillingData((prev) => ({
            ...prev,
            insuranceCoverage: coverageAmount,
        }));
    };

    const handleCashReceivedChange = (amount) => {
        const cash = parseFloat(amount) || 0;
        const change = cash - billingData.patientPayable;

        setPaymentDetails((prev) => ({
            ...prev,
            cashReceived: cash,
            change: Math.max(0, change),
        }));
    };

    const handleProcessPayment = async () => {
        if (billingData.items.length === 0) {
            alert("Please add at least one medicine to the bill");
            return;
        }

        if (
            billingData.paymentMethod === "cash" &&
            paymentDetails.cashReceived < billingData.patientPayable
        ) {
            alert("Cash received is less than the payable amount");
            return;
        }

        setIsProcessing(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setInvoiceGenerated(true);
            setStep(3); // Show invoice
        } catch (error) {
            console.error("Payment processing failed:", error);
            alert("Payment processing failed. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePrintInvoice = () => {
        const invoiceContent = document.getElementById("invoice-content");
        if (invoiceContent) {
            const printWindow = window.open("", "_blank");
            printWindow.document.write(`
                <html>
                <head>
                    <title>Invoice ${invoiceData.invoiceNumber}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .invoice-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px; }
                        .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
                        .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                        .invoice-table th, .invoice-table td { border: 1px solid #000; padding: 10px; text-align: left; }
                        .invoice-summary { float: right; width: 300px; }
                        .footer { margin-top: 50px; text-align: center; color: #666; }
                    </style>
                </head>
                <body>
                    ${invoiceContent.innerHTML}
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };

    const handleDownloadInvoice = () => {
        // In a real app, this would generate a PDF
        alert("Invoice downloaded as PDF");
    };

    const handleSaveAndClose = () => {
        const billingRecord = {
            ...billingData,
            ...paymentDetails,
            ...invoiceData,
            processedBy: invoiceData.cashier,
            processedAt: new Date().toISOString(),
        };

        console.log("Billing record saved:", billingRecord);
        onClose();
    };

    const renderStep1 = () => (
        <div className="billing-step">
            <h3>Select Medicines</h3>

            <div className="search-add-section">
                <div className="medicine-search">
                    <input
                        type="text"
                        placeholder="Search medicines by name or generic name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="medicine-selection">
                    <div className="medicine-list">
                        {medicines
                            .filter(
                                (med) =>
                                    med.name
                                        .toLowerCase()
                                        .includes(searchQuery.toLowerCase()) ||
                                    med.genericName
                                        .toLowerCase()
                                        .includes(searchQuery.toLowerCase()),
                            )
                            .map((medicine) => (
                                <div
                                    key={medicine.id}
                                    className={`medicine-item ${selectedMedicine?.id === medicine.id ? "selected" : ""}`}
                                    onClick={() =>
                                        setSelectedMedicine(medicine)
                                    }
                                >
                                    <div className="medicine-info">
                                        <h4>{medicine.name}</h4>
                                        <p className="generic-name">
                                            {medicine.genericName}
                                        </p>
                                        <div className="medicine-meta">
                                            <span className="type">
                                                {medicine.type}
                                            </span>
                                            <span className="price">
                                                ${medicine.price.toFixed(2)}
                                            </span>
                                            <span className="stock">
                                                Stock: {medicine.stock}
                                            </span>
                                        </div>
                                        {medicine.requiresPrescription && (
                                            <span className="prescription-badge">
                                                <MdInfo /> Prescription Required
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="add-to-cart">
                        <div className="quantity-selector">
                            <label>Quantity:</label>
                            <div className="quantity-controls">
                                <button
                                    className="quantity-btn"
                                    onClick={() =>
                                        setQuantity((q) => Math.max(1, q - 1))
                                    }
                                    disabled={!selectedMedicine}
                                >
                                    <MdRemoveCircle />
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(
                                            Math.max(
                                                1,
                                                parseInt(e.target.value) || 1,
                                            ),
                                        )
                                    }
                                    min="1"
                                    max={selectedMedicine?.stock || 1}
                                    disabled={!selectedMedicine}
                                />
                                <button
                                    className="quantity-btn"
                                    onClick={() =>
                                        setQuantity((q) =>
                                            Math.min(
                                                selectedMedicine?.stock || q,
                                                q + 1,
                                            ),
                                        )
                                    }
                                    disabled={!selectedMedicine}
                                >
                                    <MdAddCircle />
                                </button>
                            </div>
                        </div>

                        <button
                            className="add-btn"
                            onClick={handleAddMedicine}
                            disabled={!selectedMedicine}
                        >
                            <MdAddCircle /> Add to Bill
                        </button>
                    </div>
                </div>
            </div>

            <div className="cart-section">
                <h4>Bill Items ({billingData.items.length})</h4>

                {billingData.items.length === 0 ? (
                    <div className="empty-cart">
                        <MdLocalPharmacy className="empty-icon" />
                        <p>No medicines added to the bill yet</p>
                    </div>
                ) : (
                    <div className="cart-items">
                        <div className="cart-header">
                            <div className="header-item">Medicine</div>
                            <div className="header-item">Price</div>
                            <div className="header-item">Quantity</div>
                            <div className="header-item">Total</div>
                            <div className="header-item">Actions</div>
                        </div>

                        {billingData.items.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-cell medicine-info">
                                    <div>
                                        <strong>{item.name}</strong>
                                        <small>{item.genericName}</small>
                                    </div>
                                </div>
                                <div className="cart-cell price">
                                    ${item.unitPrice.toFixed(2)}
                                </div>
                                <div className="cart-cell quantity">
                                    <div className="item-quantity">
                                        <button
                                            className="quantity-btn small"
                                            onClick={() =>
                                                handleUpdateQuantity(
                                                    item.id,
                                                    item.quantity - 1,
                                                )
                                            }
                                        >
                                            <MdRemoveCircle />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="quantity-btn small"
                                            onClick={() =>
                                                handleUpdateQuantity(
                                                    item.id,
                                                    item.quantity + 1,
                                                )
                                            }
                                        >
                                            <MdAddCircle />
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-cell total">
                                    ${item.total.toFixed(2)}
                                </div>
                                <div className="cart-cell actions">
                                    <button
                                        className="remove-btn"
                                        onClick={() =>
                                            handleRemoveItem(item.id)
                                        }
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="billing-step">
            <h3>Payment & Discounts</h3>

            <div className="payment-section">
                <div className="billing-summary">
                    <div className="summary-item">
                        <span>Subtotal:</span>
                        <span>${billingData.subtotal.toFixed(2)}</span>
                    </div>

                    <div className="summary-item">
                        <span>Tax ({taxRate}%):</span>
                        <span>${billingData.tax.toFixed(2)}</span>
                    </div>

                    <div className="discount-section">
                        <div className="discount-header">
                            <MdDiscount className="discount-icon" />
                            <h4>Apply Discount</h4>
                        </div>
                        <div className="discount-controls">
                            <div className="discount-type">
                                <label>
                                    <input
                                        type="radio"
                                        checked={
                                            billingData.discountType ===
                                            "percentage"
                                        }
                                        onChange={() =>
                                            setBillingData((prev) => ({
                                                ...prev,
                                                discountType: "percentage",
                                            }))
                                        }
                                    />
                                    Percentage
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        checked={
                                            billingData.discountType === "fixed"
                                        }
                                        onChange={() =>
                                            setBillingData((prev) => ({
                                                ...prev,
                                                discountType: "fixed",
                                            }))
                                        }
                                    />
                                    Fixed Amount
                                </label>
                            </div>
                            <div className="discount-input">
                                <input
                                    type="number"
                                    value={billingData.discount}
                                    onChange={(e) =>
                                        handleDiscountChange(e.target.value)
                                    }
                                    min="0"
                                    max={
                                        billingData.discountType ===
                                        "percentage"
                                            ? 100
                                            : billingData.subtotal
                                    }
                                    step={
                                        billingData.discountType ===
                                        "percentage"
                                            ? 1
                                            : 0.01
                                    }
                                />
                                <span className="discount-suffix">
                                    {billingData.discountType === "percentage"
                                        ? "%"
                                        : "$"}
                                </span>
                            </div>
                        </div>
                        {billingData.discountAmount > 0 && (
                            <div className="discount-applied">
                                <MdCheckCircle /> Discount: -$
                                {billingData.discountAmount.toFixed(2)}
                            </div>
                        )}
                    </div>

                    {showInsurance && (
                        <div className="insurance-section">
                            <div className="insurance-header">
                                <MdHealthAndSafety className="insurance-icon" />
                                <h4>Insurance Coverage</h4>
                                <button
                                    className="close-insurance"
                                    onClick={() => setShowInsurance(false)}
                                >
                                    <MdClose />
                                </button>
                            </div>
                            <div className="insurance-companies">
                                {insuranceCompanies.map((insurance) => (
                                    <div
                                        key={insurance.id}
                                        className={`insurance-option ${paymentDetails.insuranceId === insurance.id ? "selected" : ""}`}
                                        onClick={() =>
                                            handleInsuranceSelect(insurance)
                                        }
                                    >
                                        <div className="insurance-info">
                                            <h5>{insurance.name}</h5>
                                            <p>
                                                Coverage: {insurance.coverage}%
                                            </p>
                                        </div>
                                        <MdCheckCircle className="check-icon" />
                                    </div>
                                ))}
                            </div>
                            {billingData.insuranceCoverage > 0 && (
                                <div className="insurance-coverage">
                                    Insurance Coverage: $
                                    {billingData.insuranceCoverage.toFixed(2)}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="summary-item total">
                        <span>Total Amount:</span>
                        <span className="total-amount">
                            ${billingData.total.toFixed(2)}
                        </span>
                    </div>

                    {billingData.insuranceCoverage > 0 && (
                        <div className="summary-item payable">
                            <span>Patient Payable:</span>
                            <span className="payable-amount">
                                ${billingData.patientPayable.toFixed(2)}
                            </span>
                        </div>
                    )}
                </div>

                <div className="payment-methods">
                    <h4>Select Payment Method</h4>
                    <div className="method-grid">
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                className={`method-option ${billingData.paymentMethod === method.id ? "selected" : ""}`}
                                onClick={() =>
                                    handlePaymentMethodChange(method.id)
                                }
                            >
                                <div className="method-icon">{method.icon}</div>
                                <span className="method-label">
                                    {method.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {billingData.paymentMethod === "insurance" &&
                        !showInsurance && (
                            <button
                                className="add-insurance-btn"
                                onClick={() => setShowInsurance(true)}
                            >
                                <MdHealthAndSafety /> Add Insurance Details
                            </button>
                        )}

                    {billingData.paymentMethod === "cash" && (
                        <div className="cash-payment">
                            <h5>Cash Payment</h5>
                            <div className="cash-input">
                                <label>Amount Received:</label>
                                <div className="input-group">
                                    <span className="currency">$</span>
                                    <input
                                        type="number"
                                        value={paymentDetails.cashReceived}
                                        onChange={(e) =>
                                            handleCashReceivedChange(
                                                e.target.value,
                                            )
                                        }
                                        min={billingData.patientPayable}
                                        step="0.01"
                                    />
                                </div>
                                {paymentDetails.cashReceived > 0 && (
                                    <div className="cash-details">
                                        <div className="change-amount">
                                            Change: $
                                            {paymentDetails.change.toFixed(2)}
                                        </div>
                                        {paymentDetails.cashReceived <
                                            billingData.patientPayable && (
                                            <div className="insufficient-cash">
                                                <MdWarning /> Additional $
                                                {(
                                                    billingData.patientPayable -
                                                    paymentDetails.cashReceived
                                                ).toFixed(2)}{" "}
                                                needed
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {billingData.paymentMethod === "credit_card" ||
                    billingData.paymentMethod === "debit_card" ? (
                        <div className="card-payment">
                            <h5>Card Details</h5>
                            <div className="card-form">
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        value={paymentDetails.cardNumber}
                                        onChange={(e) =>
                                            setPaymentDetails((prev) => ({
                                                ...prev,
                                                cardNumber: e.target.value,
                                            }))
                                        }
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Card Holder Name</label>
                                    <input
                                        type="text"
                                        value={paymentDetails.cardHolder}
                                        onChange={(e) =>
                                            setPaymentDetails((prev) => ({
                                                ...prev,
                                                cardHolder: e.target.value,
                                            }))
                                        }
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Expiry Date</label>
                                        <input
                                            type="text"
                                            value={paymentDetails.expiryDate}
                                            onChange={(e) =>
                                                setPaymentDetails((prev) => ({
                                                    ...prev,
                                                    expiryDate: e.target.value,
                                                }))
                                            }
                                            placeholder="MM/YY"
                                            maxLength="5"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input
                                            type="password"
                                            value={paymentDetails.cvv}
                                            onChange={(e) =>
                                                setPaymentDetails((prev) => ({
                                                    ...prev,
                                                    cvv: e.target.value,
                                                }))
                                            }
                                            placeholder="123"
                                            maxLength="4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : billingData.paymentMethod === "upi" ? (
                        <div className="upi-payment">
                            <h5>UPI Payment</h5>
                            <div className="form-group">
                                <label>UPI ID</label>
                                <input
                                    type="text"
                                    value={paymentDetails.upiId}
                                    onChange={(e) =>
                                        setPaymentDetails((prev) => ({
                                            ...prev,
                                            upiId: e.target.value,
                                        }))
                                    }
                                    placeholder="username@bank"
                                />
                            </div>
                            <div className="upi-qr">
                                <MdQrCode className="qr-icon" />
                                <p>Scan QR code to pay</p>
                            </div>
                        </div>
                    ) : null}

                    <div className="payment-notes">
                        <label>
                            <MdDescription /> Additional Notes
                        </label>
                        <textarea
                            value={billingData.notes}
                            onChange={(e) =>
                                setBillingData((prev) => ({
                                    ...prev,
                                    notes: e.target.value,
                                }))
                            }
                            placeholder="Add any notes about this transaction..."
                            rows="3"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="billing-step">
            <div className="invoice-container">
                <div className="invoice-header">
                    <h3>
                        <MdReceipt /> Invoice #{invoiceData.invoiceNumber}
                    </h3>
                    <div className="invoice-status success">
                        <MdCheckCircle /> Payment Successful
                    </div>
                </div>

                <div id="invoice-content" className="invoice-content">
                    <div className="invoice-info">
                        <div className="invoice-from">
                            <h4>PharmaCare Pharmacy</h4>
                            <p>123 Medical Street</p>
                            <p>New York, NY 10001</p>
                            <p>Phone: (555) 123-4567</p>
                            <p>Email: billing@pharmacare.com</p>
                        </div>
                        <div className="invoice-to">
                            <h4>Bill To:</h4>
                            <p>Patient: John Doe</p>
                            <p>Patient ID: PT-2024-001</p>
                            <p>Date: {invoiceData.invoiceDate}</p>
                            <p>Time: {invoiceData.invoiceTime}</p>
                        </div>
                    </div>

                    <table className="invoice-table">
                        <thead>
                            <tr>
                                <th>Medicine</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {billingData.items.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <strong>{item.name}</strong>
                                        <br />
                                        <small>{item.genericName}</small>
                                    </td>
                                    <td>${item.unitPrice.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="invoice-summary">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${billingData.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax ({taxRate}%):</span>
                            <span>${billingData.tax.toFixed(2)}</span>
                        </div>
                        {billingData.discountAmount > 0 && (
                            <div className="summary-row discount">
                                <span>Discount:</span>
                                <span>
                                    -${billingData.discountAmount.toFixed(2)}
                                </span>
                            </div>
                        )}
                        {billingData.insuranceCoverage > 0 && (
                            <div className="summary-row insurance">
                                <span>Insurance Coverage:</span>
                                <span>
                                    -${billingData.insuranceCoverage.toFixed(2)}
                                </span>
                            </div>
                        )}
                        <div className="summary-row total">
                            <span>Total Amount:</span>
                            <span>${billingData.total.toFixed(2)}</span>
                        </div>
                        {billingData.insuranceCoverage > 0 && (
                            <div className="summary-row payable">
                                <span>Patient Paid:</span>
                                <span>
                                    ${billingData.patientPayable.toFixed(2)}
                                </span>
                            </div>
                        )}
                        {billingData.paymentMethod === "cash" &&
                            paymentDetails.change > 0 && (
                                <div className="summary-row change">
                                    <span>Change Returned:</span>
                                    <span>
                                        ${paymentDetails.change.toFixed(2)}
                                    </span>
                                </div>
                            )}
                    </div>

                    <div className="payment-method-info">
                        <h4>
                            Payment Method:{" "}
                            {
                                paymentMethods.find(
                                    (m) => m.id === billingData.paymentMethod,
                                )?.label
                            }
                        </h4>
                        {billingData.paymentMethod === "insurance" &&
                            paymentDetails.insuranceCompany && (
                                <p>
                                    Insurance Provider:{" "}
                                    {paymentDetails.insuranceCompany}
                                </p>
                            )}
                    </div>

                    <div className="invoice-footer">
                        <div className="footer-notes">
                            <h5>Notes:</h5>
                            <p>{billingData.notes || "No additional notes"}</p>
                        </div>
                        <div className="footer-signature">
                            <p>Processed by: {invoiceData.cashier}</p>
                            <div className="signature-line"></div>
                            <p>Authorized Signature</p>
                        </div>
                    </div>

                    <div className="invoice-terms">
                        <p>Thank you for choosing PharmaCare Pharmacy!</p>
                        <small>
                            This is a computer-generated invoice. No signature
                            required.
                        </small>
                    </div>
                </div>

                <div className="invoice-actions">
                    <button
                        className="btn-primary"
                        onClick={handlePrintInvoice}
                    >
                        <MdPrint /> Print Invoice
                    </button>
                    <button
                        className="btn-outline"
                        onClick={handleDownloadInvoice}
                    >
                        <MdDownload /> Download PDF
                    </button>
                    <button className="btn-secondary">
                        <MdShare /> Share Invoice
                    </button>
                    <button
                        className="btn-success"
                        onClick={handleSaveAndClose}
                    >
                        <MdCheckCircle /> Save & Complete
                    </button>
                </div>
            </div>
        </div>
    );

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="billing-modal">
                {/* Modal Header */}
                <div className="modal-header">
                    <div className="header-left">
                        <MdReceipt className="modal-icon" />
                        <div>
                            <h2>Pharmacy Billing</h2>
                            <p className="modal-subtitle">
                                {step === 1 && "Add medicines to create bill"}
                                {step === 2 &&
                                    "Apply discounts and process payment"}
                                {step === 3 && "Invoice generated successfully"}
                            </p>
                        </div>
                    </div>

                    <div className="header-right">
                        <div className="invoice-number">
                            Invoice: {invoiceData.invoiceNumber}
                        </div>
                        <button className="close-btn" onClick={onClose}>
                            <MdClose />
                        </button>
                    </div>
                </div>

                {/* Step Navigation */}
                <div className="step-navigation">
                    <div className={`step ${step >= 1 ? "active" : ""}`}>
                        <div className="step-number">1</div>
                        <span className="step-label">Add Items</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${step >= 2 ? "active" : ""}`}>
                        <div className="step-number">2</div>
                        <span className="step-label">Payment</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${step >= 3 ? "active" : ""}`}>
                        <div className="step-number">3</div>
                        <span className="step-label">Invoice</span>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                </div>

                {/* Modal Footer */}
                <div className="modal-footer">
                    {step < 3 && !invoiceGenerated && (
                        <>
                            <div className="footer-left">
                                <div className="bill-summary">
                                    <div className="summary-item">
                                        <span>Total:</span>
                                        <span className="total-amount">
                                            ${billingData.total.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="summary-item">
                                        <span>Items:</span>
                                        <span>{billingData.items.length}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="footer-right">
                                {step > 1 && (
                                    <button
                                        className="btn-outline"
                                        onClick={() => setStep(step - 1)}
                                    >
                                        <MdArrowBack /> Back
                                    </button>
                                )}

                                {step === 1 ? (
                                    <button
                                        className="btn-primary"
                                        onClick={() => setStep(2)}
                                        disabled={
                                            billingData.items.length === 0
                                        }
                                    >
                                        Continue to Payment <MdCreditCard />
                                    </button>
                                ) : (
                                    <button
                                        className="btn-success"
                                        onClick={handleProcessPayment}
                                        disabled={
                                            billingData.items.length === 0 ||
                                            isProcessing
                                        }
                                    >
                                        {isProcessing ? (
                                            <>
                                                <span className="spinner"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Process Payment $
                                                {billingData.patientPayable.toFixed(
                                                    2,
                                                )}{" "}
                                                <MdCheckCircle />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BillingModal;
