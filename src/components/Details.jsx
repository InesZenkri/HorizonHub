import React from 'react'
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { round  } from '../makeitwork/weather'; 
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
  UilArrowUp,
  UilArrowDown,
} from "@iconscout/react-unicons";
function Details({h, currentFormattedData ,temperatureUnit}) {
  return (
    <div className='mx-3'>
      <div className="flex items-center justify-stat mt-6">
        <p className="text-white font-medium uppercase">{h}</p>
      </div>
      <hr className="my-2"></hr>
      <div className="flex flex-row items-center justify-start text-white details-scroll-container overflow-x-auto relative">
        {currentFormattedData.forecast.forecastday[0].hour.map((weatherItem, index) => {
          const currentTime = new Date().getTime() / 1000;
          const hourTime = new Date(weatherItem.time).getTime() / 1000;        
          // Only render future hours
          if (hourTime > currentTime) {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center mx-2 "
                style={{ backgroundColor: 'rgb(255, 255, 255, 0.2)', borderRadius: '8px' }}
              >
                <p className="font-light text-sm">
                  {new Date(weatherItem.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
          
                <img src={weatherItem.condition.icon} className="my-3 mx-9" type="image/png" />
               
                <p className="font-medium flex flex-row">
                  {temperatureUnit === 'Celsius' ? round(weatherItem.temp_c) : round(weatherItem.temp_f)}°
                </p>
              </div>
            );
          }
          return null;
        })}
        {currentFormattedData.forecast.forecastday[1].hour.map((weatherItem, index) => {
          const currentTime = new Date().getTime() / 1000 + 86400;
          const hourTime = new Date(weatherItem.time).getTime() / 1000;
          // Only render till same hour tomorrow
          if (hourTime < currentTime) {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center mx-3"
                style={{ backgroundColor: 'rgb(255, 255, 255, 0.2)', borderRadius: '8px' }}
              >
                <p className="font-light text-sm">
                  {new Date(weatherItem.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
          
                <img src={weatherItem.condition.icon} className="my-3 mx-9" type="image/png" />
               
                <p className="font-medium flex flex-row">
                {temperatureUnit === 'Celsius' ? round(weatherItem.temp_c) : round(weatherItem.temp_f)}°
                </p>
              </div>
            );
          }
  
          return null; 
        })}
      </div>
    </div>
  );
}  
export default Details;
    