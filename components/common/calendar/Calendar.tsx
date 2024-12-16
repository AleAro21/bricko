import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";

interface CalendarProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  className?: string;
}

const StyledWrapper = styled.div`
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

  .calendar-input {
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    border: 1px solid #e4e4e4;
    border-radius: 12px;
    background-color: #ffffff;
    color: #1d1d1f;
    transition: all 0.2s ease;
    outline: none;
    -webkit-appearance: none;
    cursor: pointer;

    &:hover {
      border-color: #b8b8b8;
    }

    &:focus {
      border-color: #0071e3;
      box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
    }
  }

  .react-datepicker {
    background: #ffffff;
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    padding: 16px;
    font-family: inherit;
    width: 320px;
  }

  .calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 0 8px;
  }

  .calendar-header-content {
    font-size: 16px;
    font-weight: 500;
    color: #1d1d1f;
    text-transform: capitalize;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f5f5f7;
    }
  }

  .calendar-nav-button {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: #1d1d1f;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 50%;

    &:hover {
      background-color: #f5f5f7;
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  .react-datepicker__month-container {
    width: 100%;
  }

  .react-datepicker__month {
    margin: 0;
    padding: 0 8px;
  }

  .react-datepicker__week {
    display: flex;
    justify-content: space-around;
    margin-bottom: 4px;
  }

  .react-datepicker__day-name {
    color: #86868b;
    font-size: 12px;
    font-weight: 500;
    width: 36px;
    margin: 4px;
  }

  .react-datepicker__day {
    width: 36px;
    height: 36px;
    line-height: 36px;
    margin: 4px;
    border-radius: 50%;
    color: #1d1d1f;
    font-size: 14px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f5f5f7;
    }

    &--selected {
      background-color: #0071e3;
      color: white;
    }

    &--keyboard-selected {
      background-color: rgba(0, 113, 227, 0.1);
      color: #0071e3;
    }

    &--outside-month {
      color: #86868b;
      opacity: 0.5;
    }
  }

  .react-datepicker__month-dropdown,
  .react-datepicker__year-dropdown {
    background-color: white;
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    padding: 8px 0;
    max-height: 300px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f5f5f7;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #86868b;
      border-radius: 4px;
    }
  }

  .react-datepicker__month-option,
  .react-datepicker__year-option {
    padding: 8px 16px;
    color: #1d1d1f;
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f7;
    }

    &--selected {
      background-color: rgba(0, 113, 227, 0.1);
      color: #0071e3;
      font-weight: 500;
    }
  }

  .react-datepicker__year-dropdown {
    width: 120px;
  }

  .react-datepicker__close-icon {
    padding: 0;
    right: 12px;

    &::after {
      background-color: transparent;
      color: #86868b;
      font-size: 18px;
      padding: 0;
      transition: all 0.2s ease;
    }

    &:hover::after {
      color: #1d1d1f;
    }
  }
`;

// SVG Icons as components
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onChange,
  minDate,
  maxDate,
  placeholderText = "Seleccionar fecha",
  className,
}) => {
  const defaultClassName = "calendar-input";
  const combinedClassName = className ? `${defaultClassName} ${className}` : defaultClassName;

  // Generate year range for faster selection
  const generateYearRange = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    const startYear = minDate ? minDate.getFullYear() : currentYear - 100;
    const endYear = maxDate ? maxDate.getFullYear() : currentYear;

    for (let year = endYear; year >= startYear; year--) {
      years.push(year);
    }
    return years;
  };

  return (
    <StyledWrapper>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        minDate={minDate}
        maxDate={maxDate}
        placeholderText={placeholderText}
        className={combinedClassName}
        isClearable
        showPopperArrow={false}
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
          changeYear,
          changeMonth,
        }) => (
          <div className="calendar-header">
            <button
              className="calendar-nav-button"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <ChevronLeft />
            </button>
            <div className="calendar-header-content">
              <select
                value={date.getMonth()}
                onChange={({ target: { value } }) => changeMonth(parseInt(value, 10))}
                className="bg-transparent appearance-none cursor-pointer px-1"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(date.getFullYear(), i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
              <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(parseInt(value, 10))}
                className="bg-transparent appearance-none cursor-pointer px-1 ml-1"
              >
                {generateYearRange().map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="calendar-nav-button"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <ChevronRight />
            </button>
          </div>
        )}
      />
    </StyledWrapper>
  );
};

export default Calendar;  