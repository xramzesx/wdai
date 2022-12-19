import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferRatesFormComponent } from './offer-rates-form.component';

describe('OfferRatesFormComponent', () => {
  let component: OfferRatesFormComponent;
  let fixture: ComponentFixture<OfferRatesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferRatesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferRatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
