import React, {useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { getFormattedData } from '../makeitwork/weather';

function Searchbar({ onToggleTemperatureUnit, onCitySelect})  {

    const [searchQuery, setSearchQuery] = useState("");
    const [temperatureUnit, setTemperatureUnit] = useState('metric');
    const [currentLocation, setCurrentLocation] = useState(null);
    
    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                try {
                  const reverseGeocodeUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
                  const reverseGeocodeResponse = await fetch(reverseGeocodeUrl);
                  const reverseGeocodeData = await reverseGeocodeResponse.json();
                  const city = reverseGeocodeData.city;
                  console.log("City:", city);
                  onCitySelect(city,temperatureUnit);
                } catch (error) {
                  console.error("Error getting weather data:", error.message);
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
            onCitySelect(searchQuery, temperatureUnit);
            setSearchQuery("");
            setCurrentLocation(null);
        }
        };
        
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="flex flex-row justify-center my-6">
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
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
                className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase rounded-full"
                />
                <UilSearch
                    size={30}
                    onClick={handleSearchClick}
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                />
                <UilLocationPoint
                    size={30}
                    onClick={handleLocationClick}
                    className="text-white cursor-pointer transition ease-out hover:scale-125"
                />
            </div>
    
          <div className="flex flex-row w-1/4 items-center justify-center">
            <button
              name="metric"
              onClick={() => onToggleTemperatureUnit('metric')}
              className="text-xl text-white font-light transition ease-out hover:scale-125"
            >
              °C
            </button>
            <p className="text-xl text-white mx-1">|</p>
            <button
              name="imperial"
              onClick={() => onToggleTemperatureUnit('imperial')}
              className="text-xl text-white font-light transition ease-out hover:scale-125"
            >
              °F
            </button>
          </div>
        </div>
      );
}

export default Searchbar
