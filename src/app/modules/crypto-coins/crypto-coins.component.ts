import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { CryptoCoinService } from 'src/app/services/CryptoCoin.service';

@Component({
  selector: 'app-crypto-coins',
  templateUrl: './crypto-coins.component.html',
  styleUrls: ['./crypto-coins.component.scss']
})
export class CryptoCoinsComponent {

  flexDirectionColumn: boolean = false
  isLargeOrMedium: boolean = false
  isSmallorXsmall: boolean = false
  isLoading: boolean = false
  constructor(private breakpointService: BreakpointObserver, private cryptoCoinService: CryptoCoinService) {}

  ngOnInit() {
    // this.cryptoCoinService.getExchangeRateLatest()
    this.breakpointService.observe([Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Medium, Breakpoints.Large]).subscribe((result) => {

      this.flexDirectionColumn = false;
      this.isLargeOrMedium = false
      this.isSmallorXsmall = false
      if (result.breakpoints[Breakpoints.Small]) {
        console.log('small')
        this.flexDirectionColumn = true;
        this.isSmallorXsmall = true
      }

      if (result.breakpoints[Breakpoints.XSmall]) {
        console.log('Xsmall')
        this.flexDirectionColumn = true;
        this.isSmallorXsmall = true
      }

      if (result.breakpoints[Breakpoints.Medium]) {
        console.log('Medium')
        this.isLargeOrMedium = true
      }

      if (result.breakpoints[Breakpoints.Large]) {
        console.log('Large')
        this.isLargeOrMedium = true
      }
    })
  
  }

}
