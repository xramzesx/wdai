import { Component, Input } from '@angular/core';
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

  @Input() id : number = 0

  getStars() : any[] {
    const result : any[] = []
    


    for (let i = 1; i <= this.max; i++ ) {
      result.push({
        rate : i,
        // value: 
      })
    }

    return result
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
}
