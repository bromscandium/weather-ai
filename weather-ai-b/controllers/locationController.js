import {checkLocation} from "../services/weatherService.js";
import {generateTip} from "../services/gptService.js";
import fs from 'fs/promises';
import path from 'path';

export const handleLocation = async (req, res) => {
    const {location} = req.query;

    const weatherData = await checkLocation(location);

    if (!weatherData) {
        return res.status(404).json({message: 'Location not found'});
    }

    const weatherFilePath = path.join('data/history', 'weather.json');
    await fs.writeFile(weatherFilePath, JSON.stringify(weatherData, null, 2));

    const tip = await generateTip(location, weatherData);

    const tipData = {
        location,
        tip,
        date: new Date().toISOString()
    };
    const tipFilePath = path.join('data/history', 'tips.json');

    let tips = [];
    try {
        const existing = await fs.readFile(tipFilePath, 'utf-8');
        tips = JSON.parse(existing);
        if (!Array.isArray(tips)) tips = []; // 👈 ще додаткова перевірка
    } catch {
        tips = [];
    }

    tips.push(tipData);

    await fs.writeFile(tipFilePath, JSON.stringify(tips, null, 2));
    return res.status(200).json({tip});
};
