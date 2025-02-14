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
  disabled,
  ...props 
}) => {
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-[200px] h-[45px] text-center text-[14px] text-[#FFFFFF] font-[400] bg-[#0171e3] rounded-lg transition-colors duration-200 hover:bg-[#0156aa] ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
