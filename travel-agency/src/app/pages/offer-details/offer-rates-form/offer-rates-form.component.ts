import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalStateService } from '@app/services/global-state.service';
import { HttpService } from '@app/services/http.service';
import { Rate } from '@app/types';

@Component({
  selector: 'app-offer-rates-form',
  templateUrl: './offer-rates-form.component.html',
  styleUrls: ['./offer-rates-form.component.scss']
})
export class OfferRatesFormComponent implements OnInit{
  @Input() id : string = ""
  @Input() name : string = ""

  @Output() onSubmit : EventEmitter<Rate> = new EventEmitter()

  rates : Rate[] = []

  errors : string[] = []

  modelForm!: FormGroup

  constructor( 
    private globalState : GlobalStateService,
    private httpService : HttpService,
    private formBuilder : FormBuilder
  ) {}

  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      nick : ["", [Validators.required, Validators.maxLength(50)]],
      name : [{value : this.name, disabled: true}, [Validators.required]],
      comment : ["", [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      orderDate : ['']
    })
  }

  handleRate( rate : number ) {
    console.log(rate)
    if ( this.rates.filter( item => item.rate == rate ).length ) {
      this.rates = []
    } else {
      this.rates = [{ id: 0, rate }]
    }
  }

  get isValid() {
    return true || this.modelForm.valid && this.rates.length == 1
  }

  handleSubmit() {    
    const keys = [ 'nick', 'name', 'comment' ]
    this.errors.length = 0
    const {
      nick,
      comment,
      orderDate
    } = this.modelForm.value

    for ( const key of keys ) {
      const errors = this.modelForm.get(key)?.errors

      for ( let k in errors ) {
        this.errors.push( `'${key}' : ${{
          required : 'is required',
          minlength: `has minimum length of ${errors[k].requiredLength}`,
          maxlength: `has maximum length of ${errors[k].requiredLength}`,
        }[k] 
      }`)
      }
    }

    if (this.rates.length == 0) {
      this.errors.push(`'rate' is required`)
    }

    if ( this.errors.length > 0)
      return

    const result : Rate = {
      id : 0,
      nick,
      name: this.name,
      rate : this.rates[0].rate,
      comment,
      orderDate : orderDate == '' ? undefined : new Date(orderDate),
    }

    this.modelForm.reset()

    this.httpService.addRate(this.id, result).subscribe( (response : any) => {
      console.log(response)

      if (response.errors.length == 0)
        this.onSubmit.emit(response.rate as Rate)
    })
  }
}
