//// CONFIG ////

const board = document.querySelector('.game')

const config = {
    hearts : 3,
    speed : {
        min : 1,
        max : 5,
    },
    board : {
        element : board,
        dimensions : {
            width: board.offsetWidth,
            height: board.offsetHeight,
        }
    },
    frame : {
        count : 10,
        width: 200,
        height: 312,
        scale : {
            min : .5,
            max : 1.1
        }
    },
    edge : {
        // dolne ograniczenie dla przestrzeni, 
        // w której generują się zombiaki
        bottom : 100,
        /// offset, żeby cały zombiak się schował
        /// po lewej stronie
        left : 0,
        
        right : 0,
        top: 0,
    },
    status : {
        active : 0,
        paused : 1
    },
    points : {
        kill : 12,
        miss : -6,
    }
}

config.edge.left = - config.frame.width * config.frame.scale.max


let hearts = config.hearts
let totalPoints = 0
let gameStatus = config.status.paused

const zombies = []

//// ANIMATIONS ////

const render = () => {
    for (const zombie of zombies ) {
        zombie.render()
    }
    if ( gameStatus === config.status.active )
        window.requestAnimationFrame(render)
}

//// SETUP ////

const restartGame = () => {
    
    hearts = 3
    totalPoints = 0
    gameStatus = config.status.active

    for (const zombie of zombies )
        zombie.destroy()
    
    /// clear zombies ///
    zombies.length = 0

    manipulatePoints(0)

    render()
}

const zombieSpriteSheet = new Image()
zombieSpriteSheet.src = 'images/walkingdead.png'

zombieSpriteSheet.addEventListener('load', () => {
    restartGame()
})

//// UTILS ////

const zerofill = number => ('00000' + number).slice(-5)

const removeFromArray = ( array, element ) => {
    array.splice(
        array.indexOf( element ),
        1
    )
}

const getRandom = (min, max) => {
    return Math.random() * ( max - min ) + min
}

const generatePosition = () => {
    const { 
        board : {dimensions},
        edge,
    } = config

    return {
        x : dimensions.width,
        y : getRandom( 
            edge.top, 
            dimensions.height - edge.bottom 
        )
    }
}

const generateRandomZombie = () => {
    const zombie = new Zombie({
        position: generatePosition()
    })
    zombie.place(board)
    zombies.push(zombie)
    return zombie
}

/// ZOMBIE GENERATION ///

setInterval(() => {
    if ( gameStatus === config.status.active )
    generateRandomZombie()
}, 1000);

//// GAME UI ////

const gameOver = () => {
    gameStatus = config.status.paused

    const overlay = document.querySelector('.overlay.gameover')
    overlay.classList.add('show')

}

const pointsContainer = document.querySelector('div.points')

const manipulatePoints = points => {
    totalPoints = Math.max( totalPoints + points, 0 )
    pointsContainer.innerText = zerofill(totalPoints)
    console.log(totalPoints)
}

/// POINTS ////

const loseZombie = zombie => {
    if ( --hearts <= 0 ) {
        gameOver()
    }

    removeFromArray(zombies, zombie)
}

const killZombie = zombie => {
    zombie.destroy()
    removeFromArray(zombies, zombie)
}

const missZombie = () => {
    manipulatePoints( config.points.miss )
}

//// LISTENERS ////

window.addEventListener('resize', event => {
    config.board.dimensions.width = board.offsetWidth
    config.board.dimensions.height = board.offsetHeight
})

document.addEventListener('click', event => {
    if ( !event.target.classList.contains('zombie') && gameStatus === config.status.active) {
        missZombie()   
    }
})

const restartButtton = document.querySelector('.gameover .restart')

restartButtton.addEventListener('click', () => {
    const overlay = document.querySelector('.overlay.gameover')
    overlay.classList.remove('show')
    restartGame()

})