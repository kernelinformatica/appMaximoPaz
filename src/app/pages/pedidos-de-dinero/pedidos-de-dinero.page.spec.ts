import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosDeDineroPage } from './pedidos-de-dinero.page';

describe('PedidosDeDineroPage', () => {
  let component: PedidosDeDineroPage;
  let fixture: ComponentFixture<PedidosDeDineroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedidosDeDineroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
