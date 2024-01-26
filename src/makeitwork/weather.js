import { DateTime } from 'luxon';
import config from "./config";
const API_KEY = config.API_KEY;
const BASE_URL ="http://api.weatherapi.com/v1";


const getData = (searchParams) => {
    const {q} = searchParams;
    const url = new URL(`${BASE_URL}/forecast.json`);
    const days = 14;
    url.search = new URLSearchParams({ key: API_KEY, q, days });
    return fetch(url).then((res) => res.json());
};

const getFormattedData = async (searchParams) => { 
    let data;
    try {
        data = await getData(searchParams);
        console.log(data);
        return {data};
    } catch (error) {
        console.error("Error fetching or formatting data:", error.message);
        throw error;
    }
};

const CustomDate = (localtime_epoch, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => {
    const localDt = DateTime.fromSeconds(localtime_epoch);
    const formattedDate = localDt.toFormat(format);
    return formattedDate;
};

const round = (number) => {
    return number !== undefined ? number.toFixed(0) : '';
};


export default getFormattedData;
export { round, getFormattedData,CustomDate}


