import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedirDineroPage } from './pedir-dinero.page';

describe('PedirDineroPage', () => {
  let component: PedirDineroPage;
  let fixture: ComponentFixture<PedirDineroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PedirDineroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
