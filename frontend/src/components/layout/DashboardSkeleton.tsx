import React, { useState, useEffect } from 'react';
import './DashboardSkeleton.css';

interface SkeletonLoaderProps {
  isLoading?: boolean;
}

const DashboardSkeleton: React.FC<SkeletonLoaderProps> = ({ isLoading = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isLoading]);

  if (!isLoading && !isVisible) return null;

  return (
    <div className={`skeleton-container ${isVisible ? 'visible' : ''}`}>
      {/* Sidebar Skeleton */}
      <div className="skeleton-sidebar">
        <div className="skeleton-sidebar-item"></div>
        <div className="skeleton-sidebar-item"></div>
        <div className="skeleton-sidebar-item"></div>
        <div className="skeleton-sidebar-item"></div>
        <div className="skeleton-sidebar-item"></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="skeleton-main">
        {/* Header */}
        <div className="skeleton-header">
          <div className="skeleton-title"></div>
          <div className="skeleton-subtitle"></div>
        </div>

        {/* Stats Grid */}
        <div className="skeleton-stats-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="skeleton-stat-card">
              <div className="skeleton-stat-number"></div>
              <div className="skeleton-stat-label"></div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="skeleton-divider"></div>

        {/* Charts and Tables Section */}
        <div className="skeleton-content-grid">
          {/* Legend Section */}
          <div className="skeleton-legend">
            <div className="skeleton-legend-title"></div>
            <div className="skeleton-legend-items">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="skeleton-legend-item">
                  <div className="skeleton-legend-color"></div>
                  <div className="skeleton-legend-text"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Section */}
          <div className="skeleton-chart">
            <div className="skeleton-chart-title"></div>
            <div className="skeleton-chart-content">
              <div className="skeleton-chart-bars">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="skeleton-chart-bar-container">
                    <div className="skeleton-chart-bar-label"></div>
                    <div className="skeleton-chart-bar"></div>
                    <div className="skeleton-chart-bar-value"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="skeleton-table">
            <div className="skeleton-table-title"></div>
            <div className="skeleton-table-header"></div>
            <div className="skeleton-table-rows">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="skeleton-table-row">
                  <div className="skeleton-table-cell"></div>
                  <div className="skeleton-table-cell"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;