import { Pipe, PipeTransform } from '@angular/core';
import { TripItem } from '@app/types';
import Utils from '@app/utils';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform( value: TripItem[], filters : any = {}, short : boolean = false ): TripItem[] {
    const {
      countries, 
      rates : selectedRates, 
      minPrice, 
      maxPrice, 
      startDate, 
      endDate
    } = filters
  
    const countriesSet = new Set( countries )
    const ratesSet = new Set( selectedRates  )

    const shortResult : TripItem[] = value
      .filter( 
        ({country}) => 
          countriesSet.has(country) || 
          countriesSet.size == 0 
      ).filter(({rates}) =>
          ratesSet.has(Utils.getRate(rates || []).toString()) ||
          ratesSet.size == 0   
      );

    if (short)
      return shortResult
    
    return shortResult
      .filter( ({date}) => !startDate || Utils.cmpDate( startDate, date.start.toString()) <= 0)
      .filter( ({date}) => !endDate || Utils.cmpDate( endDate, date.end.toString()) >= 0 )
      .filter( ({price}) => !minPrice || price >= +minPrice )
      .filter( ({price}) => !maxPrice || price <= +maxPrice )
  }
}
