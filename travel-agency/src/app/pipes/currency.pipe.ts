import { Pipe, PipeTransform } from '@angular/core';
import { GlobalStateService } from '@app/services/global-state.service';
import { Currency } from '@app/types';
import { BehaviorSubject } from 'rxjs';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  constructor( private globalState: GlobalStateService ) {}

  transform(value: number, showName : boolean = false): BehaviorSubject<string> {
    
    const { converter, name } = this.globalState.currency;

    let currencySubject: BehaviorSubject<string> = 
      new BehaviorSubject<string>(`${
        Math.ceil( value / converter * 100) / 100
      } ${
        ( showName ? name : "" )
      }`);


    this.globalState.currencyChange.subscribe(
      (currency: Currency) => {
        const { converter, name } = currency
        
        currencySubject.next( `${
          Math.ceil( value / converter * 100) / 100
        } ${
          ( showName ? name : "" )
        }`)
      }
    )

    return currencySubject;
  }

}
