import React, { useState } from 'react';
import axios from 'axios';

function WeatherComponent() {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeatherData = async () => {
        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            params: { q: location },
            headers: {
                'X-RapidAPI-Key': '28622ab15emsh37de7c04fb42d0bp134858jsnbee14dcb0847',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            },
        };

        try {
            const response = await axios.request(options);
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={handleLocationChange}
            />
            <button onClick={fetchWeatherData}>Get Current Weather</button>

            {weatherData && (
                <div>
                    <h2>Current Weather in {location}</h2>
                    <p>Temperature: {weatherData.current.temp_f}°F</p>
                    <p>Condition: {weatherData.current.condition.text}</p>
                    <p>Feels like: {weatherData.current.feelslike_f}°F</p>
                </div>
            )}
        </div>
    );
}

export default WeatherComponent;
