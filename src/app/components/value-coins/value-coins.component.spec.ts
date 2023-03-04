import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueCoinsComponent } from './value-coins.component';

describe('ValueCoinsComponent', () => {
  let component: ValueCoinsComponent;
  let fixture: ComponentFixture<ValueCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueCoinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
