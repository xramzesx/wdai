//// DATA ////

const defaultKey = "defaultKey"
const defaults = new Set( [defaultKey, 'index']) 

const json_url = 'https://restcountries.com/v3.1/all'
const tableHeaders = [
    "name",
    "capital",
    "population",
    "area"
]

//// CONTROLS ////

let activeKey = defaultKey
let activeStep = 0

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

const filterResults = (countries, filters) => {

}

const sortBy = (field, reverse) => {
    reverse = !reverse ? 1 : -1
    
    const key = x => x[field]

    return (a, b) => 
        a = key(a), 
        b = key(b), 
        reverse * ( (a > b) - (b > a) )
} 

const numberWithSpaces = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

//// DOM ELEMENTS ////

const createSubregionHeader = (
    name, 
    totalPopulation = 0, 
    totalArea = 0
) => {
    const container = document.createElement('tr')
    const subregion = document.createElement('td')
    const population = document.createElement('td')
    const area = document.createElement('td')
    
    container.classList.add('subregion__header')
    container.append(subregion)
    container.append(population)
    container.append(area)
    
    subregion.setAttribute('colspan', 2 )
    subregion.classList.add('header-cell')
    subregion.innerText = name

    population.innerText = numberWithSpaces( totalPopulation )
    population.classList.add('number')

    area.innerText = numberWithSpaces( totalArea )
    area.classList.add('number')

    container.addEventListener('click', event => {
        container.classList.toggle('hide')
    })

    return container
}

const createCountryItem = country => {
    const container = document.createElement('tr') 
    container.classList.add('subregion__item')

    for ( let key in country ) {
        if ( defaults.has( key ) ) continue
        const cell = document.createElement('td')
        
        if (typeof country[key] == 'number') {
            cell.innerText = numberWithSpaces(country[key])
            cell.classList.add('number') 
        } else {
            cell.innerText = country[key]
        }
        container.append(cell)
    }

    return container
}

const createSubregionContainer = (name, countries) => {
    const container = document.createElement('tbody')
    container.classList.add('subregion')

    const header = createSubregionHeader(
        name,
        countries.reduce( (subsum, {population} ) => subsum + population, 0),
        countries.reduce( (subsum, {area} ) => subsum + area, 0)
    )
    container.append(header)

    for ( const country of countries ) {
        container.append( createCountryItem(country) )
    }

    return container
}


const removeSubregions = () => {
    const subregions = document.querySelectorAll('.subregion')

    for (const subregion of subregions)
        subregion.remove()
}

const generateSubregions = grouped => {
    const table = document.querySelector('.container table')

    for ( const [ subregion, countries ] of Object.entries(grouped) ) {
        table.append( createSubregionContainer(subregion, countries) )
    }
}

const sortTable = state => {
    const { key, reverse } = state
    removeSubregions()
}



//// SETUP ////

const setup = async () => {
    try {
        const response = await fetch(json_url)
        const countries = await response.json()

        if ( !response.ok )
            throw new Error( `${response.status}: ${response.statusText}` )
             
        //// DATA PREPARATION ////    
        
        const preparedCountries = countries.map( country => {
            const { 
                name : { common },
                capital, 
                population,
                area
            } = country

            const subregion = country.subregion || country.continents[0]

            return {
                name : common,
                capital : capital ? capital.sort().join(', ') : "N/A",
                population,
                area,
                subregion
            }
        } )

        const grouped = preparedCountries.reduce( (groups, country, index) => {            
            const {
                name, capital, population, area, subregion
            } = country
            
            if ( groups[subregion] === undefined ) {
                groups[subregion] = []
            }
            
            groups[subregion].push({
                name,
                capital,
                population,
                area,
                index,
                item: null,
                defaultKey : groups[subregion].length,
            })

            return groups
        }, {})



        for ( const key of tableHeaders ) {
            const column = document.getElementById(key)
            const states = [
                { key: defaultKey, reverse : false},
                { key: key, reverse : false},
                { key: key, reverse : true},
            ]
            column.addEventListener('click', () => {
                if ( activeKey !== key ) {
                    // clearHeaders()
                    activeStep = 0
                }

                activeStep = (activeStep + 1) % states.length
                activeKey = states[activeStep].key

                sortTable( states[activeStep] )

                console.log(key)
                console.log(states[activeStep])
            })
        }

        generateSubregions( grouped )
    } catch (e) {
        errorMessage(e.toString())
    }
}

setup()

