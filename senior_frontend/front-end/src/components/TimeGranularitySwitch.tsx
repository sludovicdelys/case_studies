import React, { useState } from 'react';

interface TimeGranularitySwitchProps {
  selectedGranularity: string;
  onSelectGranularity: (granularity: string) => void;
}

const TimeGranularitySwitch: React.FC<TimeGranularitySwitchProps> = ({ selectedGranularity, onSelectGranularity }) => {
  const granularities = ['hourly', 'daily', 'monthly', 'yearly'];
  const [sliderValue, setSliderValue] = useState(50); // initial slider value

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  const getSliderLabels = () => {
    if (selectedGranularity === 'monthly') {
      return Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
    } else if (selectedGranularity === 'yearly') {
      return Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`);
    }
    return [];
  };

  return (
    <div className="fixed bottom-3 left-3 z-20 w-[calc(14vw_+_16rem)] rounded-xl bg-white px-4 py-3 shadow-xl drop-shadow-2xl min-[780px]:w-[calc((14vw_+_16rem)_-_30px)] xl:px-5 dark:bg-gray-800">
      <div>
        <div className="flex flex-row items-baseline justify-between sm:pb-2 hidden sm:flex">
          <p className="select-none text-left text-base font-bold">Afficher les données passées</p>
          <div className="h-10 sm:h-8">
            <div className="select-none whitespace-nowrap rounded-full bg-brand-green/10 px-2 py-1 text-sm text-brand-green lg:px-3 dark:bg-gray-700 dark:text-white">2 juin 2024</div>
          </div>
        </div>
        <div role="group" dir="ltr" className="flex-start mb-2 flex flex-row items-center gap-x-2 md:gap-x-1.5 lg:gap-x-2" aria-label="Time settings" tabIndex={0}>
          {granularities.map((granularity) => (
            <button
              key={granularity}
              type="button"
              aria-pressed={selectedGranularity === granularity}
              aria-label={granularity}
              className={`inline-flex select-none rounded-full px-2.5 py-2 text-sm capitalize sm:px-2 lg:px-3 ${
                selectedGranularity === granularity
                  ? 'bg-white font-bold text-green-900 shadow-2xl dark:border dark:border-gray-400/10 dark:bg-gray-600 dark:text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
              onClick={() => onSelectGranularity(granularity)}
            >
              <p className="w-15 dark:opacity-80">{granularity}</p>
            </button>
          ))}
        </div>
        <div className="w-full">
            <input
            type="range"
            min="1"
            max={getSliderLabels().length}
            value={sliderValue}
            className="slider appearance-none w-full h-1.5 bg-gray-200 rounded-full outline-none"
            onChange={handleSliderChange}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
            {getSliderLabels().map((label, index) => (
                <span key={index}>{label}</span>
            ))}
            </div>
        </div>
        </div>
    </div>
  );
};

export default TimeGranularitySwitch;