import { DateTime } from "luxon";

const API_KEY ="558b6b9ac644331a1081da7d76b84230";
const BASE_URL ="https://api.openweathermap.org/data/2.5";


const getData = (infotype, searchParams) => {
    const url = new URL(BASE_URL + "/" + infotype);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY})
    return fetch(url).then((res) => res.json())
};

const formatCurrentData = (data) => { 
    try {
        const {
            main: { temp, feels_like, temp_min, temp_max, humidity },
            sys: { country, sunrise, sunset },
            coord: { lat, lon },
            wind: { speed },
            timezone,
            weather,
            name,
            dt,
        } = data;
    
    const { description, icon, main } = weather[0];
    
    return {
        description,
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        icon,
        speed,
        timezone,
        main
        };
        } catch (error) {
            console.error("Error formatting current data:", error.message);
            throw error; 
        }
    };
    


const getFormattedData = async (searchParams) => { 
    let data;
    data = await getData("weather", searchParams);
    const currentFormattedData = formatCurrentData(data);
    return { currentFormattedData };
  
};

const formatTLT = (
    secs,
    zone,
    format = "hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const CustomDate = (secs, timezone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => {
    const dt = DateTime.fromSeconds(secs).plus({ seconds: timezone });
    const formattedDate = dt.toFormat(format);
    return formattedDate;
};

const round = (number) => {
    return number !== undefined ? number.toFixed(0) : '';
};

const br = async(currentFormattedData) => { 
    console.log(currentFormattedData);
    const lat = currentFormattedData.lat;
    const lon = currentFormattedData.lon;
    console.log(lat,lon);
    const currentDate = new Date().toISOString();
    const brightSkyResponse = await fetch(`https://api.brightsky.dev/weather?lat=${lat}&lon=${lon}&date=${currentDate}`);
    const brightSkyData = await brightSkyResponse.json();
    console.log(brightSkyData);
    return(brightSkyData.weather);
};

export default getFormattedData;
export { formatTLT, CustomDate, round, getFormattedData,br}


