const formContainer = document.querySelector('form')

const nameInput = document.getElementById("name")
const mobileInput = document.getElementById("mobile")

const errorContainer = document.querySelector('.errorContainer')
const recordsContainer = document.querySelector('.recordsContainer')

const mobileIndex = []

//// REGEXES ////

const additionalSpaces = /\s{2,}/g

//// VALIDATION ////

const validateMobile = mobile => {
    const preparedMobile = mobile.replace(/\s/g, "")

    return /[0-9]{9}/g.test(preparedMobile) && preparedMobile.length == 9 ||
        /\+[0-9]{12}/g.test(preparedMobile) && preparedMobile.length == 13
} 

const validateName = name => /^[\p{L}-]+\s+[\p{L}-]+$/gu.test(name.trim())

//// DOM SUPPORT ////

const eraseSpaces = str => str.replace( additionalSpaces, " " ).trim()

const createRecord = mobileItem => {
    const { name, mobile } = mobileItem

    const record = document.createElement('div')
    record.classList.add('record')

    //// CONTENT ////

    const content = document.createElement('div')
    content.classList.add('record-content')

    const header = document.createElement('h2')
    header.innerText = eraseSpaces(name)
    
    const mobileBox = document.createElement('a')
    mobileBox.innerText = eraseSpaces( mobile )

    mobileBox.setAttribute("href", `tel:${mobile.replace(/\s/g, "")}`)
    
    //// ERASE BUTTON ////

    const eraseButton = document.createElement('button')
    eraseButton.classList.add('eraseButton')
    
    eraseButton.addEventListener('click', () => {
        record.remove()
        mobileIndex.splice(
            mobileIndex.indexOf(
                mobileItem
            ),
            1
        )
    })
    
    const image = document.createElement('img')
    image.src = "icons/trash.svg"

    //// SETUP RECORD DOM ////
    
    record.append(content)
    record.append(eraseButton)
    
    content.append(header)
    content.append(mobileBox)

    eraseButton.append(image)

    return record
}

const setErrorMessage = errorMessage => {
    if ( !errorMessage.length ) {
        errorContainer.classList.remove('show')
        errorContainer.innerText = ""
    } else {
        errorContainer.innerText = errorMessage
        errorContainer.classList.add('show')
    }
}


//// LISTENERS ////

formContainer.addEventListener('submit', event => {
    event.preventDefault()
    const mobile = mobileInput.value
    const name = nameInput.value
    setErrorMessage("")
    
    //// VALIDATION ////
    
    if ( !validateName(name) ) {
        setErrorMessage("Invalid name")
        return
    }

    if ( !validateMobile(mobile) ){
        setErrorMessage("Invalid mobile number")
        return
    }

    //// ADD NEW ELEMENT ////
    
    const mobileItem = {
        name, mobile
    }

    mobileIndex.push(mobileItem)

    recordsContainer.prepend(
        createRecord(mobileItem)
    )

    mobileInput.value = ""
    nameInput.value = ""
})