import React from "react";

import "./Pagination.css";

const Pagination = () => {
    return (
        <div className="pagination">
            <button className="page-btn prev">Previous</button>
            <div className="page-numbers">
                <span className="page-number active">1</span>
                <span className="page-number">2</span>
                <span className="page-number">3</span>
                <span className="dots">...</span>
                <span className="page-number">10</span>
            </div>
            <button className="page-btn next">Next</button>
        </div>
    );
};

export default Pagination;
