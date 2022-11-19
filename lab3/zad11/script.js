//// DATA ////

const json_url = 'https://restcountries.com/v3.1/all'

const setup = async () => {
    // try {
        const response = await fetch(json_url)
        const countries = await response.json()
        // console.log(result)
        if ( !response.ok )
            throw new Error( `${response.status}: ${response.statusText}` )
        
        const prepared = countries.map( ({name, capital, population, subregion }) => ({name, capital, population, subregion}) )
        
        const grouped = countries.reduce( (groups, country) => {
            const subregion = country.subregion || country.continents[0]
            
            if ( groups[subregion] === undefined ) {
                groups[subregion] = []
            }

            const { 
                name : { official },
                capital, 
                population,
                area
            } = country

            groups[subregion].push({
                name : official,
                capital : capital || ["N/A"],
                population,
                area
            })
            return groups

        }, {})

        console.log(grouped)

        console.log(countries.filter( country => {
            if (country.capital)
                return country.capital.length > 1
            return false
        }))
        // console.log(result.filter(country => country))
    // } catch (e) {
    //     errorMessage(e.toString())
    // }
}

setup()


//// UTILS ////

const errorMessage = message => {
    const errorBox = document.querySelector('.errorBox')
    if ( message.length ) {
        errorBox.innerText = message
        errorBox.classList.add('show')
    } else {
        errorBox.classList.remove('show')
    }
}