import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComoLlegarPage } from './como-llegar.page';

describe('ComoLlegarPage', () => {
  let component: ComoLlegarPage;
  let fixture: ComponentFixture<ComoLlegarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ComoLlegarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
