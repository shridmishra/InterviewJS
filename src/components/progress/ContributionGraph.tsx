import React from 'react';

interface ContributionGraphProps {
    contributions: { [date: string]: number };
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ contributions }) => {
    const today = new Date();
    const endDate = new Date(today);
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);

    const dates = [];
    // eslint-disable-next-line prefer-const
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Adjust for week start
    const dayOfWeek = startDate.getDay();
    for (let i = 0; i < dayOfWeek; i++) {
        dates.unshift(null);
    }

    const weeks = [];
    for (let i = 0; i < dates.length; i += 7) {
        weeks.push(dates.slice(i, i + 7));
    }

    const getColor = (count: number) => {
        if (count === 0) return 'bg-gray-200 dark:bg-gray-800';
        if (count <= 1) return 'bg-yellow-200 dark:bg-yellow-900/50';
        if (count <= 2) return 'bg-yellow-300 dark:bg-yellow-900/80';
        if (count <= 4) return 'bg-yellow-400 dark:bg-yellow-600';
        return 'bg-yellow-500 dark:bg-yellow-400';
    };

    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex flex-col justify-between pt-5 pb-1">
                {dayLabels.map((day, i) => (i % 2 !== 0 ? <span key={day}>{day}</span> : <span key={day}></span>))}
            </div>
            <div className="overflow-x-auto">
                <div className="grid grid-flow-col gap-1">
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="grid grid-rows-7 gap-1">
                            {weekIndex % 4 === 0 && (
                                <div className="absolute -top-5 text-gray-500 dark:text-gray-400 text-xs">
                                    {week[0] ? monthLabels[week[0].getMonth()] : ''}
                                </div>
                            )}
                            {week.map((date, dayIndex) => {
                                const dateString = date ? date.toISOString().split('T')[0] : '';
                                const count = contributions[dateString] || 0;
                                return (
                                    <div 
                                        key={dayIndex}
                                        className="relative group"
                                    >
                                        <div className={`w-3.5 h-3.5 rounded-sm ${date ? getColor(count) : 'bg-transparent'}`} />
                                        {date && (
                                            <div className="absolute bottom-full mb-2 w-max p-2 text-xs bg-black text-white border border-gray-700 rounded-md invisible group-hover:visible z-10">
                                                {count} submissions on {date.toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContributionGraph;