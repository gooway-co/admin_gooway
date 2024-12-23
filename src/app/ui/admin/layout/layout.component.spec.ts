import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFlyerComponent } from './layout.component';

describe('LayoutFlyerComponent', () => {
  let component: LayoutFlyerComponent;
  let fixture: ComponentFixture<LayoutFlyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutFlyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutFlyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
