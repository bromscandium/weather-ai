import {useReducer, useState, useRef, useEffect} from 'react';
import {appReducer, initialState} from './functions/appReducer.js';
import axios from 'axios';
import './styles/App.sass'

function App() {
    const inputRef = useRef(null);
    const [state, dispatch] = useReducer(appReducer, initialState);
    const [isFocused, setIsFocused] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    const handleSubmit = async (loc) => {
        console.log(`[handleSubmit] location="${loc}" | type=${typeof loc}`);
        if (!loc) {
            console.warn('⚠️ No location provided!');
            return;
        }

        dispatch({type: 'SET_LOADING', payload: true});

        try {
            const response = await axios.get('http://localhost:5225/api/weather-ai', {
                params: {location: loc},
            });

            dispatch({
                type: 'SET_RESULT',
                payload: {
                    tip: response.data.tip,
                    weather: response.data.weather
                }
            });
        } catch (error) {
            dispatch({type: 'SET_ERROR', payload: 'Something went wrong, please try again'});
        } finally {
            dispatch({type: 'SET_LOADING', payload: false})
        }
    };

    return (
        <div className={`App${darkMode ? ' dark' : ''}`}>
            {/*Dark Mode Button*/}
            <div className="toggleSwitch">
                <input
                    type="checkbox"
                    className="toggleMode"
                    id="toggleSwitch"
                    checked={darkMode}
                    onChange={() => setDarkMode(prev => !prev)}
                />
                <label className="toggle-switch-label" htmlFor="toggleSwitch">
                    <span className="toggle-switch-inner"/>
                    <span className="toggle-switch-switch"/>
                </label>
            </div>

            {/*Input Bar for providing city*/}
            <input
                ref={inputRef}
                type="text"
                className={`input ${(state.result && !state.error && !isFocused) ? 'result' : ''}`}
                placeholder="Type your city..."
                value={state.location}
                onChange={(e) => {
                    dispatch({type: 'SET_LOCATION', payload: e.target.value});
                    if (state.error) dispatch({type: 'SET_ERROR', payload: null});
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={async (e) => {
                    if (e.key === "Enter" && !state.loading) {
                        e.preventDefault();
                        inputRef.current?.blur();
                        await handleSubmit(state.location);
                    }
                }}
            />

            {/*All info about the city*/}
            <div className={`info ${state.result && !isFocused ? 'result' : ''}`}>
                {state.error && (
                    <div className="error-message">
                        <p>{state.error}</p>
                    </div>
                )}
                {state.weather && (
                    <div className="result">
                        <h1>{state.weather.locationName}</h1>
                        <p>{state.tip.tip}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
