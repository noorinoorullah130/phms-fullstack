import React, { useState } from "react";

import "./Reports.css";
import {
    MdDownload,
    MdPrint,
    MdFilterList,
    MdCalendarToday,
    MdTrendingUp,
    MdTrendingDown,
    MdBarChart,
    MdPieChart,
    MdShowChart,
    MdTableChart,
    MdAttachMoney,
    MdInventory,
    MdShoppingCart,
    MdReceipt,
    MdPeople,
    MdGeneratingTokens,
} from "react-icons/md";

const Reports = () => {
    const [reportType, setReportType] = useState("sales");
    const [dateRange, setDateRange] = useState("month");
    const [viewMode, setViewMode] = useState("chart");

    // Sample data for charts
    const salesData = [
        { month: "Jan", sales: 12500, revenue: 15000 },
        { month: "Feb", sales: 13800, revenue: 16500 },
        { month: "Mar", sales: 15200, revenue: 18000 },
        { month: "Apr", sales: 14500, revenue: 17200 },
        { month: "May", sales: 16800, revenue: 19500 },
        { month: "Jun", sales: 17500, revenue: 21000 },
    ];

    const topProducts = [
        { name: "Paracetamol 500mg", sales: 2450, growth: 12 },
        { name: "Amoxicillin 250mg", sales: 1890, growth: 8 },
        { name: "Vitamin C 1000mg", sales: 1670, growth: 15 },
        { name: "Ibuprofen 400mg", sales: 1420, growth: 5 },
        { name: "Omeprazole 20mg", sales: 1280, growth: 10 },
    ];

    const categoryDistribution = [
        { category: "Pain Relief", value: 35, color: "#3b82f6" },
        { category: "Antibiotics", value: 25, color: "#10b981" },
        { category: "Vitamins", value: 20, color: "#f59e0b" },
        { category: "Chronic", value: 12, color: "#8b5cf6" },
        { category: "Other", value: 8, color: "#ef4444" },
    ];

    const performanceMetrics = [
        {
            metric: "Total Revenue",
            value: "$48,750",
            change: "+12%",
            trend: "up",
        },
        { metric: "Total Sales", value: "1,245", change: "+8%", trend: "up" },
        {
            metric: "Avg. Transaction",
            value: "$39.15",
            change: "+5%",
            trend: "up",
        },
        { metric: "Customer Count", value: "425", change: "+15%", trend: "up" },
        {
            metric: "Inventory Turnover",
            value: "4.2",
            change: "+3%",
            trend: "up",
        },
        {
            metric: "Return Rate",
            value: "2.1%",
            change: "-0.5%",
            trend: "down",
        },
    ];

    const recentReports = [
        {
            name: "Monthly Sales Report",
            date: "Jan 2024",
            type: "sales",
            size: "2.4 MB",
        },
        {
            name: "Inventory Analysis",
            date: "Dec 2023",
            type: "inventory",
            size: "1.8 MB",
        },
        {
            name: "Customer Demographics",
            date: "Dec 2023",
            type: "customers",
            size: "3.1 MB",
        },
        {
            name: "Supplier Performance",
            date: "Nov 2023",
            type: "purchase",
            size: "2.7 MB",
        },
    ];

    const reportTypes = [
        { id: "sales", label: "Sales Reports", icon: <MdReceipt /> },
        { id: "inventory", label: "Inventory Reports", icon: <MdInventory /> },
        { id: "purchase", label: "Purchase Reports", icon: <MdShoppingCart /> },
        { id: "customers", label: "Customer Reports", icon: <MdPeople /> },
        {
            id: "financial",
            label: "Financial Reports",
            icon: <MdAttachMoney />,
        },
    ];

    const getTrendIcon = (trend) => {
        return trend === "up" ? (
            <MdTrendingUp className="trend-icon up" />
        ) : (
            <MdTrendingDown className="trend-icon down" />
        );
    };

    const getChartIcon = (mode) => {
        switch (mode) {
            case "chart":
                return <MdShowChart />;
            case "bar":
                return <MdBarChart />;
            case "pie":
                return <MdPieChart />;
            case "table":
                return <MdTableChart />;
            default:
                return <MdShowChart />;
        }
    };

    const generateReport = () => {
        alert(`Generating ${reportType} report for ${dateRange}...`);
        // Here you would implement actual report generation logic
    };

    return (
        <div className="reports">
            {/* Header */}
            <div className="reports-header">
                <div className="header-content">
                    <h1>Reports & Analytics</h1>
                    <p>
                        Comprehensive insights and analytics for your pharmacy
                    </p>
                </div>
                <div className="header-actions">
                    <button
                        className="action-btn generate-btn"
                        onClick={generateReport}
                    >
                        <MdGeneratingTokens className="btn-icon" />
                        Generate Report
                    </button>
                    <button className="action-btn export-btn">
                        <MdDownload className="btn-icon" />
                        Export
                    </button>
                    <button className="action-btn print-btn">
                        <MdPrint className="btn-icon" />
                        Print
                    </button>
                </div>
            </div>

            {/* Report Type Selector */}
            <div className="report-types">
                <div className="types-header">
                    <h3>Report Types</h3>
                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === "chart" ? "active" : ""}`}
                            onClick={() => setViewMode("chart")}
                        >
                            <MdShowChart />
                        </button>
                        <button
                            className={`view-btn ${viewMode === "table" ? "active" : ""}`}
                            onClick={() => setViewMode("table")}
                        >
                            <MdTableChart />
                        </button>
                    </div>
                </div>

                <div className="type-cards">
                    {reportTypes.map((type) => (
                        <button
                            key={type.id}
                            className={`type-card ${reportType === type.id ? "active" : ""}`}
                            onClick={() => setReportType(type.id)}
                        >
                            <div className="type-icon">{type.icon}</div>
                            <span className="type-label">{type.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Date Range & Filters */}
            <div className="filters-section">
                <div className="filter-group">
                    <label>Date Range</label>
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="filter-select"
                    >
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                        <option value="custom">Custom Range</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Compare With</label>
                    <select className="filter-select">
                        <option value="none">None</option>
                        <option value="previous">Previous Period</option>
                        <option value="year">Same Period Last Year</option>
                    </select>
                </div>

                <button className="filter-btn">
                    <MdFilterList className="btn-icon" />
                    More Filters
                </button>

                <button className="calendar-btn">
                    <MdCalendarToday className="btn-icon" />
                    Select Dates
                </button>
            </div>

            {/* Performance Metrics */}
            <div className="metrics-section">
                <h3>Key Performance Indicators</h3>
                <div className="metrics-grid">
                    {performanceMetrics.map((metric, index) => (
                        <div key={index} className="metric-card">
                            <div className="metric-header">
                                <h4>{metric.metric}</h4>
                                {getTrendIcon(metric.trend)}
                            </div>
                            <div className="metric-value">{metric.value}</div>
                            <div className="metric-change">
                                <span className={`change ${metric.trend}`}>
                                    {metric.change}
                                </span>
                                <span className="change-label">
                                    from last period
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts-section">
                <div className="chart-container">
                    <div className="chart-header">
                        <h3>Sales Trend - Last 6 Months</h3>
                        <div className="chart-legend">
                            <div className="legend-item">
                                <span className="legend-color sales"></span>
                                <span>Total Sales</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color revenue"></span>
                                <span>Revenue</span>
                            </div>
                        </div>
                    </div>
                    <div className="chart-placeholder">
                        <div className="chart-bars">
                            {salesData.map((data, index) => (
                                <div key={index} className="bar-group">
                                    <div
                                        className="bar sales-bar"
                                        style={{
                                            height: `${(data.sales / 20000) * 100}%`,
                                        }}
                                    ></div>
                                    <div
                                        className="bar revenue-bar"
                                        style={{
                                            height: `${(data.revenue / 25000) * 100}%`,
                                        }}
                                    ></div>
                                    <div className="bar-label">
                                        {data.month}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="chart-y-axis">
                            <span>$25k</span>
                            <span>$20k</span>
                            <span>$15k</span>
                            <span>$10k</span>
                            <span>$5k</span>
                            <span>$0</span>
                        </div>
                    </div>
                    <div className="chart-footer">
                        <div className="chart-summary">
                            <div className="summary-item">
                                <strong>Total Sales:</strong> 90,300 units
                            </div>
                            <div className="summary-item">
                                <strong>Total Revenue:</strong> $1,072,000
                            </div>
                            <div className="summary-item">
                                <strong>Growth Rate:</strong> +12.5%
                            </div>
                        </div>
                    </div>
                </div>

                <div className="side-charts">
                    <div className="pie-chart-container">
                        <h3>Category Distribution</h3>
                        <div className="pie-chart">
                            <div className="pie-chart-visual">
                                {categoryDistribution.map((cat, index) => (
                                    <div
                                        key={index}
                                        className="pie-segment"
                                        style={{
                                            backgroundColor: cat.color,
                                            transform: `rotate(${index * 72}deg)`,
                                        }}
                                    ></div>
                                ))}
                            </div>
                            <div className="pie-legend">
                                {categoryDistribution.map((cat, index) => (
                                    <div key={index} className="legend-item">
                                        <span
                                            className="legend-dot"
                                            style={{
                                                backgroundColor: cat.color,
                                            }}
                                        ></span>
                                        <span className="legend-label">
                                            {cat.category}
                                        </span>
                                        <span className="legend-value">
                                            {cat.value}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="top-products">
                        <h3>Top Selling Products</h3>
                        <div className="products-list">
                            {topProducts.map((product, index) => (
                                <div key={index} className="product-item">
                                    <div className="product-rank">
                                        {index + 1}
                                    </div>
                                    <div className="product-info">
                                        <h4>{product.name}</h4>
                                        <p>
                                            {product.sales.toLocaleString()}{" "}
                                            units sold
                                        </p>
                                    </div>
                                    <div className="product-growth">
                                        <span
                                            className={`growth ${product.growth > 0 ? "positive" : "negative"}`}
                                        >
                                            {product.growth > 0 ? "+" : ""}
                                            {product.growth}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Tables */}
            <div className="tables-section">
                <div className="detailed-table">
                    <div className="table-header">
                        <h3>Detailed Sales Data</h3>
                        <button className="table-action-btn">
                            <MdDownload />
                            Export Data
                        </button>
                    </div>
                    <div className="data-table">
                        <div className="table-row header-row">
                            <div className="table-cell">Date</div>
                            <div className="table-cell">Invoice #</div>
                            <div className="table-cell">Customer</div>
                            <div className="table-cell">Items</div>
                            <div className="table-cell">Amount</div>
                            <div className="table-cell">Payment</div>
                            <div className="table-cell">Status</div>
                        </div>
                        {[1, 2, 3, 4, 5].map((row) => (
                            <div key={row} className="table-row">
                                <div className="table-cell">01/20/2024</div>
                                <div className="table-cell">
                                    SALE-2024-00{row}
                                </div>
                                <div className="table-cell">Customer {row}</div>
                                <div className="table-cell">
                                    {row * 2} items
                                </div>
                                <div className="table-cell">
                                    ${(row * 85).toFixed(2)}
                                </div>
                                <div className="table-cell">
                                    <span
                                        className={`payment-badge ${row % 2 === 0 ? "card" : "cash"}`}
                                    >
                                        {row % 2 === 0 ? "Card" : "Cash"}
                                    </span>
                                </div>
                                <div className="table-cell">
                                    <span className="status-badge completed">
                                        Completed
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="recent-reports">
                    <h3>Recent Reports</h3>
                    <div className="reports-list">
                        {recentReports.map((report, index) => (
                            <div key={index} className="report-item">
                                <div className="report-icon">
                                    {
                                        reportTypes.find(
                                            (t) => t.id === report.type,
                                        )?.icon
                                    }
                                </div>
                                <div className="report-info">
                                    <h4>{report.name}</h4>
                                    <p>
                                        {report.date} •{" "}
                                        {report.type.charAt(0).toUpperCase() +
                                            report.type.slice(1)}{" "}
                                        Report • {report.size}
                                    </p>
                                </div>
                                <div className="report-actions">
                                    <button
                                        className="icon-btn view"
                                        title="View"
                                    >
                                        👁️
                                    </button>
                                    <button
                                        className="icon-btn download"
                                        title="Download"
                                    >
                                        <MdDownload />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Summary & Insights */}
            <div className="insights-section">
                <h3>Key Insights & Recommendations</h3>
                <div className="insights-grid">
                    <div className="insight-card positive">
                        <div className="insight-icon">📈</div>
                        <div className="insight-content">
                            <h4>Sales Growth</h4>
                            <p>
                                Sales have increased by 12% compared to last
                                month. Pain relief category showing strongest
                                growth.
                            </p>
                        </div>
                    </div>

                    <div className="insight-card warning">
                        <div className="insight-icon">⚠️</div>
                        <div className="insight-content">
                            <h4>Low Stock Alert</h4>
                            <p>
                                5 items are below minimum stock levels. Consider
                                reordering Amoxicillin and Ibuprofen.
                            </p>
                        </div>
                    </div>

                    <div className="insight-card info">
                        <div className="insight-icon">💰</div>
                        <div className="insight-content">
                            <h4>Revenue Opportunity</h4>
                            <p>
                                Evening hours have 30% lower sales. Consider
                                special promotions or extended hours.
                            </p>
                        </div>
                    </div>

                    <div className="insight-card success">
                        <div className="insight-icon">👥</div>
                        <div className="insight-content">
                            <h4>Customer Growth</h4>
                            <p>
                                15% increase in new customers. Referral program
                                showing positive results.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
