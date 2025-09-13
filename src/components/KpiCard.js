// src/components/KpiCard.js
const KpiCard = ({ title, value, icon }) => (
  <div className="bg-white shadow rounded p-4 w-full md:w-1/4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-3xl text-blue-500">{icon}</div>
    </div>
  </div>
);

export default KpiCard;
