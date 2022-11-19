const imageContainer = document.querySelector('#image')
const image = document.querySelector('#image img')

const images = [
    { url: "img/tatry.webp", className: "red" },
    { url: "img/beach.jfif", className: "blue"},
    { url: "img/forest.webp", className: "green"},
]

const button = document.querySelector('.next');

let currentImage = 0

button.addEventListener('click', () => {
    currentImage = (currentImage + 1) % images.length
    const { url, className } = images[currentImage]
    
    imageContainer.className=className
    image.setAttribute('src', url)
    console.log('elo')
})