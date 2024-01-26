import React from 'react'
import { Icon } from '@iconify/react';
import logo from '../icons/er.svg';
import { useState, useEffect } from 'react';
import { round  } from '../makeitwork/weather'; 
import { DateTime } from 'luxon';
import {
    UilTear,
    UilWind,
    UilArrowUp,
    UilArrowDown,
  } from "@iconscout/react-unicons";
function Daily({h, currentFormattedData}) {

    return (
        <div>
          <div className="flex items-center justify-stat mt-6">
            <p className="text-white font-medium uppercase">{h}</p>
          </div>
          <hr className="my-2"></hr>
          <div className="flex flex-row items-center justify-start text-white details-scroll-container overflow-x-auto relative">
            {currentFormattedData.forecast.forecastday.slice(1).map((dayItem, index) => {
              const date = DateTime.fromISO(dayItem.date);
                // Extract information from the response
                const iconPath = dayItem.day.condition.icon;
                const iconParts = iconPath.split('/');
                const iconName = iconParts[iconParts.length - 1]; 

                // Construct the new path based on your desired folder structure
                const dayOrNight = iconPath.includes('day') ? 'day' : 'night';
                const newPath = `./icons/64x64/${dayOrNight}/${iconName}`;
            console.log(newPath);
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center mx-2"
                  style={{ backgroundColor: 'rgb(216, 216, 216, 0.2)', borderRadius: '8px' }}
                >
                  <p className="font-light text-sm">{date.toFormat('cccc')}</p>
                  <img src={dayItem.day.condition.icon} className="my-1" type="image/png" />
                  <p className="font-light text-sm flex flex-row">
                  <UilArrowUp size={18} /> {round(dayItem.day.maxtemp_c)}°, <UilArrowDown size={18} /> {round(dayItem.day.mintemp_c)}°
                  </p>
                  <p className="font-light text-sm flex flex-row">
                  <UilTear size={18} /> {round(dayItem.day.avghumidity)}%, <UilWind size={18} /> {round(dayItem.day.mintemp_c)}°
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      );

}  
export default Daily;