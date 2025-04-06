import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react';
import {describe, it, afterEach} from 'vitest';
import App from '../App.jsx';

describe('App', () => {
    afterEach(() => {
        cleanup();
    });

    it('updates input value when user types', () => {
        render(<App/>);

        const input = screen.getByPlaceholderText(/type your city/i);

        fireEvent.change(input, {target: {value: 'Kyiv'}});

        expect(input.value).toBe('Kyiv');
    });

    it('calls handleSubmit on Enter Key', async () => {
        render(<App/>);

        const input = screen.getByPlaceholderText(/type your city/i);

        fireEvent.change(input, {target: {value: 'Kyiv'}});
        fireEvent.keyDown(input, {key: 'Enter', code: 'Enter'});

        await waitFor(() => {
            expect(screen.getByPlaceholderText(/loading data/i)).toBeInTheDocument();
        });
    })

    it('change App to Dark Mode', () => {
        render(<App />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument()

        expect(document.querySelector('.App')).not.toHaveClass('dark');

        fireEvent.click(checkbox);

        expect(document.querySelector('.App')).toHaveClass('dark');
    })
});