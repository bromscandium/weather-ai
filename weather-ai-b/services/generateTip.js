import OpenAI from "openai";

export const generateTip = async (weatherData) => {
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

    const messages = [
        {
            role: 'system',
            content: 'You are a weather assistant who gives a short tip based on the weather and city. Max 2 sentences. Depends on the weather tip could be funny or sad. Your advice is not always about the weather, you just can suggest a user to go somewhere in his city.'
        },
        {
            role: 'user',
            content: `Look, I am in city ${weatherData.locationName}. Weather data is:\n${JSON.stringify(weatherData, null, 2)}. What can you recommend?`
        }
    ];

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
    });

    return response.choices[0].message.content;
};
