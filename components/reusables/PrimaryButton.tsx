import { FC, ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'button' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ 
  type = 'submit', 
  children, 
  onClick,
  ...props 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-[200px] text-center text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-4 mt-4 rounded-[100px] cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;