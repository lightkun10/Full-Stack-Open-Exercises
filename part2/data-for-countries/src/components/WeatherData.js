import React from 'react';

const WeatherData = ({ weather }) => {
    return (
        <div>
            <div>
                <b>temperature: </b>{weather['temperature']} <span>Celcius</span>
            </div>

            <div>
                <img alt="weather" src={weather['weather_icons']}></img>
            </div>

            <div>
                <b>wind:</b>
                {weather['wind_speed']} mph direction {weather['wind_dir']}
            </div>
        </div>
    )
}

export default WeatherData;