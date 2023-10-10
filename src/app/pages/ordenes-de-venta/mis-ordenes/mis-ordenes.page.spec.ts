import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisOrdenesPage } from './mis-ordenes.page';

describe('MisOrdenesPage', () => {
  let component: MisOrdenesPage;
  let fixture: ComponentFixture<MisOrdenesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MisOrdenesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


