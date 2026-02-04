import React, { useState } from "react";
import {
    MdHelpOutline,
    MdSearch,
    MdContactSupport,
    MdEmail,
    MdPhone,
    MdLiveHelp,
    MdVideoLibrary,
    MdArticle,
    MdDownload,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdCheckCircle,
    MdChat,
    MdSchedule,
    MdSecurity,
    MdSettings,
    MdDescription,
    MdLibraryBooks,
    MdForum,
    MdArrowForward,
    MdStar,
    MdOutlineThumbUp,
    MdOutlineThumbDown,
} from "react-icons/md";
import "./Help.css";

const Help = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [helpfulFeedback, setHelpfulFeedback] = useState({});

    const categories = [
        { id: "all", label: "All Topics", icon: <MdHelpOutline /> },
        {
            id: "getting-started",
            label: "Getting Started",
            icon: <MdSettings />,
        },
        {
            id: "inventory",
            label: "Inventory Management",
            icon: <MdLibraryBooks />,
        },
        {
            id: "billing",
            label: "Billing & Invoicing",
            icon: <MdDescription />,
        },
        { id: "prescriptions", label: "Prescriptions", icon: <MdArticle /> },
        {
            id: "reports",
            label: "Reports & Analytics",
            icon: <MdVideoLibrary />,
        },
        { id: "security", label: "Security", icon: <MdSecurity /> },
        {
            id: "troubleshooting",
            label: "Troubleshooting",
            icon: <MdLiveHelp />,
        },
    ];

    const faqs = [
        {
            id: 1,
            question: "How do I add a new medicine to the inventory?",
            answer: "To add a new medicine: 1. Go to Inventory > Add New Medicine. 2. Fill in the details (name, generic name, manufacturer, batch number, expiry date, quantity, price). 3. Upload drug information if needed. 4. Click 'Save Medicine'. The system will automatically generate a unique SKU.",
            category: "inventory",
            tags: ["inventory", "medicine", "add"],
        },
        {
            id: 2,
            question: "How to process a prescription?",
            answer: "1. Navigate to Prescriptions > New Prescription. 2. Scan or manually enter prescription details. 3. Select patient from database or create new. 4. Add prescribed medicines. 5. Verify drug interactions (system will alert if any). 6. Generate label and process payment. 7. Mark as dispensed after handing over to patient.",
            category: "prescriptions",
            tags: ["prescription", "process", "dispensing"],
        },
        {
            id: 3,
            question: "How to generate sales reports?",
            answer: "Go to Reports > Sales Reports. You can filter by: Date range, Medicine category, Payment method, or Staff member. Reports can be exported as PDF, Excel, or printed directly. Set up automatic daily/weekly/monthly reports in Settings > Notifications.",
            category: "reports",
            tags: ["reports", "sales", "analytics"],
        },
        {
            id: 4,
            question: "How to reset my password?",
            answer: "1. Click on your profile icon in top right. 2. Select 'Security Settings'. 3. Click 'Change Password'. 4. Enter current password and new password. 5. Password must be at least 8 characters with uppercase, lowercase, number, and special character. 6. Click 'Update Password'. If you've forgotten password, use 'Forgot Password' on login page.",
            category: "security",
            tags: ["password", "security", "login"],
        },
        {
            id: 5,
            question: "How to set up low stock alerts?",
            answer: "Navigate to Settings > Notifications. Enable 'Low Stock Alerts'. Set threshold levels for each medicine category. You can choose to receive alerts via email, SMS, or in-app notification. Alerts are triggered when stock falls below minimum quantity.",
            category: "inventory",
            tags: ["alerts", "stock", "notifications"],
        },
        {
            id: 6,
            question: "How to process insurance claims?",
            answer: "1. Select patient with insurance coverage. 2. During billing, choose 'Insurance' as payment method. 3. Enter insurance details and policy number. 4. System will calculate covered amount and patient co-pay. 5. Generate claim form and submit electronically. Track status in Billing > Insurance Claims.",
            category: "billing",
            tags: ["insurance", "billing", "claims"],
        },
        {
            id: 7,
            question: "How to add new staff members?",
            answer: "Administrators can add staff: 1. Go to Users > Add User. 2. Enter personal and contact information. 3. Assign role (Pharmacist, Technician, Manager, Admin). 4. Set permissions and access levels. 5. System will send invitation email with login credentials.",
            category: "getting-started",
            tags: ["users", "staff", "permissions"],
        },
        {
            id: 8,
            question: "How to backup system data?",
            answer: "Automatic backups are configured in Settings > System > Backup. You can also manually backup: 1. Go to Settings > Backup & Restore. 2. Click 'Backup Now'. 3. Choose backup location (Cloud, Local, External). 4. Backup includes all data: inventory, patients, prescriptions, transactions. Backups are encrypted for security.",
            category: "security",
            tags: ["backup", "security", "data"],
        },
    ];

    const guides = [
        {
            id: 1,
            title: "Complete Pharmacy Setup Guide",
            description:
                "Step-by-step guide to setting up your pharmacy management system",
            duration: "15 min read",
            icon: <MdSettings />,
            category: "getting-started",
        },
        {
            id: 2,
            title: "Inventory Best Practices",
            description:
                "Learn how to efficiently manage your pharmacy inventory",
            duration: "10 min read",
            icon: <MdLibraryBooks />,
            category: "inventory",
        },
        {
            id: 3,
            title: "Billing System Masterclass",
            description:
                "Complete guide to billing, invoicing, and payment processing",
            duration: "20 min read",
            icon: <MdDescription />,
            category: "billing",
        },
        {
            id: 4,
            title: "Prescription Safety Guidelines",
            description:
                "Ensure compliance with prescription handling procedures",
            duration: "12 min read",
            icon: <MdArticle />,
            category: "prescriptions",
        },
    ];

    const contactMethods = [
        {
            icon: <MdEmail />,
            title: "Email Support",
            description: "Get help via email",
            details: "support@pharmacare.com",
            responseTime: "Within 4 hours",
            action: "Send Email",
        },
        {
            icon: <MdPhone />,
            title: "Phone Support",
            description: "Talk to our support team",
            details: "(555) 123-HELP",
            responseTime: "24/7 Available",
            action: "Call Now",
        },
        {
            icon: <MdChat />,
            title: "Live Chat",
            description: "Chat with support agent",
            details: "Available 9AM-9PM EST",
            responseTime: "Instant response",
            action: "Start Chat",
        },
        {
            icon: <MdSchedule />,
            title: "Schedule Call",
            description: "Book a callback with specialist",
            details: "Choose convenient time",
            responseTime: "Within 24 hours",
            action: "Schedule",
        },
    ];

    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory =
            activeCategory === "all" || faq.category === activeCategory;
        const matchesSearch =
            searchTerm === "" ||
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        return matchesCategory && matchesSearch;
    });

    const handleFaqToggle = (id) => {
        setExpandedFaq(expandedFaq === id ? null : id);
    };

    const handleFeedback = (faqId, isHelpful) => {
        setHelpfulFeedback((prev) => ({
            ...prev,
            [faqId]: isHelpful,
        }));
    };

    const popularTopics = [
        "Adding new medicines",
        "Processing prescriptions",
        "Generating reports",
        "User management",
        "Backup and restore",
        "System settings",
        "Billing procedures",
        "Stock management",
    ];

    return (
        <div className="help">
            {/* Hero Section */}
            <div className="help-hero">
                <div className="hero-content">
                    <h1>
                        <MdHelpOutline className="hero-icon" /> Help & Support
                        Center
                    </h1>
                    <p>
                        Find answers, guides, and resources for PharmaCare
                        Pharmacy Management System
                    </p>

                    <div className="search-container">
                        <div className="search-bar">
                            <MdSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for help articles, guides, or FAQs..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="search-button">Search</button>
                    </div>

                    <div className="popular-topics">
                        <span>Popular topics:</span>
                        {popularTopics.map((topic, index) => (
                            <button
                                key={index}
                                className="topic-tag"
                                onClick={() =>
                                    setSearchTerm(topic.split(" ")[0])
                                }
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="help-main">
                {/* Categories Sidebar */}
                <div className="help-sidebar">
                    <div className="sidebar-section">
                        <h3>Categories</h3>
                        <div className="category-list">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`category-item ${activeCategory === category.id ? "active" : ""}`}
                                    onClick={() =>
                                        setActiveCategory(category.id)
                                    }
                                >
                                    <span className="category-icon">
                                        {category.icon}
                                    </span>
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-section">
                        <h3>Quick Links</h3>
                        <div className="quick-links">
                            <a href="#" className="quick-link">
                                <MdDownload /> User Manual (PDF)
                            </a>
                            <a href="#" className="quick-link">
                                <MdVideoLibrary /> Video Tutorials
                            </a>
                            <a href="#" className="quick-link">
                                <MdForum /> Community Forum
                            </a>
                            <a href="#" className="quick-link">
                                <MdContactSupport /> Submit Ticket
                            </a>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="help-content">
                    {/* Featured Guides */}
                    <div className="section">
                        <div className="section-header">
                            <h2>
                                <MdVideoLibrary /> Featured Guides
                            </h2>
                            <a href="#" className="view-all">
                                View all guides <MdArrowForward />
                            </a>
                        </div>
                        <div className="guides-grid">
                            {guides.map((guide) => (
                                <div key={guide.id} className="guide-card">
                                    <div className="guide-icon">
                                        {guide.icon}
                                    </div>
                                    <div className="guide-content">
                                        <h4>{guide.title}</h4>
                                        <p>{guide.description}</p>
                                        <div className="guide-meta">
                                            <span className="duration">
                                                {guide.duration}
                                            </span>
                                            <span className="category">
                                                {guide.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="section">
                        <div className="section-header">
                            <h2>
                                <MdLiveHelp /> Frequently Asked Questions
                            </h2>
                            <div className="faq-count">
                                {filteredFaqs.length}{" "}
                                {filteredFaqs.length === 1
                                    ? "question"
                                    : "questions"}
                            </div>
                        </div>

                        <div className="faq-list">
                            {filteredFaqs.map((faq) => (
                                <div key={faq.id} className="faq-item">
                                    <div
                                        className="faq-question"
                                        onClick={() => handleFaqToggle(faq.id)}
                                    >
                                        <div className="faq-header">
                                            <span className="faq-category">
                                                {faq.category}
                                            </span>
                                            <h3>{faq.question}</h3>
                                        </div>
                                        <div className="faq-toggle">
                                            {expandedFaq === faq.id ? (
                                                <MdKeyboardArrowUp />
                                            ) : (
                                                <MdKeyboardArrowDown />
                                            )}
                                        </div>
                                    </div>

                                    {expandedFaq === faq.id && (
                                        <div className="faq-answer">
                                            <p>{faq.answer}</p>
                                            <div className="faq-tags">
                                                {faq.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="tag"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="faq-feedback">
                                                <p>Was this helpful?</p>
                                                <div className="feedback-buttons">
                                                    <button
                                                        className={`feedback-btn ${helpfulFeedback[faq.id] === true ? "active" : ""}`}
                                                        onClick={() =>
                                                            handleFeedback(
                                                                faq.id,
                                                                true,
                                                            )
                                                        }
                                                    >
                                                        <MdOutlineThumbUp /> Yes
                                                    </button>
                                                    <button
                                                        className={`feedback-btn ${helpfulFeedback[faq.id] === false ? "active" : ""}`}
                                                        onClick={() =>
                                                            handleFeedback(
                                                                faq.id,
                                                                false,
                                                            )
                                                        }
                                                    >
                                                        <MdOutlineThumbDown />{" "}
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="section">
                        <h2>
                            <MdContactSupport /> Contact Support
                        </h2>
                        <p className="section-subtitle">
                            Get in touch with our support team through any of
                            these channels
                        </p>

                        <div className="contact-grid">
                            {contactMethods.map((method, index) => (
                                <div key={index} className="contact-card">
                                    <div className="contact-icon">
                                        {method.icon}
                                    </div>
                                    <div className="contact-content">
                                        <h4>{method.title}</h4>
                                        <p className="contact-description">
                                            {method.description}
                                        </p>
                                        <p className="contact-details">
                                            {method.details}
                                        </p>
                                        <div className="contact-meta">
                                            <span className="response-time">
                                                <MdSchedule />{" "}
                                                {method.responseTime}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="contact-action">
                                        {method.action}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="system-status-card">
                        <div className="status-header">
                            <h3>
                                <MdCheckCircle /> System Status
                            </h3>
                            <span className="status-indicator online">
                                All Systems Operational
                            </span>
                        </div>
                        <div className="status-grid">
                            <div className="status-item">
                                <span className="status-label">
                                    Application
                                </span>
                                <span className="status-value online">
                                    Online
                                </span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">Database</span>
                                <span className="status-value online">
                                    Online
                                </span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">
                                    API Services
                                </span>
                                <span className="status-value online">
                                    Online
                                </span>
                            </div>
                            <div className="status-item">
                                <span className="status-label">
                                    Backup System
                                </span>
                                <span className="status-value online">
                                    Online
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Banner */}
            {feedbackSubmitted && (
                <div className="feedback-banner">
                    <div className="banner-content">
                        <MdStar className="banner-icon" />
                        <div>
                            <h4>Thank you for your feedback!</h4>
                            <p>We'll use it to improve our help articles.</p>
                        </div>
                    </div>
                    <button
                        className="banner-close"
                        onClick={() => setFeedbackSubmitted(false)}
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
};

export default Help;
