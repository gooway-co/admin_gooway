import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardActionCreateComponent } from './card-action-create.component';

describe('CardActionCreateComponent', () => {
  let component: CardActionCreateComponent;
  let fixture: ComponentFixture<CardActionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardActionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardActionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
