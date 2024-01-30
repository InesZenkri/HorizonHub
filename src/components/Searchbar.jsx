import React, {useState } from "react";
import { UilSearch, UilLocationPoint , UilMap, UilSync } from "@iconscout/react-unicons";

function Searchbar({  onCitySelect, onToggleTemperatureUnit})  {

    const [searchQuery, setSearchQuery] = useState("");
    const [currentLocation, setCurrentLocation] = useState(null);
    const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLocationClick = () => {
      setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                try {
                  setLoading(true);// started
                  const reverseGeocodeUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
                  const reverseGeocodeResponse = await fetch(reverseGeocodeUrl);
                  const reverseGeocodeData = await reverseGeocodeResponse.json();
                  const city = reverseGeocodeData.city;
                  console.log("City:", city);
                  onCitySelect(city);
                  setLoading(false);
                }catch (error) {
                  console.error("Error getting weather data:", error.message);
                } finally {
                  setLoading(false); // data fetching is complete
                }
              },
            (error) => {
              console.error("Error getting user's location:", error.message);
            }
          );
        } else {
            console.error("Geolocation is not supported by this browser.");
          }
    };

    const handleInputClick = (e) => {
        e.target.select();
    };

    const handleSearchClick = async () => {
        if (searchQuery.trim() !== "") {
            onCitySelect(searchQuery);
            setSearchQuery("");
            setCurrentLocation(null);
        }else {
          setAnimate(true);
          setTimeout(() => {
          setAnimate(false);
            }, 500);
        }
        };
        
        const handleInputChange = (e) => {
          if (e.target.value.trim() !== "") {
            setSearchQuery(e.target.value);
          } else {
            setAnimate(true);
            setSearchQuery("");
            setTimeout(() => {
              setAnimate(false);
            }, 500);
          }
        };

    const handleToggleTemperatureUnit = (unit) => {
      setTemperatureUnit(unit);
      onToggleTemperatureUnit(unit);
    };

    return (
      
        <div className="flex flex-row justify-center mx-1">
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4 my-3">
                <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onClick={handleInputClick}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearchClick();
                    }
                }}
                placeholder=" Search for city.... "
                className={`${animate ? 'animate-shake' : 'animate-none'} text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-full` }
                />
                <UilSearch
                    size={30}
                    onClick={handleSearchClick}
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                />
                {loading ? (
                      <UilSync size={30} className="text-white cursor-pointer animate-spin" />
                    ) : (
                      <UilLocationPoint
                        size={30}
                        onClick={handleLocationClick}
                        className="text-white cursor-pointer transition ease-out hover:scale-125"
                      />
                    )}

                <UilMap
                size={30}
                className="text-white cursor-pointer transition ease-out hover:scale-125"
                />

                
            </div>
    
          <div className="flex flex-row w-1/4 items-center justify-center">
            <button
              name="metric"
             onClick={() => handleToggleTemperatureUnit('Celsius')}
              className={` text-white font-light transition ease-out hover:scale-125 ${temperatureUnit === 'Celsius' ? 'font-medium text-2xl' : 'font-light'}`}>
              °C
            </button>
            <p className=" text-white mx-1">|</p>
            <button
              name="imperial"
              onClick={() => handleToggleTemperatureUnit('Fahrenheit')}
              className={` text-white font-light transition ease-out hover:scale-125 ${temperatureUnit === 'Fahrenheit' ? 'font-medium text-2xl' : 'font-light'}`}>
              °F
            </button>
          </div>
        </div>
      );
}

export default Searchbar


