import { FC } from 'react';

interface ProgressIndicatorProps {
  currentSection: number;
  totalSections: number;
  title?: string;
}

const ProgressIndicator: FC<ProgressIndicatorProps> = ({ 
  currentSection, 
  totalSections,
  title 
}) => {
  return (
    <div className="w-full bg-white rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-2">
        {title && <p className="text-sm text-gray-500">{title}</p>}
        <p className="text-sm text-gray-500">
          {currentSection} de {totalSections}
        </p>
      </div>
      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#0171e3] transition-all duration-300 ease-out rounded-full"
          style={{ 
            width: `${(currentSection / totalSections) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;