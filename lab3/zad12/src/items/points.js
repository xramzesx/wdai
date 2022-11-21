/// POINTS ///

class Points {
    constructor (props) {
        this.points = props.points || 0
        
        this.element = document.createElement('div')
        this.element.innerText = this.points
        this.element.classList.add('points')

        this.board = props.board
        this.position = props.position || {}
        
        /// PREPARE POSITION ///
    
        this._position = { x:0, y:0 }
    
        this.position = props.position || {
            x : config.board.dimensions.width,
            y : 0
        }
    }

    count () {
        totalPoints += this.points
        this.place()
    }

    place () {
        this.board.append(this.element)
    }
}
