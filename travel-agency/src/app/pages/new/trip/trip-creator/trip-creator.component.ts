import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { GlobalStateService } from '@app/services/global-state.service';
import { HttpService } from '@app/services/http.service';
import Utils from '@app/utils';
import { ValidateDateDirective } from 'src/app/directives/validate-date.directive';

@Component({
  selector: 'app-trip-creator',
  templateUrl: './trip-creator.component.html',
  styleUrls: ['./trip-creator.component.scss']
})
export class TripCreatorComponent implements OnInit{
  countries : string[] = []

  modelForm!: FormGroup;

  constructor ( 
    private globalState: GlobalStateService, 
    private httpService : HttpService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', [
        Validators.required, 
        Validators.maxLength(20)
      ]],
      country: ['', Validators.required],
      description : ['', [
        Validators.required, 
        Validators.maxLength(130)
      ]],
      imageMain : ['',[ 
        Validators.required, 
        Validators.pattern(
          Utils.httpUrlRegex
      )]],
      imageSecond : ['',[ 
        Validators.required, 
        Validators.pattern(
          Utils.httpUrlRegex
      )]],
      imageThird : ['',[ 
        Validators.required, 
        Validators.pattern(
          Utils.httpUrlRegex
      )]],
      price: [0, [ 
        Validators.required, 
        Validators.min(0)
      ]],
      quantity: [0, [
        Validators.required, 
        Validators.min(0)
      ]],
      startDate : ['',[ Validators.required]],
      endDate : ['',[ Validators.required]],
    })

    this.modelForm.valueChanges.subscribe( value => {
      this.onControlValueChanged()
    })

    this.httpService.getCountries().subscribe(countries => {
      this.countries = countries
    })
  }

  //// EVENT LISTENERS ////

  onSubmit() {
    if ( this.modelForm.valid ) {
      const { 
        name, 
        country,
        description, 
        imageMain,
        imageSecond,
        imageThird, 
        price, 
        quantity, 
        startDate : start, 
        endDate : end
      } = this.modelForm.value

      this.globalState.addTrip( {  
        id : '',
        name,
        country,
        description,
        images : [ imageMain, imageSecond, imageThird ],
        price : +price,
        quantity : +quantity,
        date : { start, end }
      })
      
      // this.modelForm.reset()
    }
  }

  onControlValueChanged() {
    const form = this.modelForm

    // console.log(form)
  }

  //// GETTERS /////

  get startDate() {
    return this.modelForm.get('startDate')?.value || this.today
  }

  get endDate() {
    return this.modelForm.get('endDate')?.value || this.today
  }

  get today () {
    return Utils.parseDate(new Date())
  }

  get currency() {
    return this.globalState.currency.name
  }
}
