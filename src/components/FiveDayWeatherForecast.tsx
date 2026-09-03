import React, { useState, useEffect } from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  Wind,
  Thermometer,
  Calendar,
  RefreshCw,
  Droplets,
  Sparkles,
  Info,
} from 'lucide-react';
import { FiveDayWeatherForecastData, DailyWeatherForecast } from '../types';
import {
  fetch5DayWeatherForecast,
  formatDateISO,
  parseDateISO,
} from '../utils/weatherService';

interface FiveDayWeatherForecastProps {
  destination: string;
  startDate?: string;
  durationDays?: number;
  onUpdateStartDate?: (newDate: string) => void;
  seasonalSummary?: string;
}

export const FiveDayWeatherForecast: React.FC<FiveDayWeatherForecastProps> = ({
  destination,
  startDate,
  durationDays = 5,
  onUpdateStartDate,
  seasonalSummary,
}) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [forecast, setForecast] = useState<FiveDayWeatherForecastData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [selectedDateInput, setSelectedDateInput] = useState<string>(
    startDate || formatDateISO(new Date())
  );
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('');

  // Synchronize internal input if prop changes
  useEffect(() => {
    if (startDate) {
      setSelectedDateInput(startDate);
    }
  }, [startDate]);

  // Fetch forecast whenever destination or startDate changes
  useEffect(() => {
    let isCancelled = false;

    async function loadForecast() {
      setIsLoading(true);
      try {
        const data = await fetch5DayWeatherForecast(destination, selectedDateInput);
        if (!isCancelled) {
          setForecast(data);
          const now = new Date();
          setLastRefreshedTime(
            now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          );
        }
      } catch (err) {
        console.error('Weather load error:', err);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadForecast();

    return () => {
      isCancelled = true;
    };
  }, [destination, selectedDateInput]);

  const handleManualRefresh = async () => {
    setIsLoading(true);
    try {
      const data = await fetch5DayWeatherForecast(destination, selectedDateInput);
      setForecast(data);
      const now = new Date();
      setLastRefreshedTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyDate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDatePickerOpen(false);
    if (onUpdateStartDate) {
      onUpdateStartDate(selectedDateInput);
    }
  };

  const renderWeatherIcon = (
    iconName: DailyWeatherForecast['iconName'],
    className = 'w-7 h-7'
  ) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className={`${className} text-[#F59E0B] drop-shadow-xs`} />;
      case 'CloudSun':
        return <CloudSun className={`${className} text-[#0284C7] drop-shadow-xs`} />;
      case 'Cloud':
        return <Cloud className={`${className} text-[#64748B] drop-shadow-xs`} />;
      case 'CloudRain':
        return <CloudRain className={`${className} text-[#0D9488] drop-shadow-xs`} />;
      case 'CloudDrizzle':
        return <CloudDrizzle className={`${className} text-[#06B6D4] drop-shadow-xs`} />;
      case 'CloudLightning':
        return <CloudLightning className={`${className} text-[#7C3AED] drop-shadow-xs`} />;
      case 'CloudSnow':
        return <CloudSnow className={`${className} text-[#38BDF8] drop-shadow-xs`} />;
      default:
        return <CloudSun className={`${className} text-[#0284C7]`} />;
    }
  };

  const daysToShow = forecast?.days?.slice(0, 5) || [];
  const range = unit === 'C' ? forecast?.averageRangeC : forecast?.averageRangeF;

  return (
    <div
      id="five-day-weather-forecast"
      className="bg-[#FFFDF9] rounded-3xl p-5 sm:p-6 border-2 border-[#2D241E] shadow-sm relative overflow-hidden"
    >
      {/* Decorative Meteorological Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-2 border-[#EFE5D8] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFF2DE] border border-[#FCD34D] text-[#D97706] flex items-center justify-center shrink-0 shadow-xs">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-[#FF7A59] bg-[#FFEAE2] px-2.5 py-0.5 rounded-full border border-[#FFC7B5]">
                Trip Meteorological Forecast
              </span>
              {forecast?.isRealtime && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                  Live Sync
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#2D241E] font-cozy-serif tracking-tight mt-0.5 flex items-center gap-2">
              <span>5-Day Destination Weather</span>
              {range && (
                <span className="text-xs sm:text-sm font-sans font-black text-stone-600">
                  ({range.min}°{unit} – {range.max}°{unit})
                </span>
              )}
            </h3>
          </div>
        </div>

        {/* Right side controls: Date selection, Unit toggle, Refresh */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Trip Date Range Badge & Selector */}
          <button
            type="button"
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D241E] bg-[#FAF5EE] hover:bg-[#F3EAE0] border border-[#E4D7C8] px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs"
            title="Click to change trip start date"
          >
            <Calendar className="w-3.5 h-3.5 text-[#FF7A59]" />
            <span>
              {forecast
                ? `${forecast.days[0]?.formattedDate || ''} – ${
                    forecast.days[forecast.days.length - 1]?.formattedDate || ''
                  }`
                : 'Select Dates'}
            </span>
          </button>

          {/* Celsius / Fahrenheit Toggle */}
          <div className="flex items-center bg-[#FAF5EE] p-0.5 rounded-xl border border-[#E4D7C8]">
            <button
              type="button"
              onClick={() => setUnit('C')}
              className={`text-xs font-black px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                unit === 'C'
                  ? 'bg-[#2D241E] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => setUnit('F')}
              className={`text-xs font-black px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                unit === 'F'
                  ? 'bg-[#2D241E] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              °F
            </button>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={isLoading}
            className="p-1.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F3EAE0] border border-[#E4D7C8] text-stone-600 hover:text-[#2D241E] transition-all cursor-pointer disabled:opacity-50"
            title="Refresh weather data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Date Picker Popover / Drawer when toggled */}
      {isDatePickerOpen && (
        <form
          onSubmit={handleApplyDate}
          className="bg-[#FFF6ED] border-2 border-[#FFC7B5] rounded-2xl p-4 my-3 flex flex-wrap items-center justify-between gap-3 animate-fadeIn"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#FF7A59]" />
            <label
              htmlFor="trip-start-date-input"
              className="text-xs font-black text-[#2D241E] uppercase tracking-wide"
            >
              Trip Start Date:
            </label>
            <input
              id="trip-start-date-input"
              type="date"
              value={selectedDateInput}
              onChange={(e) => setSelectedDateInput(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs font-bold text-[#2D241E] bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7A59]"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="text-xs font-black text-white bg-[#FF7A59] hover:bg-[#E05030] px-3.5 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              Update Forecast
            </button>
            <button
              type="button"
              onClick={() => setIsDatePickerOpen(false)}
              className="text-xs font-bold text-stone-600 hover:text-stone-900 px-2 py-1 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* 5-Day Forecast Grid */}
      <div className="pt-4">
        {isLoading && !forecast ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EAE0D0] animate-pulse h-36 flex flex-col justify-between"
              >
                <div className="h-3 w-12 bg-stone-200 rounded-md" />
                <div className="h-8 w-8 bg-stone-200 rounded-full mx-auto" />
                <div className="h-4 w-16 bg-stone-200 rounded-md mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
            {daysToShow.map((day, idx) => {
              const maxTemp = unit === 'C' ? `${day.tempMaxC}°` : `${day.tempMaxF}°`;
              const minTemp = unit === 'C' ? `${day.tempMinC}°` : `${day.tempMinF}°`;
              const avgTemp = unit === 'C' ? `${day.tempAvgC}°` : `${day.tempAvgF}°`;

              return (
                <div
                  key={day.date || idx}
                  className="bg-[#FAF7F2] hover:bg-[#FFF] rounded-2xl p-3.5 sm:p-4 border-2 border-[#EAE0D0] hover:border-[#FF7A59]/40 transition-all flex flex-col justify-between space-y-2 shadow-xs group"
                >
                  {/* Day Tag & Date */}
                  <div className="flex items-center justify-between border-b border-[#EFE5D8] pb-1.5">
                    <span className="text-[11px] font-black uppercase text-[#2D241E] font-mono">
                      {day.dayName}
                    </span>
                    <span className="text-[10px] font-bold text-stone-500">
                      {day.dayOfWeek}, {day.formattedDate}
                    </span>
                  </div>

                  {/* Weather Icon & Condition */}
                  <div className="flex flex-col items-center py-1 text-center">
                    <div className="transform group-hover:scale-110 transition-transform duration-200 mb-1">
                      {renderWeatherIcon(day.iconName, 'w-8 h-8')}
                    </div>
                    <span className="text-[11px] font-black text-[#2D241E] leading-tight line-clamp-1">
                      {day.condition}
                    </span>
                  </div>

                  {/* Temperature Range Bars */}
                  <div className="bg-white/80 rounded-xl p-2 border border-[#EAE0D0]/70 text-center space-y-1">
                    <div className="flex items-center justify-between text-xs font-black">
                      <span className="text-[#EF4444] font-mono" title="High Temperature">
                        {maxTemp}
                      </span>
                      <span className="text-[10px] text-stone-400 font-bold">/</span>
                      <span className="text-[#3B82F6] font-mono" title="Low Temperature">
                        {minTemp}
                      </span>
                    </div>
                    <div className="text-[10px] font-medium text-stone-500">
                      Avg <span className="font-bold text-stone-700">{avgTemp}</span>
                    </div>
                  </div>

                  {/* Micro Info: Rain Chance & Quick Tip */}
                  <div className="space-y-1 pt-0.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-stone-600">
                      <span className="inline-flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-[#0284C7]" />
                        <span>Rain</span>
                      </span>
                      <span
                        className={
                          day.precipitationChance > 40
                            ? 'text-[#0284C7] font-black'
                            : 'text-stone-500 font-medium'
                        }
                      >
                        {day.precipitationChance}%
                      </span>
                    </div>

                    {/* Day packing advice tip */}
                    <div
                      className="text-[9.5px] text-stone-500 italic leading-tight line-clamp-2 border-t border-dashed border-[#EFE5D8] pt-1"
                      title={day.advice}
                    >
                      {day.advice}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Meteorological Summary Footer */}
      {(seasonalSummary || forecast?.averageRangeC) && (
        <div className="mt-4 pt-3 border-t border-[#EFE5D8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-600">
          <div className="flex items-start sm:items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#FF7A59] shrink-0 mt-0.5 sm:mt-0" />
            <span className="font-medium leading-tight">
              {seasonalSummary ||
                `Expect average daytime temperatures around ${
                  unit === 'C' ? `${range?.avg}°C` : `${range?.avg}°F`
                } in ${destination}.`}
            </span>
          </div>
          {forecast?.source && (
            <div className="text-[10px] font-mono text-stone-400 self-end sm:self-auto shrink-0">
              Source: {forecast.source}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
