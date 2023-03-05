import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { CryptoCoinService } from 'src/app/services/CryptoCoin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crypto-infos',
  templateUrl: './crypto-infos.component.html',
  styleUrls: ['./crypto-infos.component.scss']
})
export class CryptoInfosComponent {

  cryptoInfos!: any;
  @Input() isHide!: boolean;

  coinsNotSymbol = [
    'bnbbrl',
    'ltcbrl',
    'bttbrl',
    'shibbrl',
    'busdbrl',
    'galabrl',
    'lunabrl',
    'galbrl',
    'aptbrl',
    'linkbrl'
  ]

  constructor(private cryptoService: CryptoCoinService, private breakpointService: BreakpointObserver, private router: Router) {

  }

  ngOnInit() {
    this.cryptoService.getCryptoInfos().subscribe((data) => {
      let cryptoName = ''
       data.map((i) => {
        cryptoName = i.name.replace('B', '').replace('R', '').replace('L', '')
        if( cryptoName.toLowerCase() === 'win' || cryptoName.toLowerCase() === 'axs' || cryptoName.toLowerCase() === 'fis' || cryptoName.toLowerCase() === 'c98' || cryptoName.toLowerCase() === 'ftm' || cryptoName.toLowerCase() === 'santos') {
          i.symbol = '../../../assets/' + `${cryptoName.toLowerCase()}.png`;
        } else if (cryptoName.toLowerCase() === 'cake' ) {
          i.symbol = '../../../assets/' + `${cryptoName.toLowerCase()}.webp`
        } else {
          i.symbol = '../../../assets/' + `${cryptoName.toLowerCase()}.svg`;
        }
      
      })
      this.cryptoInfos = data
      this.cryptoInfos = this.cryptoInfos.filter((i: any)=> !this.coinsNotSymbol.includes((i.name.toLowerCase())))
    })

  }

  navigateToDashboardCryptos() {
    this.router.navigate(['/crypto-infos'])
  }
}
