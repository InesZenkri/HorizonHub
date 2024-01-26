import React from 'react';
import { CustomDate, round  } from '../makeitwork/weather'; 
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

  return (
    <div>
         <div>
        <div className=" flex items-center justify-center my-6">
            <p className="text-white text-xl font-extralight">
                {CustomDate(currentFormattedData.location.localtime_epoch)}
            </p>
        </div>
        <div className=" flex items-center justify-center my-4">
            <p className="text-white text-3xl font-medium py-3">
                    {currentFormattedData.location.name}, {currentFormattedData.location.country}
            </p>
        </div>

    </div>
        <p className="text-4xl text-white flex justify-center">{round(currentFormattedData.current.temp_c)}°</p>
        <div className="flex items-center justify-center py-3 text-xl text-cyan-300" >
        <img src={currentFormattedData.current.condition.icon} className="my-1 w-15" type="image/png" width="70" />
                <p className='wx-6 font-medium text-2xl'>
                    {currentFormattedData.current.condition.text}
                </p>
        </div>

        <div className=" flex flex-row items-center text-white py-3 justify-center">
            <div className="flex flex-row space-x-2 justify-center">
                <div className="flex font-light text-sm items-center justify-center">
                    <UilTemperature  size={18} className="mr-1"/>
                        Feels like:
                    <span className="font-medium ml-1">{round(currentFormattedData.current.feelslike_c)}°</span>
                </div>
                <p className="font-light">|</p>
                <div className="flex font-light text-sm items-center justify-center">
                    <UilTear size={18} className="mr-1" />
                        Humidity:
                    <span className="font-medium ml-1">{currentFormattedData.current.humidity}%</span>
                </div>
                <p className="font-light">|</p>
                <div className="flex font-light text-sm items-center justify-center">
                    <UilWind size={18} className="mr-1" />
                        Wind:
                     <span className="font-medium ml-1">{currentFormattedData.current.wind_kph}km/h</span>
                </div>
            </div>  
        </div>
        <div className="flex flex-row intems-center  justify-center space-x-0.5 text-white text-sm py-3">
                <UilSun />
                    <p className="font-light">
                        Rise:{" "}
                        <span className="font-light ">{currentFormattedData.forecast.forecastday[0].astro.sunrise}</span>
                    </p>
                <p className="font-light">|</p>
                <UilSunset />
                    <p className="font-light">
                        Set:{" "}
                        <span className="font-light ">{currentFormattedData.forecast.forecastday[0].astro.sunset}</span>
                    </p>
                <p className="font-light">|</p>
                <UilArrowUp  />
                    <p className="font-light">
                        High:{" "}
                        <span className="font-light ">{round(currentFormattedData.forecast.forecastday[0].day.maxtemp_c)}°</span>
                    </p>
                     <p className="font-light">|</p>

                <UilArrowDown />
                    <p className="font-light">
                        Low:{" "}
                        <span className="font-light ">{round(currentFormattedData.forecast.forecastday[0].day.mintemp_c)}°</span>
                     </p>
         </div>

    </div>

  )
}

export default Temperature
