import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesDisplayed from './components/CountriesDisplayed'

const App = () => {

    const [allCountriesData, setAllCountriesData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    // Effect hook to pull all countries data from the REST api
    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log('promise fulfilled')
                setAllCountriesData(response.data)
            })
    },[])

    const showCountry = (event, country) => {
        setSearchTerm(country.name.common)
    }
    
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
      <div>
          find countries <input type={'text'} value={searchTerm} onChange={handleSearchTermChange}/>
          <CountriesDisplayed allCountriesData={allCountriesData} searchTerm={searchTerm} showCountry={showCountry}/>
      </div>
    )
}

export default App;
