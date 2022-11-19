//// DATA ////

const paths = {
    check : "icons/check.svg",
    cross : "icons/cross.svg",
    eyeOpen: "icons/eye-open.svg",
    eyeClosed: "icons/eye-closed.svg"
}

const requirements = [
    { element : null, text: "at least 8 characters", test: password => password.length >= 8 },
    { element : null, text: "at least one special character", test: password => /[ \!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\]\^\_\`\{\|\}\~]/.test(password) },
    { element : null, text: "at least one capital letter", test: password => /\p{Lu}+/u.test(password) },
    { element : null, text: "at least one digit", test: password => /.*[0-9]+.*/.test(password) },
]

//// UTILS ////

const getIcon = ({element}) => element.querySelector('img')

const setImage = (requirement, isValid) => {
    const icon = getIcon(requirement)

    if (isValid) {
        icon.classList.remove('invalid')
        icon.classList.add('valid')
        icon.src = paths.check
    } else {
        icon.classList.remove('valid')
        icon.classList.add('invalid')
        icon.src = paths.cross
    }

}

const createRequirement = requirement => {
    requirement.element = document.createElement('div')
    requirement.element.classList.add('requirement')

    //// ICON ////

    const iconContainer = document.createElement('div')
    iconContainer.classList.add('icon')

    const icon = document.createElement('img')

    //// INFO ////

    const info = document.createElement('div')
    info.classList.add('info')
    info.innerText = requirement.text

    //// SETUP ////

    requirement.element.append(iconContainer)
    requirement.element.append(info)

    iconContainer.append(icon)
    document
        .querySelector('.requirements-status')
        .append(requirement.element)

    setImage(requirement, false)
}

const errorMessage = message => {
    const errorBox = document.querySelector('.errorBox')
    if ( message.length ) {
        errorBox.innerText = message
        errorBox.classList.add('show')
    } else {
        errorBox.classList.remove('show')
    }
}

//// SETUP ////

const setup = () => {
    for (const requirement of requirements) {
        createRequirement(requirement)
    }
}

setup()

//// VALIDATION ////

const checkRequirement = (password, requirement) => {
    const isValid = requirement.test(password)
    setImage(requirement, isValid)
    return isValid
}

const validate = password => {
    let result = true
    for ( const requirement of requirements ) {
        result &= checkRequirement(password, requirement)
    }
    return result
}

//// LISTENERS ////

const form = document.querySelector('.container form')
const passwordInput = document.querySelector('#password')
const passwordRepeatInput = document.querySelector("#repeat-password")

const finishOverlay = document.querySelector('.finish')
const resetButton = document.querySelector('.reset')

const onEnter = event => {
    if (event.key == 'Enter') {
        // event.preventDefault()
        form.querySelector('input[type="submit"]').click()
    }
}

passwordInput.addEventListener('keypress', onEnter)
passwordRepeatInput.addEventListener('keypress', onEnter)

passwordInput.addEventListener('input', event => {
    //// REQUIREMENTS CHECK ////
    if ( !validate(event.target.value) ) {
        return
    }
})

form.addEventListener('submit', event => {
    event.preventDefault()
    
    errorMessage("")
    
    if ( !validate( passwordInput.value )) {
        errorMessage("Password doesn't meet the requirements")
        return false
    }

    if ( passwordInput.value != passwordRepeatInput.value ){
        errorMessage("Passwords are different")
        return false
    }

    finishOverlay.classList.add('show')
    resetButton.focus()
})

resetButton.addEventListener('click', () => {
    finishOverlay.classList.remove('show')
    passwordInput.value = ""
    passwordRepeatInput.value = ""
    validate("")
})

function prepareInput ( input ) {
    const element = input.parentElement
    const visibilityButton = element.querySelector('button')
    const icon = visibilityButton.querySelector('img')

    let visible = false

    visibilityButton.addEventListener('click', event => {
        if ( visible ) {
            input.type = 'text'
            icon.src = paths.eyeOpen
            
        } else {
            input.type = 'password'
            icon.src = paths.eyeClosed
        }
        visible = !visible
    })
} 


prepareInput(passwordInput)
prepareInput(passwordRepeatInput)

class Input {
    constructor( selector ) {

        //// DOM ELEMENTS ////

        this.input = document.querySelector(selector)
        this.element = this.input.parentElement
        this.visibilityButton = this.element.querySelector('button')
        this.icon = this.visibilityButton.querySelector('img')

        //// PRIVATE POOLS ////

        this._visible = false

        //// LISTENERS ////

        this.visibilityButton.addEventListener('click', event => {
            event.preventDefault()
            this.visible = !this.visible
        })
    }

    set visible ( visible ) {
        if ( visible ) {
            this.input.type = 'text'
            this.icon.src = paths.eyeOpen
            
        } else {
            this.input.type = 'password'
            this.icon.src = paths.eyeClosed
        }
        this._visible = visible
    }

    get visible () {
        return this._visible
    }
}