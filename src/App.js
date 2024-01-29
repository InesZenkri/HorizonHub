import './App.css';
import bg from './icons/bg.jpg';
import Temperature from './components/Temperature';
import Details from './components/Details';
import getFormattedData from './makeitwork/weather';
import Searchbar from './components/Searchbar';
import { useState, useEffect } from 'react';
import Daily from './components/Daily';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
  const fetchWeather = async (city) => {
    try {
      const data = await getFormattedData({ q: city});
      console.log("data: ",data);
      setWeatherData(data.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleCitySelection = (selectedCity) => {
    fetchWeather(selectedCity);
};;

const handleToggleTemperatureUnit = (unit) => {
  setTemperatureUnit(unit);
};

  useEffect(() => {
    if (weatherData) {
        fetchWeather(weatherData.name);
    } else {

        fetchWeather('Berlin');
    }
}, []);
  return (
   <div className={` w-full h-screen bg-cover overflow-y-auto`}style={{ backgroundImage: `url(${bg})` }}>
      <Searchbar 
      onCitySelect={handleCitySelection}
      onToggleTemperatureUnit={handleToggleTemperatureUnit} />
      {weatherData && (
                <>
                    <Temperature 
                      currentFormattedData={weatherData} 
                      temperatureUnit={temperatureUnit}
                    />
                    <Details
                       h="hourly forecast" 
                       currentFormattedData={weatherData} 
                       temperatureUnit={temperatureUnit}
                       />
                    <Daily 
                      h="hourly forecast" 
                      currentFormattedData={weatherData} 
                      temperatureUnit={temperatureUnit}
                      />
                    
                </>
      )}
   </div>
 
  );
}

export default App;

