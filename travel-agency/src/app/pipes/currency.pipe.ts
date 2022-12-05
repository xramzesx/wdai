import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { GlobalStateService } from '@app/services/global-state.service';
import { Currency } from '@app/types';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  constructor( 
    private globalState: GlobalStateService, 
    private decimalPipe : DecimalPipe 
  ) {}

  getPreparedValue( value : number, converter : number ) {
    return this.decimalPipe.transform( Math.ceil( value / converter * 100) / 100, "1.2-2")
  }

  transform(value: number, showName : boolean = false): BehaviorSubject<string> {
    
    const { converter, name } = this.globalState.currency;

    let currencySubject: BehaviorSubject<string> = 
      new BehaviorSubject<string>(`${
        this.getPreparedValue(value, converter)
      } ${
        ( showName ? name : "" )
      }`);


    this.globalState.currencyChange.subscribe(
      (currency: Currency) => {
        const { converter, name } = currency
        
        currencySubject.next( `${
          this.getPreparedValue(value, converter)
        } ${
          ( showName ? name : "" )
        }`)
      }
    )

    return currencySubject;
  }

}
