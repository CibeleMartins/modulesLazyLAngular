import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertActionComponent } from './convert-action.component';

describe('ConvertActionComponent', () => {
  let component: ConvertActionComponent;
  let fixture: ComponentFixture<ConvertActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
