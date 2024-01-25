import React from 'react'
import { Icon } from '@iconify/react';
import logo from '../icons/er.svg';
import { useState, useEffect } from 'react';
import { round,br  } from '../makeitwork/weather'; 

function Details({h, currentFormattedData}) {
    const [weatherDetails, setWeatherDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            if (currentFormattedData) {
              const details = await br(currentFormattedData);
              setWeatherDetails(details);
            }
          }finally {
            setLoading(false);
          }
        };
        fetchData();
      }, [currentFormattedData]);
      return (
        <div>
          <div className="flex items-center justify-stat mt-6">
            <p className="text-white font-medium uppercase">{h}</p>
          </div>
          <hr className="my-2"></hr>
          <div className="flex flex-row items-center justify-between text-white details-scroll-container relative">
            {loading ? (
              <p>Loading...</p>
            ) : weatherDetails && weatherDetails.length > 0 ? (
              weatherDetails.map((weatherItem, index) => (
                <div key={index} className="flex flex-col items-center justify-center mx-7">
                  <p className="font-light text-sm">
                    {new Date(weatherItem.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <Icon icon={`meteocons:${weatherItem.icon}-fill`} width="45" className="my-1" />
                  <p className="font-medium">{round(weatherItem.temperature)}°</p>
                </div>
              ))
            ) : (
              <div>
                <p>No hourly forecast data available.</p>
                <img src={logo} alt="Error" type="image/svg" className="object-cover h-50 w-96" />
              </div>
            )}
          </div>
        </div>
      );
    }
    
    export default Details;
    