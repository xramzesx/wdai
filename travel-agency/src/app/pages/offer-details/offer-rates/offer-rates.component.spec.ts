import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferRatesComponent } from './offer-rates.component';

describe('OfferRatesComponent', () => {
  let component: OfferRatesComponent;
  let fixture: ComponentFixture<OfferRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
