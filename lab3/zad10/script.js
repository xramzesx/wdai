const area = document.querySelector('.area')
const pointer = document.querySelector('.pointer')
const container = document.querySelector('.container')

const messageBox = document.querySelector('.area h1')
const subMessageBox = document.querySelector('.area h2')

area.addEventListener('click', event => {
    pointer.style.setProperty('--position-x', `${event.offsetX}px`)
    pointer.style.setProperty('--position-y', `${event.offsetY}px`)
})

document.addEventListener('click', event => {
    if ( event.target === area || area.contains(event.target)) {
        messageBox.innerText = "Bardzo ładnie"
        subMessageBox.innerText = "🥰🥰🥰"

        container.classList.add('valid')
        container.classList.remove('invalid')
    } else {
        messageBox.innerText = "No i gdzie klikasz"
        subMessageBox.innerText = "(╯‵□′)╯︵┻━┻"

        container.classList.add('invalid')
        container.classList.remove('valid')
    }
})