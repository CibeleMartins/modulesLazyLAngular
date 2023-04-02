import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, Colors, registerables } from 'chart.js';
import { CoinService } from 'src/app/services/CoinService.service';
import { Crypto, CryptoCoinService } from 'src/app/services/CryptoCoin.service';
@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements OnInit {
  @ViewChild('graphic', { static: true })
  refGraphic!: ElementRef;
  graphic: any = []
  graphicCryptos: any = []
  coinLabels: string[] = [];
  coinBuyValue: any[] = [];
  coinSaleValue: any[] = [];
  coinLowValue: string[] = [];
  coinHighValue: any[] = [];
  coinAvg: any[] = [];
  coinLastValueNegociate: string[] = [];
  coinVolNegociate24Hr: any[] = [];
  coinTimestamp: any[] = [];
  coinPercentageVariationValue: number[] = [];
  @Input() showCryptoInfos!: boolean;
  crypto2!: Crypto;
  arrayTeste!: Crypto[];
  constructor(private coinService: CoinService, private cryptoCoinService: CryptoCoinService) {
    Chart.register(...registerables, Colors);
    Chart.defaults.color = '#FFFF'
  }

  ngOnInit() {

    this.coinService.getCurrencyQuote().subscribe({
      next: (data) => {
       return data.map((i) => {
          this.coinLabels.push(i.code)
          this.coinBuyValue.push((parseFloat(i.buyValue.replace('R$', ''))))
          this.coinSaleValue.push((parseFloat(i.saleValue.replace('R$', ''))))
          this.coinPercentageVariationValue.push(i.percentageVariation)

        })
      },
      error: (e) => console.error(e),
      complete: () => {
        console.info('Requisição feita com sucesso!')
        return this.graphic = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.coinLabels,
            datasets: [
              {
                label: 'Valor de compra',
                data: this.coinBuyValue,
                borderColor: '#32F900',
                fill: false,

              },

              {
                label: 'Valor de venda',
                data: this.coinSaleValue,
                borderColor: '#6CC6CB',
                fill: false,
              },

              {
                label: 'Porcentagem de variação',
                data: this.coinPercentageVariationValue,
                borderColor: '#FF4500',
                fill: false,
              }
            ]
          },
          options: {
            scales: {
              y: {
                ticks: {
                  display: false,
                }
              }
            },
            responsive: true,
            maintainAspectRatio: false,
            showLine: true,
            plugins: {
              legend: {
                display: false,

              },

            }
          }
        })
      }
    })
  }

}





