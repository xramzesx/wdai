import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalStateService } from '@app/services/global-state.service';
import { Rate } from '@app/types'
import Utils from '@app/utils';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent {
  @Input() rates: Rate[] = [];
  
  @Input() max : number = 5
  @Input() id : string = ''

  @Input() minimal   : boolean = false
  @Input() disabled  : boolean = false
  @Input() controled : boolean = false
  @Input() small     : boolean = false
  
  @Output() handleClick : EventEmitter<number> = new EventEmitter()

  constructor(
    private globalState: GlobalStateService
  ) {}

  
  onClick( index: number ) {
    if ( !this.disabled && !this.controled)
      this.globalState.modifyRate( this.id , index + 1 )
    this.handleClick.emit(index + 1)
  }

  getStars() : any[] {
    const result : any[] = [...Array(this.max).keys()]    
    const rate = Utils.getRate(this.rates)
    const current = this.current

    return result.map( index => ({ 
      index, 
      contain : index < rate,
      current : index < current 
    }))
  }

  get avg () {
    return this.rates.length == 0 
      ? 0 
      : Math.round(
        10 * this.rates.reduce( 
          (acc, {rate}) => acc + rate, 
          0 
        ) / this.rates.length) / 10
  }

  get rate () {
    return Utils.getRate(this.rates)
  }

  get current() {
    return this.globalState.getUserRate( this.id )
  }
}
