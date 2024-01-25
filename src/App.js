import './App.css';
import Temperature from './components/Temperature';
import Details from './components/Details';
import getFormattedData from './makeitwork/weather';
import Searchbar from './components/Searchbar';
import { useState, useEffect } from 'react';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('metric');

  const fetchWeather = async (city, unit) => {
    try {
      const data = await getFormattedData({ q: city, units: unit });
      setWeatherData(data.currentFormattedData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleCitySelection = (selectedCity) => {
    fetchWeather(selectedCity, temperatureUnit);
};;


  const toggleTemperatureUnit = (unit) => {
    setTemperatureUnit(unit);
  };
  useEffect(() => {
    if (weatherData) {
        fetchWeather(weatherData.name, temperatureUnit);
    } else {

        fetchWeather('Berlin', temperatureUnit);
    }
}, [temperatureUnit]);
  return (
   <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  from-cyan-500  to-blue-700 `}>
      <Searchbar 
      onToggleTemperatureUnit={toggleTemperatureUnit}
      onCitySelect={handleCitySelection} />
      {weatherData && (
                <>
                    <Temperature currentFormattedData={weatherData} />
                    <Details h="hourly forecast" currentFormattedData={weatherData} />
                </>
      )}
   </div>
  );
}

export default App;

