import axios from "axios";

export const weatherService = async (providedLocation) => {
    const apiKey = process.env.WEATHER_API_KEY;

    try {
        const geoRes = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
            params: {
                q: providedLocation,
                limit: 1,
                appid: apiKey
            }
        });

        const geoData = geoRes.data;

        if (!geoData || geoData.length === 0) {
            return null;
        }

        const {lat, lon, name, country} = geoData[0];

        const weatherRes = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                lat,
                lon,
                appid: apiKey,
                units: 'metric'
            }
        });

        return {
            ...weatherRes.data,
            locationName: name,
            locationCountry: country
        };

    } catch (error) {
        return null;
    }
}
