import { describe, it, expect } from 'vitest';
import { weatherToIcon } from '../../functions/weatherToIcon.js';

describe('weatherToIcon', () => {
    it('returns icon for Clear during the day', () => {
        expect(weatherToIcon('Clear', 1743860000, 1743833694, 1743879788, 0)).toBe('/weatherIcons/ClearDay.png');
    });

    it('returns icon for Clear during the night', () => {
        expect(weatherToIcon('Clear', 1743880000, 1743833694, 1743879788, 0)).toBe('/weatherIcons/ClearNight.png');
    });

    it('returns icon for Clouds', () => {
        expect(weatherToIcon('Clouds')).toBe('/weatherIcons/Cloudy.png');
    });

    it('returns question mark for unknown weather', () => {
        expect(weatherToIcon('Unknown')).toBe('/weatherIcons/Question.png');
    });
});
