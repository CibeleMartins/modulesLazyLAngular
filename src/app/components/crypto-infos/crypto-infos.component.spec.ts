import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoInfosComponent } from './crypto-infos.component';

describe('CryptoInfosComponent', () => {
  let component: CryptoInfosComponent;
  let fixture: ComponentFixture<CryptoInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoInfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
