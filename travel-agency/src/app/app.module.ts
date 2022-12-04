import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './pages/main/main.component';
import { ListComponent } from './pages/main/trip/list/list.component';
import { ItemComponent } from './pages/main/trip/item/item.component';
import { QuantityMaskPipe } from './pipes/quantity.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';
import { CartButtonComponent } from './header/cart/button/button.component';
import { CartFloatingComponent } from './header/cart/floating/floating.component';
import { OptionsComponent } from './pages/main/options/options.component';
import { FilterComponent } from './pages/main/options/filter/filter.component';
import { TripCreatorComponent } from './pages/main/options/trip-creator/trip-creator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './common/input/input.component';
import { ValidateDateDirective } from './directives/validate-date.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [QuantityMaskPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
