const fs = require('fs')

const template = {
    name : [ "Gorąca", "Wspaniała", "Niesamowita", "Baśniowa" ],
    country: ["Polska", "Argentyna", "Szwajcaria", "Grecja", "Hiszpania", "Arabia" ],
    date : {
        start : new Date("2023-06-15"),
        end : new Date("2023-10-01"),
        lengths: [3, 5, 7, 10, 14]
    },
    quantity : {
        from : 0,
        to : 20
    },
    description : [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at lectus sit amet purus blandit pharetra. Sed a hendrerit dolor.',
        'Integer molestie, est nec fringilla tristique, quam justo mattis nunc, vel hendrerit leo urna aliquet nisl.',
        'Nam ut est et neque dapibus interdum molestie interdum ligula. Vivamus maximus, ipsum quis maximus dictum, magna mi sagittis sem.',
        'Et luctus nulla nulla ultrices dui. Suspendisse aliquam lorem at ante aliquam viverra. Nunc scelerisque mi in lectus porta lobortis.',
        'Nunc efficitur, metus a varius efficitur, orci metus varius elit, sit amet tempor est lorem sed massa.',
        'Donec viverra neque eget dolor rhoncus, a elementum lorem porta. Ut placerat massa ut iaculis lacinia.',
        'Phasellus blandit porta dolor, pellentesque molestie enim tempor eget. Aenean tempus euismod erat eget blandit.',
        'Duis ultrices, justo non fringilla porttitor, metus metus iaculis mauris, non elementum eros elit eu eros.',
        'Sed tempus blandit odio, eget congue elit facilisis eget. Sed fermentum ex in lectus dignissim euismod',
        'Cras lobortis feugiat quam a aliquet. Integer non feugiat turpis. Nam vulputate turpis placerat dolor bibendum pulvinar. Ut non ipsum eros',
        'Etiam molestie, arcu ac imperdiet aliquam, velit justo venenatis mauris. Ut eleifend lacinia lacus vel pulvinar.'
    ],
    imageId: [203, 200, 201, 213, 210, 211, 223, 220, 221, 233, 230, 231, 243, 240, 241, 253, 250, 251, 263, 267, 268, 273, 270, 271],
    image : [
        'https://picsum.photos/id/223/600/300',
        'https://picsum.photos/id/220/600/300',
        'https://picsum.photos/id/221/600/300',
        'https://picsum.photos/id/213/600/300',
        'https://picsum.photos/id/210/600/300',
        'https://picsum.photos/id/210/600/300',
        'https://picsum.photos/id/221/600/300'

    ]       
}

console.log(template)

const DAY = (new Date('2022-01-02')).getTime() - (new Date('2022-01-01')).getTime()
const ACCURACY = 100
const ID_OFFSET = 100

const getRandom = (start, end) => Math.floor( Math.random() * (end - start + 1) + start) 
const getRandomProp = arr => arr[ getRandom(0, arr.length - 1) ]
const getRandomDate = (start, end) => new Date( Math.floor(getRandom( start.getTime(), end.getTime()) / DAY ) * DAY )


const generateItem = () => {
    
    const country = getRandomProp(template.country)
    const startDate = getRandomDate(template.date.start, template.date.end)
    
    return {
        name : `${getRandomProp(template.name)} ${country}`,
        country,
        date: {
            start: startDate,
            end: new Date( startDate.getTime() + getRandomProp(template.date.lengths) * DAY )
        },
        price: Math.floor ( getRandom( 600 * ACCURACY, 3000 * ACCURACY) ) / ACCURACY,
        quantity: getRandom(template.quantity.from, template.quantity.to),

        description: getRandomProp(template.description),
        image: `https://picsum.photos/id/${getRandomProp(template.imageId)}/600/300`
    }
}

const result = []

for ( let i = 0; i < 10; i++ ) {
    result.push({...generateItem(), id : i + ID_OFFSET})
}

console.log(result)

console.log(JSON.stringify(result, null, 5))

fs.writeFileSync('./trips.json', JSON.stringify(result, null, 5))