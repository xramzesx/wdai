import { Component, HostListener, OnInit } from '@angular/core';
import { GlobalStateService } from '@app/services/global-state.service';
import { OrderItem, OrderStatus } from '@app/types';
import Utils from '@app/utils';
import { Router } from '@angular/router';


@Component({
  selector: '[app-user-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  total : number = 0
  counter : number = 0

  constructor(
    private globalState : GlobalStateService,
    private router : Router
  ) {}

  @HostListener('click')
  onClick() {
    this.router.navigate([`/orders`])
    
  }

  ngOnInit(): void {
    this.globalState.ordersChange.subscribe( (orders : OrderItem[]) => {
      this.counter = orders.filter( order => 
        Utils.getStatus(
          order.trip!.date.start, 
          order.trip!.date.end
        ) == OrderStatus.Waiting 
      ).length
    })
  }
}
