import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenesDeVentaPage } from './ordenes-de-venta.page';

describe('OrdenesDeVentaPage', () => {
  let component: OrdenesDeVentaPage;
  let fixture: ComponentFixture<OrdenesDeVentaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrdenesDeVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
