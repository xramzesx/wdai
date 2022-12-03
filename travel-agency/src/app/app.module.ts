import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './pages/main/main.component';
import { ListComponent } from './pages/main/trip/list/list.component';
import { ItemComponent } from './pages/main/trip/item/item.component';
import { FilterComponent } from './pages/main/filter/filter.component';
import { QuantityMaskPipe } from './pipes/quantity.pipe';
import { CurrencyPipe } from './pipes/currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ListComponent,
    ItemComponent,
    FilterComponent,
    QuantityMaskPipe,
    CurrencyPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [QuantityMaskPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
