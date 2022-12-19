import { Component } from '@angular/core';
import { GlobalStateService } from '@app/services/global-state.service';
import { OrderItem, OrderStatus, TripDate } from '@app/types';
import Utils from '@app/utils';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  constructor (
    private globalState : GlobalStateService
  ) {
    this.statuses = [
      "All",
      OrderStatus.Waiting,
      OrderStatus.Active,
      OrderStatus.Archive
    ]
  }

  statuses : string [] = []
  status : string = "All"

  onStatusChange (event : any) {

    this.status = event.target.value
  }

  get orders () : OrderItem[] {
    return this.globalState.orders.filter( 
      order => this.status == 'All' || this.getStatus(order) == this.status
     )
  }

  getTotal ( order : OrderItem ) {
    return order.quantity * (order.trip?.price ?? 1) ;
  }
  getPrice( order : OrderItem ) {
    return order.trip?.price ?? 0
  }

  getDate( order : OrderItem, type : string ){
    const date : any = order.trip?.date ?? {start : new Date(), end: new Date()}

    return new Date(date[type]) ;
  }

  getStatus ( order : OrderItem ){
    const date : any = order.trip?.date ?? {start : new Date(), end: new Date()}
    
    return Utils.getStatus(date.start, date.end)
  }

  getPath ( order : OrderItem ) {
    return `/offer/${order.tripId}`
  }

}
