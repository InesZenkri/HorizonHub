import React from 'react';
import { CustomDate, round  } from '../makeitwork/weather'; 
//import { Icon } from '@iconify/react';
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
    UilArrowUp,
    UilArrowDown,
  } from "@iconscout/react-unicons";
function Temperature({ currentFormattedData , temperatureUnit}) {

  return (
    <div>
         <div>
        <div className=" flex items-center justify-center my-6">
            <p className="text-white font-extralight  text-xl  md:text-2xl">
                {CustomDate(currentFormattedData.location.localtime_epoch)}
            </p>
        </div>
        <div className=" flex items-center justify-center my-4">
            <p className="text-white text-3xl font-medium py-3">
                    {currentFormattedData.location.name}, 
            </p>
            <p className="text-white text-2xl font-medium py-3 px-1">
                    {currentFormattedData.location.country}
            </p>
        </div>

    </div>
        <p className="text-4xl text-white flex justify-center">{temperatureUnit === 'Celsius' ? round(currentFormattedData.current.temp_c) : round(currentFormattedData.current.temp_f)}°</p>
        <div className="flex items-center justify-center py-3 text-xl text-cyan-300" >
        <img src={currentFormattedData.current.condition.icon} className="my-1 w-15" type="image/png" width="70" />
                <p className='wx-6 font-medium text-2xl'>
                    {currentFormattedData.current.condition.text}
                </p>
        </div>

        <div className=" flex flex-row items-center text-white py-3 justify-center">
            <div className="flex flex-row space-x-2 justify-center ">
                <div className="flex font-light text-sm items-center justify-center">
                    <UilTemperature  size={18} className="mr-1"/>
                        Feels like:
                    <span className="font-medium ml-1">{temperatureUnit === 'Celsius' ? round(currentFormattedData.current.feelslike_c) : round(currentFormattedData.current.feelslike_f)}°</span>
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
        <div className="flex flex-row intems-center justify-center space-x-0.5 text-white text-xs xs:text-base md:text-xl py-3 ">
                <UilSun size={18}/>
                    <p className="font-light">
                        Rise:{" "}
                        <span className="font-medium ">{currentFormattedData.forecast.forecastday[0].astro.sunrise}</span>
                    </p>
                <p className="font-light">|</p>
                <UilSunset size={18}/>
                    <p className="font-light">
                        Set:{" "}
                        <span className="font-medium ">{currentFormattedData.forecast.forecastday[0].astro.sunset}</span>
                    </p>
                <p className="font-light">|</p>
                <UilArrowUp size={18} />
                    <p className="font-light">
                        High:{" "}
                        <span className="font-medium ">{temperatureUnit === 'Celsius' ? round(currentFormattedData.forecast.forecastday[0].day.maxtemp_c) : round(currentFormattedData.forecast.forecastday[0].day.maxtemp_f)}°</span>
                    </p>
                     <p className="font-light">|</p>

                <UilArrowDown size={18} />
                    <p className="font-light">
                        Low:{" "}
                        <span className="font-medium ">{temperatureUnit === 'Celsius' ? round(currentFormattedData.forecast.forecastday[0].day.mintemp_c) : round(currentFormattedData.forecast.forecastday[0].day.mintemp_f) }°</span>
                     </p>
         </div>

    </div>

  )
}

export default Temperature
