//// DATA ////

const defaultKey = "defaultKey"
const defaults = new Set( [defaultKey, 'index', 'item']) 

const maxRows = 50
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

let activePage = 0
let activeKey = defaultKey
let activeStep = 0

let countries = []
let grouped = {}

/// SETS ///

const filters = {
    general : {
        set: new Set(),
        validate : (country) => {
            const pattern = 
                document
                    .querySelector("#general-f")
                    .value
                    .toLowerCase()
            
            if (!pattern) return true

            for (let key in country)
                if ( 
                    country[key]
                        .toString()
                        .toLowerCase()
                        .includes(pattern)
                ) return true
            return false
        }
    },
    name : {
        set: new Set(),
        validate : ({name}) => {
            const pattern = 
                document
                    .querySelector("#name-f")
                    .value
                    .toLowerCase()
            if (!pattern) return true
            
            return name.toLowerCase().includes(pattern)
        }
    },
    capital : {
        set: new Set(),
        validate : ({capital}) => {
            const pattern = 
                document
                    .querySelector("#capital-f")
                    .value
                    .toLowerCase()
            if (!pattern) return true
            return capital.toLowerCase().includes(pattern)
        }
    },
    population : {
        set: new Set(),
        validate : ({population}) => {
            const from = +document.querySelector('#population-from').value || 0
            const to = +document.querySelector('#population-to').value || Infinity

            document.querySelector('#population-to').setAttribute('min', from)

            return from <= population && population <= to}
    },
    area : {
        set: new Set(),
        validate : ({area}) => {
            const from = +document.querySelector('#area-from').value || 0
            const to = +document.querySelector('#area-to').value || Infinity

            document.querySelector('#area-to').setAttribute('min', from)
            
            return from <= area && area <= to
        }
    },
}

//// UTILS ////

const getMatchedPagesLen = () => {
    const matched = prepareFilters()
    return Math.ceil(countries.filter((country,index) => matched.has(index) ).length / maxRows )
}

const generateSet = () => new Set([...Array(countries.length).keys()])

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

const filterPage = page => {
    const from = page * maxRows
    const to = (page + 1) * maxRows - 1

    let counter = 0

    const result = new Set()
    const matched = prepareFilters()
    const matchedPagesLen = getMatchedPagesLen()

    if (matchedPagesLen <= activePage)
        activePage = Math.max(matchedPagesLen - 1, 0)

    for ( const [ subregion, { countries } ] of Object.entries(grouped).sort()) {
        for ( const country of countries ) {
            if ( !matched.has(country.index) )
                continue
            if ( from <= counter && counter <= to )
                result.add(country.index)
            counter++
        }
    }

    return result
}

const intersections = (setA, setB) => new Set(
    [...setA].filter(x => setB.has(x))
)

const prepareFilters = () => {
    let result = new Set([...Array(countries.length).keys()])

    for ( let key in filters ) {
        result = intersections(result, filters[key].set)        
    }

    return result
}

const combineFilters = () => {
    return intersections( prepareFilters(), filterPage(activePage))
}

const triggerFilter = name => {
    return () => {
        const {validate} = filters[name]
        filters[name].set = countries.reduce( (set, country, index) => {
            if ( validate( country ) )
                set.add(index)
            return set
        }, new Set())

        refreshTable()
    }
}

const refreshPagination = () => {
    const buttons = document.querySelectorAll('.pagination .index-item')
    
    const matched = prepareFilters()
    const matchedPagesLen = getMatchedPagesLen()

    buttons.forEach(button => {
        button.classList.add('hide')
        button.classList.remove('active')
    })

    for ( let i = 0; i < matchedPagesLen; i++)
        buttons[i].classList.remove('hide')
    
    if (buttons.length)
        buttons[activePage].classList.add('active')
    

}

const generatePagination = () => {
    const pagination = document.querySelector('.pagination')
    pagination.innerText = ""

    const matchedPagesLen = getMatchedPagesLen()

    const changePage = difference => () => {
        const matchedPagesLen = getMatchedPagesLen()
        if ( matchedPagesLen <= activePage + difference )
            activePage = Math.max( 
                Math.min(matchedPagesLen - 1, activePage), 
                0
            )
        else 
            activePage = Math.max( activePage + difference, 0)
        
        refreshTable()
    }

    const nextButton = document.createElement('button')
    nextButton.addEventListener('click', changePage(1))
    nextButton.innerText = ">"
    

    const prevButton = document.createElement('button')
    prevButton.addEventListener('click', changePage(-1))
    prevButton.innerText = "<"
    
    for (let i = 0; i < matchedPagesLen; i++ ) {
        const button = document.createElement('button')
        
        button.innerText = i + 1
        button.classList.add('index-item')

        if ( activePage === i )
            button.classList.add('active')
            
        button.addEventListener('click', () => {
            activePage = i

            for (const child of pagination.children)
                child.classList.remove('active')
            refreshTable()
        })

        pagination.append(button)
    }
    pagination.append(nextButton)
    pagination.prepend(prevButton)

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
      
    if ( !countries.reduce( (containsMatches, {index}) => containsMatches || matched.has(index), false) )
        container.classList.add('hide')
    else
        container.classList.remove('hide')

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

const refreshTable = () => {
    removeSubregions()
    const matched = combineFilters()
    generateSubregions(grouped, matched)
    refreshPagination()
}

const sortTable = (state, grouped) => {
    const { key, reverse } = state
    removeSubregions()

    for ( let subregion in grouped ) {
        grouped[subregion].countries.sort(sortBy( key, reverse ))
    }

    generateSubregions(grouped, combineFilters())
}

//// SETUP ////

const setup = async () => {
    try {
        const response = await fetch(json_url)
              countries = await response.json()

        if ( !response.ok )
            throw new Error( `${response.status}: ${response.statusText}` )
             
        //// DATA PREPARATION ////    
        
        countries = countries.map( country => {
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

        grouped = countries.reduce( (groups, country, index) => {            
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
                /// index w tablicy countries
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

        for (let key in filters)
            filters[key].set = generateSet()

        const matched = combineFilters()
        generateSubregions( grouped, matched )

        //// PAGINATION ////

        generatePagination()

    } catch (e) {
        errorMessage(e.toString())
    }
}

setup()

//// LISTENERS ////

const generalInput = document.querySelector('#general-f')
const nameInput = document.querySelector('#name-f')
const capitalInput = document.querySelector('#capital-f')

const populationFromInput = document.querySelector('#population-from')
const populationToInput = document.querySelector('#population-to')

const areaFromInput = document.querySelector('#area-from')
const areaToInput = document.querySelector('#area-to')

generalInput.addEventListener('input', triggerFilter('general'))
nameInput.addEventListener('input', triggerFilter('name'))
capitalInput.addEventListener('input', triggerFilter('capital'))

populationFromInput.addEventListener('input', triggerFilter('population'))
populationToInput.addEventListener('input', triggerFilter('population'))

areaFromInput.addEventListener('input', triggerFilter('area'))
areaToInput.addEventListener('input', triggerFilter('area'))