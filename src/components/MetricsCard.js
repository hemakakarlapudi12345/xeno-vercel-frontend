import React from 'react';

const MetricsCard = ({ title, value }) => (
  <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 20, margin: 10 }}>
    <h4>{title}</h4>
    <p style={{ fontSize: 24 }}>{value}</p>
  </div>
);

export default MetricsCard;
