import React, { useState, useRef, useEffect } from "react";
import { FileText, ChevronDown } from "lucide-react";

function DateRangePicker({ 
    onDateChange, 
    initialStartDate = null, 
    initialEndDate = null,
    placeholder = "Select date range",
    className = "" 
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [tempStartDate, setTempStartDate] = useState(initialStartDate);
    const [tempEndDate, setTempEndDate] = useState(initialEndDate);
    const [selectionPhase, setSelectionPhase] = useState('start');
    const datePickerRef = useRef(null);

    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Initialize with today's date if no initial dates provided
    useEffect(() => {
        if (!initialStartDate && !initialEndDate) {
            const today = new Date();
            setTempStartDate(today);
            setTempEndDate(today);
        }
    }, []);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const handleDateClick = (day) => {
        const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        
        if (selectionPhase === 'start') {
            setTempStartDate(clickedDate);
            setTempEndDate(null);
            setSelectionPhase('end');
        } else {
            if (clickedDate < tempStartDate) {
                setTempEndDate(tempStartDate);
                setTempStartDate(clickedDate);
            } else {
                setTempEndDate(clickedDate);
            }
            setSelectionPhase('start');
        }
    };

    const formatDateRange = () => {
        if (tempStartDate && tempEndDate) {
            const start = tempStartDate.toLocaleDateString('en-US', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
            });
            const end = tempEndDate.toLocaleDateString('en-US', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
            });
            return `${start} - ${end}`;
        } else if (tempStartDate) {
            const start = tempStartDate.toLocaleDateString('en-US', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
            });
            return `${start} - Select end date`;
        }
        return placeholder;
    };

    const applyDateRange = () => {
        if (tempStartDate && tempEndDate && onDateChange) {
            onDateChange({
                startDate: tempStartDate,
                endDate: tempEndDate,
                startFormatted: tempStartDate.toLocaleDateString('en-US', { 
                    day: 'numeric', month: 'short', year: 'numeric' 
                }),
                endFormatted: tempEndDate.toLocaleDateString('en-US', { 
                    day: 'numeric', month: 'short', year: 'numeric' 
                }),
                dateRange: `${formatDateRange()}`
            });
        }
        setIsOpen(false);
    };

    const clearDateRange = () => {
        setTempStartDate(null);
        setTempEndDate(null);
        setSelectionPhase('start');
        if (onDateChange) {
            onDateChange(null);
        }
        setIsOpen(false);
    };

    const isDateInRange = (date) => {
        if (!tempStartDate || !tempEndDate) return false;
        return date >= tempStartDate && date <= tempEndDate;
    };

    const isRangeStart = (date) => {
        if (!tempStartDate) return false;
        return date.getTime() === tempStartDate.getTime();
    };

    const isRangeEnd = (date) => {
        if (!tempEndDate) return false;
        return date.getTime() === tempEndDate.getTime();
    };

    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDay = getFirstDayOfMonth(year, month);
        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
        
        const days = [];
        
        // Previous month days
        const prevMonthDays = getDaysInMonth(year, month - 1);
        for (let i = adjustedFirstDay - 1; i >= 0; i--) {
            days.push({
                day: prevMonthDays - i,
                isCurrentMonth: false,
                date: new Date(year, month - 1, prevMonthDays - i)
            });
        }
        
        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                isCurrentMonth: true,
                date: new Date(year, month, i)
            });
        }
        
        // Next month days
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                day: i,
                isCurrentMonth: false,
                date: new Date(year, month + 1, i)
            });
        }
        
        return days;
    };

    const navigateMonth = (direction) => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
    };

    const setQuickDateRange = (days) => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - days);
        
        if (days === 0) {
            setTempStartDate(end);
            setTempEndDate(end);
        } else {
            setTempStartDate(start);
            setTempEndDate(days === 1 ? start : end);
        }
        setSelectionPhase('start');
    };

    const days = generateCalendarDays();

    return (
        <div className={`relative ${className}`} ref={datePickerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 bg-white hover:bg-gray-50 transition-colors"
            >
                <FileText size={13} />
                <span>{formatDateRange()}</span>
                <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-12 left-0 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 w-[320px]">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-4">
                        <button 
                            onClick={() => navigateMonth(-1)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronDown size={16} className="rotate-90 text-gray-600" />
                        </button>
                        <span className="text-sm font-semibold text-gray-700">
                            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </span>
                        <button 
                            onClick={() => navigateMonth(1)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ChevronDown size={16} className="-rotate-90 text-gray-600" />
                        </button>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {daysOfWeek.map(day => (
                            <div key={day} className="text-center text-[10px] font-semibold text-gray-400 py-1">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((dayObj, index) => {
                            const isSelected = isRangeStart(dayObj.date) || isRangeEnd(dayObj.date);
                            const isInRange = isDateInRange(dayObj.date);
                            const isToday = new Date().toDateString() === dayObj.date.toDateString();
                            
                            return (
                                <button
                                    key={index}
                                    onClick={() => dayObj.isCurrentMonth && handleDateClick(dayObj.day)}
                                    disabled={!dayObj.isCurrentMonth}
                                    className={`
                                        h-8 w-8 text-xs rounded-lg flex items-center justify-center
                                        transition-all duration-150
                                        ${!dayObj.isCurrentMonth ? 'text-gray-300 cursor-default' : 'cursor-pointer hover:bg-blue-50'}
                                        ${isSelected ? 'bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow-sm' : ''}
                                        ${isInRange && !isSelected ? 'bg-blue-50 text-blue-600' : ''}
                                        ${isToday && !isSelected ? 'border border-blue-300 text-blue-600' : ''}
                                        ${dayObj.isCurrentMonth && !isSelected && !isInRange && !isToday ? 'text-gray-700' : ''}
                                    `}
                                >
                                    {dayObj.day}
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Select Options */}
                    <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="grid grid-cols-4 gap-1.5">
                            {[
                                { label: 'Today', days: 0 },
                                { label: 'Yesterday', days: 1 },
                                { label: '7 Days', days: 7 },
                                { label: '30 Days', days: 30 }
                            ].map(option => (
                                <button
                                    key={option.label}
                                    onClick={() => setQuickDateRange(option.days)}
                                    className="text-[10px] font-medium text-gray-600 hover:bg-gray-100 rounded-lg py-1.5 transition-colors"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        
                        {/* Apply/Clear Buttons */}
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={clearDateRange}
                                className="flex-1 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={applyDateRange}
                                disabled={!tempStartDate || !tempEndDate}
                                className={`flex-1 text-xs font-semibold text-white rounded-lg py-2 transition-colors
                                    ${tempStartDate && tempEndDate 
                                        ? 'bg-blue-600 hover:bg-blue-700' 
                                        : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DateRangePicker;