import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCoinsComponent } from './home-coins.component';

describe('HomeCoinsComponent', () => {
  let component: HomeCoinsComponent;
  let fixture: ComponentFixture<HomeCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCoinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
