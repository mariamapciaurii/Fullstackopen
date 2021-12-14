import React, {useState} from 'react'
import axios from 'axios'

const CountryFullInfo = ({country}) => {
    
    const [currentTemp, setCurrentTemp] = useState('')
    const [currentWindSpeed, setCurrentWindSpeed] = useState('')
    const [currentWindDir, setCurrentWindDir] = useState('')
    const apiURL = 'http://api.weatherapi.com/v1/current.json?key=' 
                    + process.env.REACT_APP_WEATHER_API_KEY + '&q=' 
                    + country.capital + '&aqi=no'
    let languages = []
    
    for (const language in country.languages) {
        languages = languages.concat(country.languages[language])
    }

    axios
        .get(apiURL)
        .then(response => {
            setCurrentTemp(response.data.current.temp_c)
            setCurrentWindSpeed(response.data.current.wind_mph)
            setCurrentWindDir(response.data.current.wind_dir)
        })

    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>Spoken languages</h3>
            <ul>
                {languages.map(language => {
                    return(<li key={language}>{language}</li>)
                })}
            </ul>
            <img src={country.flags.png} alt="flag of the country" ></img>
            <h3>Weather in {country.capital}</h3>
            <div><b>temperature: </b>{currentTemp} Celsius</div>
            <div><b>wind: </b>{currentWindSpeed} mph direction {currentWindDir}</div>
        </div>
    )
}

export default CountryFullInfo