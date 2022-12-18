import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewTripComponent } from './pages/new/trip/trip.component';
import { OfferDetailsComponent } from './pages/offer-details/offer-details.component';
import { OfferComponent } from './pages/offer/offer.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
  { path : "", component : HomeComponent , pathMatch : 'full'},
  { path : "offer", component : OfferComponent },
  { path : "offer/:id", component: OfferDetailsComponent },
  { path : "orders", component : OrdersComponent },
  { path: 'new/trip', component: NewTripComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
