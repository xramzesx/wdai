const firstBox = document.querySelector('.box.first')
const secondBox = document.querySelector('.box.second')
const thirdBox = document.querySelector('.box.third')

const propagationButton = document.querySelector('button.propagation')
const resetButton = document.querySelector('button.reset')
const changeButton = document.querySelector('button.change-order')

let isActivePropagation = false
let counter = 0
let isReverseOrder = false


const logsContainer = document.querySelector('.logs-container')
const counterBox = document.querySelector('.box.counter')


const boxes = [
    { selector : ".box.first", color : 'blue', points: 1, max: Infinity, handleClick: null, element: null },
    { selector : ".box.second", color : 'red', points: 2, max: 30, handleClick: null, element: null },
    { selector : ".box.third", color : 'yellow', points: 5, max: 50,  handleClick: null, element: null }
]

for ( const box of boxes ) {
    const { selector, color, points, max } = box
    box.element = document.querySelector( selector )
    box.handleClick = onClick( color, points, max)
}


/// LOGS ///

const updateCounter = value => {
    counterBox.innerText = value
    counter = value
}

const createLog = (logContent, className ) => {
    const log = document.createElement('div')
    log.classList.add('log-item')
    log.classList.add(className)
    log.innerText = logContent
    return log
}

const appendLog = (logContent, className) => {
    logsContainer.prepend(
        createLog(logContent, className)
    )
}

//// UNIVERSAL FUNCTIONS ////

const setupListeners = () => {
    for ( const { element, handleClick } of boxes ) {
        element.addEventListener('click', handleClick, isReverseOrder );
    }
}

const removeListeners = () => {
    for ( const { element, handleClick } of boxes ) {
        element.removeEventListener('click', handleClick, isReverseOrder)
    }
}

function onClick ( color, value, max ) {
    const that = function ( event ) {
        if (isActivePropagation) {
            event.preventDefault()
        } else {
            event.stopPropagation()
        }
    
        appendLog(`nacisnąłeś ${color} o wartości ${value}`, color)
    
        console.log( color, value, max )
    
        if ( max <= counter + value ) {
            this.removeEventListener('click', that )
            event.stopPropagation()
        }

        if ( counter <= max )
            updateCounter( counter + value )
        
    }
    
    return that
}

const reset = () => {
    updateCounter(0)
    logsContainer.innerHTML = ""
    removeListeners()
    isReverseOrder = false
    setupListeners()
    setPropagationMode(false)
    appendLog(`reset game`)
}

const setPropagationMode = mode => {
    // isActivePropagation = mode ?? isActivePropagation
    let content = ""
    if ( isActivePropagation ) {
        content = 'Start'
        appendLog(`Propagation stopped`)
    } else {
        content = 'Stop'
        appendLog(`Propagation started`)
    }

    propagationButton.innerText = `${content} propagation`

    // isActivePropagation = !isActivePropagation;
    isActivePropagation = mode ?? !isActivePropagation;
}

/// EVENT LISTENERS ///


/// BUTTONS ///

resetButton.addEventListener('click', () => {
    counter = 0;
    reset()
})

propagationButton.addEventListener('click', () => {
    setPropagationMode(!isActivePropagation)
})

changeButton.addEventListener('click', () => {
    removeListeners()
    isReverseOrder = !isReverseOrder
    setupListeners()

    appendLog(`changed bubble order`)
})

/// BOXES ///

// firstBox.addEventListener('click', onClick('niebieski', 1, Infinity), isReverseOrder)
// secondBox.addEventListener('click', onClick('czerwony', 2, 30), isReverseOrder)
// thirdBox.addEventListener('click', onClick('żółty', 5, 50), isReverseOrder)
setupListeners()