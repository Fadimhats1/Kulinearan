import React from 'react';

export const TabChip = ({ onClickHandler, name, tabValue }) => {
  return (
    <button
      onClick={() => onClickHandler(name)}
      className={`font-bold text-sm duration-300 px-6 py-3 rounded-2xl ${tabValueColor(
        {
          key: name,
          value: tabValue,
        }
      )}`}
    >
      {name}
    </button>
  );
};

const tabValueColor = ({ key, value }) => {
  return value === key ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400';
};
