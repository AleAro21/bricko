import React from 'react';
import Link from 'next/link';

interface SummaryCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, title, description, href }) => {
  const CardContent = () => (
    <div className="h-full bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col h-full">
        <div className="text-[#f95940] w-8 h-8 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-[18px] font-[500] text-[#1d1d1f] mb-2">{title}</h3>
        <p className="text-[14px] text-gray-600 flex-grow">{description}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default SummaryCard;