import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { OfferComponent } from './pages/offer/offer.component';
import { ListComponent } from './pages/offer/trip/list/list.component';
import { ItemComponent } from './pages/offer/trip/item/item.component';
import { QuantityMaskPipe } from './pipes/quantity.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { CartButtonComponent } from './header/cart/button/button.component';
import { CartFloatingComponent } from './header/cart/floating/floating.component';
import { OptionsComponent } from './pages/offer/options/options.component';
import { FilterComponent } from './pages/offer/options/filter/filter.component';
import { TripCreatorComponent } from './pages/new/trip/trip-creator/trip-creator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './common/input/input.component';
import { ValidateDateDirective } from './directives/validate-date.directive';
import { RatesComponent } from './common/rates/rates.component';
import { ElementComponent } from './common/rates/element/element.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CheckboxComponent } from './common/checkbox/checkbox.component';
import { DecimalPipe } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { NewTripComponent } from './pages/new/trip/trip.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { CartComponent } from './pages/cart/cart.component';
import { HamburgerComponent } from './header/hamburger/hamburger.component';
import { MenuComponent } from './header/menu/menu.component';
import { ContactComponent } from './pages/home/contact/contact.component';
import { MapComponent } from './pages/home/map/map.component';
import { CardComponent } from './pages/home/card/card.component';
import { CurrencySelectComponent } from './header/currency-select/currency-select.component';
import { OfferDetailsComponent } from './pages/offer-details/offer-details.component';
import { AboutComponent } from './pages/home/about/about.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SliderComponent } from './pages/offer-details/slider/slider.component';
import { OfferRatesComponent } from './pages/offer-details/offer-rates/offer-rates.component';
import { OfferRatesFormComponent } from './pages/offer-details/offer-rates-form/offer-rates-form.component';
import { ButtonComponent } from './header/user/button/button.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserMenuComponent } from './header/user/menu/menu.component';
import { AdminViewComponent } from './pages/admin-view/admin-view.component';
import { TripManageComponent } from './pages/trip-manage/trip-manage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OfferComponent,
    ListComponent,
    ItemComponent,
    QuantityMaskPipe,
    CurrencyPipe,
    CartButtonComponent,
    CartFloatingComponent,
    OptionsComponent,
    FilterComponent,
    TripCreatorComponent,
    InputComponent,
    ValidateDateDirective,
    RatesComponent,
    ElementComponent,
    FilterPipe,
    CheckboxComponent,
    HomeComponent,
    NewTripComponent,
    OrdersComponent,
    CartComponent,
    HamburgerComponent,
    MenuComponent,
    ContactComponent,
    MapComponent,
    CardComponent,
    CurrencySelectComponent,
    OfferDetailsComponent,
    AboutComponent,
    SliderComponent,
    OfferRatesComponent,
    OfferRatesFormComponent,
    ButtonComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    UserMenuComponent,
    AdminViewComponent,
    TripManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [
    QuantityMaskPipe, 
    FilterPipe,
    DecimalPipe,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
