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
      className="w-[200px] text-center text-[14px] text-[#FFFFFF] font-[400] bg-[#0171e3] py-3 px-12 rounded-lg cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;