import React, { useState } from 'react';
import TimeGranularitySwitch from './TimeGranularitySwitch';

const Dashboard: React.FC = () => {
    const [timeGranularity, setTimeGranularity] = useState('monthly');
    const [timeBoundaries, setTimeBoundaries] = useState({ start: '2022-01-01', end: '2022-12-31' });

    return (
    <div className="p-4">
        <div className="flex justify-between items-center">
        <h2 className="text-2xl mb-4">ESG Indicators</h2>
        </div>
        <TimeGranularitySwitch
        selectedGranularity={timeGranularity}
        onSelectGranularity={setTimeGranularity}
        selectedTimeBoundaries={timeBoundaries}
        onSelectTimeBoundaries={setTimeBoundaries}
        />
    </div>
    );
};

export default Dashboard;