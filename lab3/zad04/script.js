const buttonTest = document.querySelector('button.test')
const buttonStart = document.querySelector('button.start')
const buttonStop = document.querySelector('button.stop')

let isActiveListener = false
let counter = 0

const comm = document.querySelector('.comm')


const handleTestClick = () => {
    counter++
    comm.innerText=`Licznik ${counter}`
}

buttonStart.addEventListener('click', () => {
    if (!isActiveListener) {
        buttonTest.addEventListener('click', handleTestClick)
        comm.innerText = 'Aktywowano test'
        isActiveListener = true
    }
})


buttonStop.addEventListener('click', () => {
    if (isActiveListener) {
        buttonTest.removeEventListener(
            'click', 
            handleTestClick
        )
        comm.innerText = 'Deaktywowano test'
        isActiveListener = false
    }
})