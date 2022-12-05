import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { FilterPipe } from '@app/pipes/filter.pipe';
import { GlobalStateService } from '@app/services/global-state.service';
import Utils from '@app/utils';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{
  modelForm!: FormGroup

  extendedFilters : any = {}
  shortFilters : any = {}

  @Output() handleFilters : EventEmitter<any> = new EventEmitter();

  updateFilter() {
    this.handleFilters.emit( this.modelForm.value )
  }

  constructor(
    private formBuilder: FormBuilder,
    private globalState: GlobalStateService,
    private filterPipe: FilterPipe
  ) {}

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      countries : new FormArray([]),
      rates : new FormArray([]),
      startDate: [''],
      endDate: [''],
      minPrice : [0],
      maxPrice : [0],
    })

    this.globalState.tripsChange.subscribe( v => {
      this.updateFilter()
    })

    this.modelForm.valueChanges.subscribe( v => {
      this.updateFilter()
      this.extendedFilters = { 
        countries : this.modelForm.get('countries')?.value, 
        rates : this.modelForm.get('rates')?.value,
        startDate : this.modelForm.get('startDate')?.value,
        endDate : this.modelForm.get('endDate')?.value
      }
      this.shortFilters = { 
        countries : this.modelForm.get('countries')?.value,
        rates : this.modelForm.get('rates')?.value,
      }
    })

    //// SUBSCRIBES ////
  }

  onCheckboxChange( e : any, name: string ) {
    const checkArray: FormArray = this.modelForm.get(name) as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    this.updateFilter()
  }

  onCountriesCheckboxChange(e: any) {
    this.onCheckboxChange(e, 'countries')
  }

  onRatesCheckboxChange(e: any) {
    this.onCheckboxChange(e, 'rates')
  }

  //// GETTERS /////

  get rates() {
    return Utils.unique(
      this.globalState.trips.map( ({rates}) => Utils.getRate(rates || []) )
    ).sort().reverse()
  }

  get countries() {
    return Utils.unique(
      this.globalState.trips.map( ({country}) => country )
    ).sort()
  }

  //// DATE GETTERS ////

  get startDate() {
    return this.modelForm.get('startDate')?.value || this.today
  }

  get endDate() {
    return this.modelForm.get('endDate')?.value || this.today
  }

  get today () {
    return Utils.parseDate(new Date())
  }

  get minDate() {
    return Utils.convertDate(new Date( Math.min( ...this.shortFilteredTrips.map(({date}) => new Date(date.start).getTime() )) ) )
  }

  get maxDate() {
    return Utils.convertDate(new Date( Math.max( ...this.shortFilteredTrips.map(({date}) => new Date(date.start).getTime() )) ) )
  }

  //// PRICE ////

  get minPrice() {
    return this.globalState.convertToCurrency(Math.min( ...this.filteredTrips.map( ({price}) => price ) ))
  }

  get maxPrice() {
    return this.globalState.convertToCurrency(Math.max( ...this.filteredTrips.map(({price}) => price) ))
  }

  //// CUSTOM FILTERS ////
  
  get shortFilteredTrips() {
    return this.filterPipe.transform(this.globalState.trips, this.shortFilters)
  }

  get filteredTrips () {
    return this.filterPipe.transform( this.globalState.trips, this.extendedFilters )
  }
}
