import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuantityMaskPipe } from '@app/pipes/quantity.pipe';
import { GlobalStateService } from '@app/services/global-state.service';
import { HttpService } from '@app/services/http.service';
import { CompleteTripItem, Rate, TripDate } from '@app/types';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit{
  constructor( 
    private route: ActivatedRoute, 
    private httpService : HttpService,
    private globalState: GlobalStateService,
    private quantityPipe: QuantityMaskPipe
  ) {}

  id : string = ""

  name : string = ""
  country: string =""
  description: string = ""
  
  price : number = 0
  quantity: number = 0
  
  images : string[] = []

  date : TripDate = {
    start : new Date(), 
    end: new Date()
  }

  rates : Rate[] = []

  selected: number = 0

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap( params => this.httpService.getTripDetails(params['id']))
    ).subscribe( (trip : CompleteTripItem ) => {
      console.log(trip)

      this.id = trip.id
      this.name = trip.name
      this.country = trip.country
      this.description = trip.description
      this.price = trip.price
      this.quantity = trip.quantity
      
      this.images = trip.images
      this.date = trip.date

      this.rates = trip.rates ?? []
      this.selected = this.globalState.cart.get(this.id)?.quantity ?? 0
    })
  }

  handleSubmit( rate : Rate ) {
    console.log(rate)
    this.rates.push(rate)
  }

  onAddUnit() {
    if ( this.quantity > this.selected) {
      this.selected++
    }
    this.modifyCart()
  }

  onRemoveUnit() {
    if (this.selected > 0) {
      this.selected--
    }
    this.modifyCart()
  }

  modifyCart(){
    this.globalState.modifyCart({
      id: this.id,
      name : this.name,
      quantity : this.selected,
      price: this.price
    })
  }

  getAvailableClassVariant () : string {
    return this.quantityPipe.transform( 
      this.quantity - this.selected, 
      'className' 
    );
  }
}
