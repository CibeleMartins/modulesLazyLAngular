import { Component, OnInit } from '@angular/core';
import { CoinService } from 'src/app/services/CoinService.service';
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-conversion-dashboard',
  templateUrl: './conversion-dashboard.component.html',
  styleUrls: ['./conversion-dashboard.component.scss']
})
export class ConversionDashboardComponent implements OnInit{
  
  coinsConversionOption!: string[];
  displayConverter!: boolean;
  selectedCoinBase: string = 'BRL';
  selectedCoinConversion: string = 'USD'
  valueCoin!: string;
  result!: string;

  subjectSubscription!: Subscription;

  constructor(private coinService: CoinService) { }

  ngOnInit() {
    this.coinService.getLegendCoins().subscribe({
      next: (data) => { this.coinsConversionOption = data },
      error: (e) => console.error(e),
      complete: () => console.info('Requisição feita com sucesso!')
    })

    this.subjectSubscription = this.coinService.displayDashboardConverter.subscribe((data)=> {this.displayConverter = data})

    this.coinService.displayDashboardConverter.next(this.displayConverter)
  }

  closeConverter() {
    this.displayConverter = false
    this.coinService.displayDashboardConverter.next(this.displayConverter)
  }

  convert(valueCoin: string, coinBase: string, coinConversion: string) {

    if(coinBase === coinConversion || !valueCoin) {
      alert('Verifique o valor ou a moeda base e de conversão.')
    } else {
      this.coinService.convertCoins(parseFloat(valueCoin), coinBase, coinConversion).subscribe({
        next: (data: string) => { this.result = this.valueCoin + ' ' + this.selectedCoinBase + ' = ' + data + ' ' + this.selectedCoinConversion },
        error: (e: any) => console.error(e),
        complete: () => console.info('Requisição feita com sucesso!')
      })
    }

  }

  ngOnDestroy() {
    this.subjectSubscription.unsubscribe()
  }

}
