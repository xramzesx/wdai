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
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      country: ['', Validators.required],
      description : ['', [
        Validators.required, 
        Validators.maxLength(130)
      ]],
      image : ['',[ 
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

  onControlValueChanged() {
    const form = this.modelForm

    console.log(form)
  }

  parseDate(date: Date) : string {
    return date ? date.toISOString().split('T')[0] : ''
  }

  //// GETTERS /////

  get startDate() {
    console.log('startdate',this.modelForm.get('startDate')?.value)

    return this.modelForm.get('startDate')?.value || this.today
  }

  get endDate() {
    return this.modelForm.get('endDate')?.value || this.today
  }

  get today () {
    return this.parseDate(new Date())
  }
}
