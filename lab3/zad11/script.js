//// DATA ////

const defaultKey = "defaultKey"
const defaults = new Set( [defaultKey, 'index', 'item']) 

const json_url = 'https://restcountries.com/v3.1/all'
const tableHeaders = [
    "name",
    "capital",
    "population",
    "area"
]

const steps = {
    default: 0,
    ascending: 1,
    descending: 2
}

//// CONTROLS ////

let activeKey = defaultKey
let activeStep = 0
let countries = []

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

const sortBy = (field, reverse) => {
    reverse = !reverse ? 1 : -1
    
    const key = x => x[field]

    return (a, b) => {
        a = key(a) 
        b = key(b) 
        return reverse * ( (a > b) - (b > a) )
    }
} 

const numberWithSpaces = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")

//// FILTERS ////

const intersections = (setA, setB) => new Set(
    [...setA].filter(setB.has(x))
)

const prepareFilter = () => {
    const result = new Set([...Array(countries.length).keys()])

    return result
}

//// DOM ELEMENTS ////

const clearHeaders = () => {
    const headers = document.querySelectorAll('.container table thead th')

    for ( const header of headers ) {
        header.classList.remove('sort-asc')
        header.classList.remove('sort-desc')
    }
}

const createSubregionHeader = (
    name, 
    totalPopulation = 0, 
    totalArea = 0,
    subregionContent
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

    const toggleExpanse = hide => {
        if ( hide ) {
            container.classList.add('hide')
        } else {
            container.classList.remove('hide')
        }    
    }

    toggleExpanse(subregionContent.hide)

    container.addEventListener('click', event => {
        subregionContent.hide = !subregionContent.hide
        toggleExpanse(subregionContent.hide)

    })

    return container
}

const createCountryItem = (country, matched) => {
    const container = document.createElement('tr') 
    container.classList.add('subregion__item')

    for ( const key of tableHeaders ) {
        const cell = document.createElement('td')
        
        if (typeof country[key] == 'number') {
            cell.innerText = numberWithSpaces(country[key])
            cell.classList.add('number') 
        } else {
            cell.innerText = country[key]
        }
        container.append(cell)
    }

    country.item = container

    if ( !matched.has(country.index) )
        container.classList.add('hide')
    else 
        container.classList.remove('hide')

    return container
}

const createSubregionContainer = (name, subregion, matched = new Set()) => {
    const {countries} = subregion

    const container = document.createElement('tbody')
    container.classList.add('subregion')

    const header = createSubregionHeader(
        name,
        countries.reduce( (subsum, {population, index} ) => 
            matched.has(index)
            ? subsum + population
            : subsum, 0),
        countries.reduce( (subsum, {area, index} ) => 
            matched.has(index)
            ? subsum + area
            : subsum, 0),
        subregion
    )

    container.append(header)

    for ( const country of countries ) {
        container.append( createCountryItem(country, matched) )
    }

    return container
}


const removeSubregions = () => {
    const subregions = document.querySelectorAll('.subregion')

    for (const subregion of subregions)
        subregion.remove()
}

const generateSubregions = (grouped, matched) => {
    const table = document.querySelector('.container table')

    for ( const [ subregion, subregionContent ] of Object.entries(grouped).sort() ) {
        table.append( createSubregionContainer( subregion, subregionContent, matched) )
    }
}

const sortTable = (state, grouped) => {
    const { key, reverse } = state
    removeSubregions()

    for ( let subregion in grouped ) {
        grouped[subregion].countries.sort(sortBy( key, reverse ))
    }

    generateSubregions(grouped, prepareFilter())
}

//// SETUP ////

const setup = async () => {
    try {
        const response = await fetch(json_url)
              countries = await response.json()

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
                groups[subregion] = {
                    hide: false,
                    countries: []
                }
            }
            
            groups[subregion].countries.push({
                name,
                capital,
                population,
                area,
                /// index w tablicy preparedCountries
                index,
                /// do htmlowego domu
                item: null,
                /// do domyślnego stanu posortowania
                defaultKey : groups[subregion].countries.length,
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
                    activeStep = 0
                }
                
                activeStep = (activeStep + 1) % states.length
                activeKey = states[activeStep].key
                
                sortTable( states[activeStep], grouped)
                
                clearHeaders()
                
                switch (activeStep) {
                    case steps.ascending:
                        column.classList.add('sort-asc')
                        break;
                    case steps.descending:
                        column.classList.add('sort-desc')
                        break
                    default:
                        break;
                }
            })
        }

        /// DEFAULT GENERATION ////

        generateSubregions( grouped, prepareFilter() )
    } catch (e) {
        errorMessage(e.toString())
    }
}

setup()

