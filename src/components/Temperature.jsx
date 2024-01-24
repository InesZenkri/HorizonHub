import React from 'react';
import { formatTLT, CustomDate, round  } from '../makeitwork/weather'; 
import { Icon } from '@iconify/react';
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
    UilArrowUp,
    UilArrowDown,
  } from "@iconscout/react-unicons";
function Temperature({ currentFormattedData }) {
    const getWeatherIcon = (weatherDescription) => {
        const iconMapping = {
          '01d': 'meteocons:clear-day-fill',
          '01n': 'meteocons:clear-night-fill',
          '02d': 'meteocons:partly-cloudy-day-fog-fill',
          '02n': 'meteocons:partly-cloudy-night-fog-fill',
          '03d': 'meteocons:partly-cloudy-day-haze-fill',
          '03n': 'meteocons:partly-cloudy-night-haze-fill',
          '04d': 'meteocons:partly-cloudy-day-haze-fill',
          '04n': 'meteocons:partly-cloudy-night-haze-fill',
          '09d': 'meteocons:extreme-day-rain-fill',
          '09n': 'meteocons:extreme-night-rain-fill',
          '10d': 'meteocons:partly-cloudy-day-rain-fill',
          '10n': 'meteocons:partly-cloudy-night-rain-fill',
          '11d': 'meteocons:thunderstorms-day-overcast-fill',
          '11n': 'meteocons:thunderstorms-night-extreme-fill',
          '13d': 'meteocons:partly-cloudy-day-snow-fill',
          '13n': 'meteocons:partly-cloudy-night-snow-fill',
          '50d': 'meteocons:dust-wind-fill',
        };

        return iconMapping[weatherDescription.toLowerCase()] || 'meteocons:default-icon';
    };
    const weatherIcon = getWeatherIcon(currentFormattedData.icon);

  return (
    <div>
         <div>
        <div className=" flex items-center justify-center my-6">
            <p className="text-white text-xl font-extralight">
                {CustomDate(currentFormattedData.dt, currentFormattedData.timezone)}
            </p>
        </div>
        <div className=" flex items-center justify-center my-4">
            <p className="text-white text-3xl font-medium py-3">
            {currentFormattedData.name}, {currentFormattedData.country}
            </p>
        </div>

    </div>
        <p className="text-4xl text-white flex justify-center">{round(currentFormattedData.temp)}°</p>
        <div className="flex items-center justify-center py-3 text-xl text-cyan-300" >
            <Icon icon={weatherIcon} className="w-15" width="70"/>
                <p className='wx-6 font-medium text-2xl'>
                    {currentFormattedData.description.charAt(0).toUpperCase() + currentFormattedData.description.slice(1)}
                </p>
        </div>

        <div className=" flex flex-row items-center text-white py-3 justify-center">
            <div className="flex flex-row space-x-3 justify-center">
                <div className="flex font-light text-sm items-center justify-center">
                    <UilTemperature  size={18} className="mr-1"/>
                        Feels like:
                    <span className="font-medium ml-1">{round(currentFormattedData.feels_like)}°</span>
                </div>
                <p className="font-light">|</p>
                <div className="flex font-light text-sm items-center justify-center">
                    <UilTear size={18} className="mr-1" />
                        Humidity:
                    <span className="font-medium ml-1">{currentFormattedData.humidity}%</span>
                </div>
                <p className="font-light">|</p>
                <div className="flex font-light text-sm items-center justify-center">
                    <UilWind size={18} className="mr-1" />
                        Wind:
                     <span className="font-medium ml-1">{currentFormattedData.speed}km/h</span>
                </div>
            </div>  
        </div>
        <div className="flex flex-row intems-center justify-center space-x-1 text-white text-sm py-3">
                <UilSun />
                    <p className="font-light">
                        Rise:{" "}
                        <span className="font-light ml-1">{formatTLT(currentFormattedData.sunrise)}</span>
                    </p>
                <p className="font-light">|</p>
                <UilSunset />
                    <p className="font-light">
                        Set:{" "}
                        <span className="font-light ml-1">{formatTLT(currentFormattedData.sunset)}</span>
                    </p>
                <p className="font-light">|</p>
                <UilArrowUp  />
                    <p className="font-light">
                        High:{" "}
                        <span className="font-light ml-1">{round(currentFormattedData.temp_max)}°</span>
                    </p>
                     <p className="font-light">|</p>

                <UilArrowDown />
                    <p className="font-light">
                        Low:{" "}
                        <span className="font-light ml-1">{round(currentFormattedData.temp_min)}°</span>
                     </p>
         </div>

    </div>

  )
}

export default Temperature
