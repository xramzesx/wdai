import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  @Input() images : string[] = []
  
  currentIndex : number = 0

  nextIndex ( index : number ){ 
    return (index + 1) % this.images.length 
  } 

  prevIndex ( index : number ) { 
    return (this.images.length + index - 1 ) % this.images.length
  }
  
  onNext(){
    this.currentIndex = this.nextIndex(this.currentIndex)
  }

  onPrev() {
    this.currentIndex = this.prevIndex(this.currentIndex)
    console.log(this.currentIndex)
  }

  setCurrent(index : number) {
    this.currentIndex = index
  }
}
