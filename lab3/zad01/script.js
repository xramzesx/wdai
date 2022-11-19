const button = document.querySelector('section button')
const text = document.querySelector('section h1')

button.addEventListener( 'click', () => {
    const t = prompt("Jak się nazywasz?")
    console.log(t)

    text.innerText = `Witam ${ t[t.length - 1] == "a" ? `Panią` : `Pana` } ${t}`

})