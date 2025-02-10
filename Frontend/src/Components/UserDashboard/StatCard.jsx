import React from 'react';

function StatCard({ title, value, unit }) {
  return (
    <div className="backdrop-blur-md bg-[#778DA9]/40 p-6 rounded-xl border border-[#778DA9]/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]">
      <h3 className="text-[#AEC3B0] text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-[#EFF6E0]">{value}</p>
        <p className="ml-2 text-[#0D1B2A]">{unit}</p>
      </div>
    </div>
  );
}

export default StatCard;