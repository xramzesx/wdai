//// DATA ////

const animationClasses = {
    slideInLeft : "slide-in-left",
    slideInRight : "slide-in-right",
    slideOutLeft : "slide-out-left",
    slideOutRight : "slide-out-right",
    active: 'active'
}

const clearAnimation = element => {
    for (let key in animationClasses ){
        element.classList.remove( animationClasses[key] )
    }
}

let activeSlide = 0
const slides = document.querySelectorAll('.slider .worker')


//// CONTROLS ////

const nextIndex = index => (index + 1) % slides.length 

const prevIndex = index => (slides.length + index - 1 ) % slides.length

const nextSlide = () => {
    const current = slides[activeSlide]
    const next = slides[ nextIndex(activeSlide) ]
    
    clearAnimation( current )
    clearAnimation( next )

    current.classList.add(animationClasses.slideOutLeft)
    next.classList.add(animationClasses.slideInRight)
    next.classList.add(animationClasses.active)

    activeSlide = nextIndex(activeSlide)
}

const prevSlide = () => {
    const current = slides[activeSlide]
    const prev = slides[ prevIndex(activeSlide) ]

    clearAnimation( current )
    clearAnimation( prev )

    current.classList.add(animationClasses.slideOutRight)
    prev.classList.add(animationClasses.slideInLeft)
    prev.classList.add(animationClasses.active)

    activeSlide = prevIndex(activeSlide)
}

//// LISTENERS ////

const nextButton = document.querySelector('.control.next button')
const prevButton = document.querySelector('.control.prev button')

nextButton.addEventListener( 'click', nextSlide )
prevButton.addEventListener( 'click', prevSlide )