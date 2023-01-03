import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AdminManagerGuard } from './guards/admin-manager.guard';
import { AuthGuard } from './guards/auth.guard';
import { ManagerAuthGuard } from './guards/manager-auth.guard';
import { AdminViewComponent } from './pages/admin-view/admin-view.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { NewTripComponent } from './pages/new/trip/trip.component';
import { OfferDetailsComponent } from './pages/offer-details/offer-details.component';
import { OfferComponent } from './pages/offer/offer.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { TripManageComponent } from './pages/trip-manage/trip-manage.component';

const routes: Routes = [
  { path : "", component : HomeComponent , pathMatch : 'full'},
  { path : "offer", component : OfferComponent },
  { path : "offer/:id", component: OfferDetailsComponent, canActivate : [AuthGuard] },
  { path : "orders", component : OrdersComponent, canActivate : [AuthGuard] },
  { path : "cart", component : CartComponent, canActivate : [AuthGuard] },
  { path : 'new/trip', component: NewTripComponent, canActivate: [AuthGuard, AdminManagerGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'admin/view', component: AdminViewComponent, canActivate : [AuthGuard, AdminManagerGuard] },
  { path: 'manage/trip', component: TripManageComponent, canActivate : [AuthGuard, ManagerAuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
