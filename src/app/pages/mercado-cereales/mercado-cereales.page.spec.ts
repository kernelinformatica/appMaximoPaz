import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MercadoCerealesPage } from './mercado-cereales.page';

describe('MercadoCerealesPage', () => {
  let component: MercadoCerealesPage;
  let fixture: ComponentFixture<MercadoCerealesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MercadoCerealesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
