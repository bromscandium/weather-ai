export const weatherIcon = {
    Clear: '/weatherIcons/ClearDay.png',
    ClearNight: '/weatherIcons/ClearNight.png',
    Clouds: '/weatherIcons/Cloudy.png',
    Snow: '/weatherIcons/Snow.png',
    Rain: '/weatherIcons/Rain.png',
    Drizzle: '/weatherIcons/Drizzle.png',
    Thunderstorm: '/weatherIcons/Thunderstorm.png',
    Tornado: '/weatherIcons/Tornado.png',
    Mist: '/weatherIcons/Mist.png',
    Smoke: '/weatherIcons/Haze.png',
    Haze: '/weatherIcons/Haze.png',
    Dust: '/weatherIcons/Haze.png',
    Fog: '/weatherIcons/Mist.png',
    Sand: '/weatherIcons/Haze.png',
    Ash: '/weatherIcons/Haze.png',
    Squall: '/weatherIcons/Squall.png',
    Default: '/weatherIcons/Question.png',
};

export function weatherToIcon(weatherName, dt, sunrise, sunset, timezone) {
    const localTime = dt + timezone;
    if (weatherName === 'Clear') {
        if (localTime >= sunrise && localTime <= sunset) {
            return weatherIcon.Clear;
        } else {
            return weatherIcon.ClearNight;
        }
    }


    return weatherIcon[weatherName] || weatherIcon.Default;
}
