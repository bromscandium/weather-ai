import OpenAI from "openai";

export const generateTip = async (location, weatherData) => {
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

    const messages = [
        {
            role: 'system',
            content: 'You are a weather assistant who gives a short tip based on the weather and city. Max 2 sentences.'
        },
        {
            role: 'user',
            content: `Look, I am in city ${location}. Weather data is:\n${JSON.stringify(weatherData, null, 2)}. What can you recommend?`
        }
    ];

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
    });

    return response.choices[0].message.content;
};
