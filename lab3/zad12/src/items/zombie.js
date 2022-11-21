//// ZOMBIE ////

class Zombie {

    constructor (props = {}) {

        /// INITIAL VALUES ///

        this.currentStep = 0

        /// PREPARE CANVAS ///

        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        
        this.canvas.width = config.frame.width
        this.canvas.height = config.frame.height

        this.canvas.classList.add('zombie')
        
        /// LISTENERS ///

        this.canvas.addEventListener('click', () => {
            killZombie( this )
            manipulatePoints( config.points.kill )
        })

        /// CANVAS PROPS ///

        this.speed = props.speed || getRandom(config.speed.min, config.speed.max)
        this.scale = props.scale || getRandom ( 
            config.frame.scale.min ,
            config.frame.scale.max 
        ) 

        /// PREPARE POSITION ///

        this._position = { x : 0, y : 0 }
        
        this.position = props.position || {
            x : config.board.dimensions.width,
            y : 0
        }
    }

    place ( board ) {
        board.append( this.canvas )
    }

    destroy () {
        this.canvas.remove()
    }

    draw ( step ) {
        this.ctx.clearRect(0, 0, config.frame.width, config.frame.height);
        this.ctx.drawImage(
            zombieSpriteSheet,

            //// SOURCE ////
            
            // offset
            step * config.frame.width,
            0,
            // dimensions
            config.frame.width,
            config.frame.height,

            //// DESTINATION ////
            
            // offset
            0,
            0,

            // dimensions
            config.frame.width,
            config.frame.height,
        )

        this.currentStep = step
    }

    move (vector = { x : 0, y : 0 }) {
        this.position = {
            x : this.position.x + vector.x, 
            y : this.position.y + vector.y,
        }
    }

    render () {
        this.draw( (this.currentStep + 1) % config.frame.count )
        this.move( {x : -this.speed, y : 0} )
    }

    set position ( value ) {
        this._position = value
        this.canvas.style.setProperty('--position-x', `${value.x || 0}px`)
        this.canvas.style.setProperty('--position-y', `${value.y || 0}px`)
    
        /// COLLISIONS ///

        if ( value.x <= config.edge.left ) {
            loseZombie(this)
        }
    }

    set scale ( value ) { 
        this._scale = value
        this.canvas.style.setProperty('--scale', value )        
    }

    get position () {
        return this._position
    }

    get scale () {
        return this._scale
    }
}