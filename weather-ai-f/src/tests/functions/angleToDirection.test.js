import { describe, it, expect } from 'vitest';
import { angleToDirection } from '../../functions/angleToDirection.js';

describe('angleToDirection', () => {
    it('returns North direction', () => {
        expect(angleToDirection('360')).toBe('North');
    });

    it('returns West direction', () => {
        expect(angleToDirection('-100')).toBe('West');
    });
});
