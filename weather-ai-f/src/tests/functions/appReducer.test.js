import {describe, it, expect} from 'vitest';
import {appReducer, initialState} from "../../functions/appReducer.js";

describe('appReducer', () => {
    it('returns Kyiv as location', () => {
        const testDispatch = {type: 'SET_LOCATION', payload: 'Kyiv'}
        const testState = appReducer(initialState, testDispatch);

        expect(testState.location).toBe("Kyiv");
    });

    it('returns full result', () => {
        const mockWeather = {
            main: {temp: 10, feels_like: 8},
            weather: [{main: 'Rain'}],
            wind: {speed: 3, deg: 90},
        };

        const mockPayload = {
            tip: 'Bring an umbrella!',
            weather: mockWeather,
            iconPath: '/weatherIcons/Rain.png',
        };

        const testDispatch = {
            type: 'SET_RESULT',
            payload: mockPayload,
        };

        const testState = appReducer(initialState, testDispatch);

        expect(testState.location).toBe('');
        expect(testState.tip).toBe('Bring an umbrella!');
        expect(testState.weather).toEqual(mockWeather);
        expect(testState.iconPath).toBe('/weatherIcons/Rain.png');
        expect(testState.loading).toBe(false);
        expect(testState.result).toBe(true);
        expect(testState.error).toBe(null);
    });
});
