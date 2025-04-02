import axios from "axios";

export const checkLocation = async (location) => {
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: location,
                appid: apiKey,
                units: 'metric'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return null
    }
}
