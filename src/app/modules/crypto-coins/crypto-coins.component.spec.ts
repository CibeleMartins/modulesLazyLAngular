import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCoinsComponent } from './crypto-coins.component';

describe('CryptoCoinsComponent', () => {
  let component: CryptoCoinsComponent;
  let fixture: ComponentFixture<CryptoCoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoCoinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
