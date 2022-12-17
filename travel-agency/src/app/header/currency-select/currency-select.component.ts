import { Component } from '@angular/core';
import { GlobalStateService } from '@app/services/global-state.service';
import { currencies } from '@app/types';

@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss']
})
export class CurrencySelectComponent {
  constructor(private globalState: GlobalStateService) {}

  getCurrencies() {
    return currencies;
  }

  getCurrentCurrency() {
    return currencies.indexOf(this.globalState.currency)
  }

  onCurrencyChange(event: Event) {
    const target = event.target as HTMLSelectElement
    this.globalState.onCurrencyChange( +target.value )
  }
}
