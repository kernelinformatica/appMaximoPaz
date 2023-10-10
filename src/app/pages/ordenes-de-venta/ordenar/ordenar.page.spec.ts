import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenarPage } from './ordenar.page';

describe('OrdenarPage', () => {
  let component: OrdenarPage;
  let fixture: ComponentFixture<OrdenarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrdenarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
