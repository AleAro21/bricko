import { FC, ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'button' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ 
  type = 'submit', 
  children, 
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-[200px] h-[45px] text-center text-[14px] text-[#FFFFFF] font-[400] bg-[#0171e3] rounded-lg cursor-pointer hover:bg-[#0156aa] transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;