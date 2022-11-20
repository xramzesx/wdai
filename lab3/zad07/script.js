//// CONFIG ////

const json_urls = [ 
    'http://localhost:3000/cities', 
    'https://api.npoint.io/281772ffa0f13476865d'
]
const tasks = []

const request = async () => {

    let result = new Response()
    let currentUrl = 0

    //// BACKUP CONNECTIONS ////

    do {
        try {
            result = await fetch(json_urls[currentUrl]) 
        } catch (e) {
            result = {}
        }
    } while (
        !result.ok && 
        currentUrl++ < json_urls.length
    )


    try {
        if ( !result.ok )
            throw new Error( `${result.status}: ${result.statusText}` )
            let cities = await result.json()

            if ( currentUrl > 0 )
                cities = cities.cities
    
        for ( const task of tasks )
            task ( cities ).catch( e => {
                console.warn(e)    
                errorMessage(e.toString())
            })

    } catch (e) {
        errorMessage(e.toString())
    }

}

request()

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

const createRecord = text => {
    const record = document.createElement('li')
    record.classList.add('record')
    record.innerText = text
    return record
}

const createList = (cities) => {
    const list = document.createElement('ol')
    for (const city of cities) {
        list.append(createRecord(city))
    }
    return list
}

//// TASK A ////

const resultA = document.querySelector("#task-a")

const taskA = async cities => {
    const preparedCities = cities.filter ( 
        ({province}) => province == "małopolskie"
    ).map( ({name}) => name )

    resultA.append(createList(preparedCities))
}

tasks.push(taskA)

//// TASK B ////

const resultB = document.querySelector("#task-b")

const taskB = async cities => {
    const preparedCities = cities.filter ( 
        ({name}) => /.*a.*a.*/g.test(name)
    ).map( ({name}) => name )

    resultB.append(createList(preparedCities))

}

tasks.push(taskB)

//// TASK C ////

const resultC = document.querySelector("#task-c")
const resultContainerC = document.createElement('div')
resultC.append(resultContainerC)

const taskC = async cities => {
    const preparedCities = cities.map ( 
        ({name, people, area }) => ({
            name, 
            density : people / area
        })
    ).sort( (a, b) => b.density - a.density)

    resultContainerC.innerText = preparedCities[4].name
}

tasks.push(taskC)

//// TASK D ////

const resultD = document.querySelector("#task-d")

const taskD = async cities => {
    const preparedCities = cities.map ( 
        ({name, people }) => `${name}${
            people > 100_000 ? ' city' : ''
        }`
    )

    resultD.append(createList(preparedCities))
}

tasks.push(taskD)

//// TASK E ////

const resultE = document.querySelector("#task-e")

const taskE = async cities => {
    const above80k = cities.filter( ({people}) => people > 80_000 ).length
    const below80k = cities.length - above80k

    const resultContainer = resultE.querySelector('h4')
    const aboveContainer = resultE.querySelector('.above h4')
    const belowContainer = resultE.querySelector('.below h4')

    resultContainer.innerText = above80k == below80k 
        ? "Miast jest tyle samo"
        : above80k > below80k
            ? "Więcej jest miast powyżej 80k"
            : "Więcej jest miast poniżej 80k"
    
    aboveContainer.innerText = above80k
    belowContainer.innerText = below80k
}

tasks.push(taskE)

//// TASK F ////

const resultF = document.querySelector("#task-f")
const resultContainerF = document.createElement('div')
resultF.append(resultContainerF)

const taskF = async cities => {
    const preparedCities = cities.filter(({township}) => /^p.*/g.test(township) )
    const accuracy = 100
    const sum = preparedCities.reduce( (totalArea, city) => totalArea + city.area * accuracy, 0 ) / accuracy
    const avg = sum / preparedCities.length
    resultContainerF.innerText = avg
}

tasks.push(taskF)


//// TASK G ////

const resultG = document.querySelector("#task-g")

const taskG = async cities => {
    const preparedCities = cities.filter( ({province}) => province === "pomorskie" )
    const citiesAbove5k = preparedCities.filter(({people}) => people > 5000 )
    
    const above5k = citiesAbove5k.length
    const below5k = preparedCities.length - above5k

    const resultContainer = resultG.querySelector('h4')
    const aboveContainer = resultG.querySelector('.above h4')
    const belowContainer = resultG.querySelector('.below h4')

    resultContainer.innerText = preparedCities.length == citiesAbove5k.length 
        ? "Wszystkie miasta są powyżej 5k"
        : "Nie wszystkie miasta są powyżej 5k"

    aboveContainer.innerText = above5k
    belowContainer.innerText = below5k
}

tasks.push(taskG)