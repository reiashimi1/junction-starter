// components/ProgressBar.js
import { useState, useEffect } from 'react';

const ProgressBar = ({ progress }) => {
    return (
        <div className="w-full h-10 bg-[#e0e0df] rounded-md overflow-hidden">
            <div
                className="h-full bg-[#76c7c0] rounded-md"
                style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}
            ></div>
        </div>
    );
};

export default ProgressBar;
