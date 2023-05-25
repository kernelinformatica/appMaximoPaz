import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleCerealPage } from './detalle-cereal.page';

describe('DetalleCerealPage', () => {
  let component: DetalleCerealPage;
  let fixture: ComponentFixture<DetalleCerealPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleCerealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
