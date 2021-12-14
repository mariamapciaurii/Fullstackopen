import React from 'react'
import CountryFullInfo from './CountryFullInfo'


const CountriesDisplayed = ({allCountriesData, searchTerm, showCountry}) => {
    
    const countries = allCountriesData
                        .filter(country => {
                            const regex = new RegExp(searchTerm, 'i')
                            if (searchTerm === '') {
                                return null
                            } else if (regex.test(country.name.common) === true) {
                                return country
                            } else {
                                return null
                            }
                        })
    
    if (countries.length === 0) {
        return null
    }
    else if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (countries.length === 1) {
        return (
            <CountryFullInfo country={countries[0]} />
        )
    }
    else {
        return countries.map(country => {
                                return(
                                    <div key={country.cca2}>
                                        {country.name.common}
                                        <button onClick={(event) => showCountry(event, country)}>
                                            show
                                        </button>
                                    </div>
                                )
                            })
    }
}

export default CountriesDisplayed