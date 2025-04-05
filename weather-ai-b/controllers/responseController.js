import {weatherService} from "../services/weatherService.js";
import {generateTip} from "../services/generateTip.js";
import fs from 'fs/promises';
import path from 'path';


export const responseController = async (req, res) => {
    const {location} = req.query;

    const weatherData = await weatherService(location);
    if (!weatherData) {
        return res.status(404).json({message: 'No weather data found'});
    }

    const tip = await generateTip(location, weatherData);
    if (!tip) {
        return res.status(404).json({message: 'No tip was created'});
    }

    const tipData = {
        tip,
        date: new Date().toISOString()
    };

    const weatherFilePath = path.join('data', 'weather.json');
    await fs.writeFile(weatherFilePath, JSON.stringify(weatherData, null, 2));

    const tipFilePath = path.join('data', 'tip.json');
    await fs.writeFile(tipFilePath, JSON.stringify(tipData, null, 2));

    return res.status(200).json({tip: tipData, weather: weatherData});
};
