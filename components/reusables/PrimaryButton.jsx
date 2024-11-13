import React from 'react';

const PrimaryButton = ({ type = 'submit', children, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-[200px] text-center text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-4 mt-4 rounded-[100px] cursor-pointer"
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
