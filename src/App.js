import './App.css';
import Temperature from './components/Temperature';
import Details from './components/Details';
import getFormattedData from './makeitwork/weather';
import Searchbar from './components/Searchbar';
import { useState, useEffect } from 'react';
import Daily from './components/Daily';

function App() {
  const [weatherData, setWeatherData] = useState(null);

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



  useEffect(() => {
    if (weatherData) {
        fetchWeather(weatherData.name);
    } else {

        fetchWeather('Berlin');
    }
}, []);
  return (
    <div
      className="w-full h-screen bg-center flex flex-col items-center justify-center  lg:px-0"
    >
   <div className={` w-full h-screen bg-gradient-to-br px-2 from-cyan-500  to-blue-700 `}>
      <Searchbar 
      onCitySelect={handleCitySelection} />
      {weatherData && (
                <>
                    <Temperature currentFormattedData={weatherData} />
                    <Details h="hourly forecast" currentFormattedData={weatherData} />
                    <Daily h="hourly forecast" currentFormattedData={weatherData} />
                    
                </>
      )}
   </div>
   </div>
  );
}

export default App;

