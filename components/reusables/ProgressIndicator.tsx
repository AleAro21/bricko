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
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        {title && (
          <p className="text-sm font-medium text-gray-600">
            {title}
          </p>
        )}
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold text-[#f95940]">{currentSection}</span>
          <span className="text-sm text-gray-400">/</span>
          <span className="text-sm text-gray-600">{totalSections}</span>
        </div>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#f95940] to-[#f95940] transition-all duration-500 ease-out rounded-full"
          style={{ 
            width: `${(currentSection / totalSections) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;