import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import { ApiService } from '../services/api';
import { Indicator, Dimension } from '../types';
import Select from 'react-select';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const apiService = new ApiService();

const Dashboard: React.FC = () => {
    const [data, setData] = useState<Indicator[]>([]);
    const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(null);
    const [dimensions, setDimensions] = useState<Dimension[]>([]);
    const [dateRange, setDateRange] = useState<string[]>([]);
    const [timeGranularity, setTimeGranularity] = useState('monthly');
    const timeGranularityOptions = [
        { value: 'monthly', label: 'Mensuel' },
        { value: 'yearly', label: 'Annuel' }
    ];
    

    useEffect(() => {
        apiService.fetchDimensions().then((data) => setDimensions(data));
    }, []);

    useEffect(() => {
        if (selectedDimension && dateRange.length > 0) {
          apiService.fetchIndicators(selectedDimension.id, dateRange).then((data) => setData(data));
        }
    }, [selectedDimension, dateRange, timeGranularity]);

    useEffect(() => {
        if (selectedDimension) {
          const filteredData = data.filter(item => 
            item.country === selectedDimension.country && 
            item.business_unit === selectedDimension.business_unit
          );
          setData(filteredData);
        }
      }, [selectedDimension]);

    const handleDimensionChange = (selectedOption: any) => {
        const selectedDimension = dimensions.find(dim => dim.id === selectedOption.value);
        setSelectedDimension(selectedDimension || null);
    };

    const handleDateChange = (dates: any, dateStrings: [string, string]) => {
        setDateRange(dateStrings);
    };

    const handleGranularityChange = (selectedOption: any) => {
        setTimeGranularity(selectedOption.value);
    };

    const dimensionOptions = dimensions.map(dim => ({ value: dim.id, label: `${dim.country} - ${dim.business_unit}` }));


    return (
    <div className="p-4">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl mb-4">ESG Indicators</h2>
            <Select options={dimensionOptions} onChange={handleDimensionChange} placeholder="Select dimension" />
            <RangePicker onChange={handleDateChange} />
            <Select
                options={timeGranularityOptions}
                onChange={handleGranularityChange}
                value={timeGranularityOptions.find(option => option.value === timeGranularity)}
                placeholder="Select granularity"
            />
        </div>
        <Chart
            data={data}
            xDataKey="date"
            yDataKeys={["co2_emissions", "female_headcount", "gender_parity_ratio", "male_headcount", "total_revenue"]}
            colors={["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000"]}
            timeGranularity={timeGranularity}
        />
    </div>
    );
};

export default Dashboard;