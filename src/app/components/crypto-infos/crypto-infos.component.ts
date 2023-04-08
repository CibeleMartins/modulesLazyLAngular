import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoCoinService } from 'src/app/services/CryptoCoin.service';

@Component({
  selector: 'app-crypto-infos',
  templateUrl: './crypto-infos.component.html',
  styleUrls: ['./crypto-infos.component.scss']
})
export class CryptoInfosComponent {

  cryptoInfos!: any;
  @Input() navigateToHome!: boolean;
  @Input() width!:string;
  @Input() background!:string;
  coinsNotSymbol: string[] = [
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
  ];

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
      console.log(this.cryptoInfos)
    })
   
  }

  navigateToDashboardCryptos() {
    this.router.navigate(['/crypto-infos'])
  }
}
