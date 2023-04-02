import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { Chart, Colors, registerables } from 'chart.js';
import { Crypto, CryptoCoinService } from 'src/app/services/CryptoCoin.service';

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
  crypto2!: Crypto;
  arrayTeste!: any[];
  graphicCryptos: any = [];
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
  graphicTest!: Chart;
  chart: any;
  @ViewChild('canvas') canvas!: ElementRef;

  constructor(private breakpointService: BreakpointObserver, private cryptoCoinService: CryptoCoinService, private renderer: Renderer2, @Inject(Document) private document: Document) {
    Chart.register(...registerables, Colors);
    Chart.defaults.color = '#FFFF'

  }
  private thisAsThat(callBack: Function) {
    const self = this;
    return () => {
      return callBack.apply(self, [this].concat(Array.prototype.slice.call(arguments)));
    };
  }

  ngOnInit() {


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


    this.cryptoCoinService.getCryptosAPI().subscribe({
      next: (data) => {
        console.log(data)
        this.arrayTeste = Object.values(data).map((i) => this.crypto2 = {
          market: {
            market: i.market,
            high: i.high,
            low: i.low,
            varHighLow: i.var,
            vol: i.vol,
            last: i.last,
            timestamp: i.timestamp,
            avg: i.avg,
            buy: i.buy,
            sell: i.sell,
          }
        })
        // .map((i)=> {
        //   this.coinLabels.push(i.market.market), //market
        //   this.coinBuyValue.push(i.market.buy), //buy
        //   this.coinSaleValue.push(i.market.sell), //sell
        //   this.coinPercentageVariationValue.push(i.market.varHighLow), //varHighlow
        //   this.coinAvg.push(i.market.avg), //avg
        //   this.coinHighValue.push(i.market.high), //high
        //   this.coinLowValue.push(i.market.low), //low
        //   this.coinLastValueNegociate.push(i.market.last), //last
        //   this.coinTimestamp.push(i.market.timestamp), //timestamp
        //   this.coinVolNegociate24Hr.push(i.market.vol) //vol
        // })
        console.log(this.arrayTeste)
        // console.log(this.coinLabels, //market
        // this.coinBuyValue, //buy
        // this.coinSaleValue, //sell
        // this.coinPercentageVariationValue, //varHighlow
        // this.coinAvg, //avg
        // this.coinHighValue, //high
        // this.coinLowValue, //low
        // this.coinLastValueNegociate, //last
        // this.coinTimestamp, //timestamp
        // this.coinVolNegociate24Hr) //vol)
      },
      error: (e) => console.log(e),
      complete: () => {
        console.log('Requisição API BIT Preço concluída com sucesso!')
        return this.graphicCryptos = new Chart('canvas-cryptos', {
          type: 'line',
          data: {
            labels: this.arrayTeste.map((i) => i.market.market),
            datasets: [
              {
                label: 'Valor de compra atual',
                data: this.arrayTeste.map((i) => i.market.buy),
                borderColor: '#32F900',
                fill: false,
                tension: 0.8,
                // parsing: {
                //   // xAxisKey: 'market.market',
                //   yAxisKey: 'market.buy',

                // }

              },

              {
                label: 'Valor de venda atual',
                data: this.arrayTeste.map((i) => i.market.sell),
                borderColor: '#6CC6CB',
                fill: false,
                tension: 0.8,
                // parsing: {
                //   // xAxisKey: 'market.market',
                //   yAxisKey: 'market.sell',

                // }
              },
              {
                label: 'Relação % entre o preço mais alto e o preço mais baixo nas últimas 24 horas',
                data: this.arrayTeste.map((i) => i.market.sell),
                borderColor: '#f0f',
                fill: false,
                tension: 0.8,
    
              },

              {
                label: 'Preço médio nas últimas 24 horas',
                data: this.arrayTeste.map((i) => i.market.avg),
                borderColor: '#808000',
                fill: false,
                tension: 0.8,
              },
              {
                label: 'Dia e horas que foram gerados estes valores',
                data: this.arrayTeste.map((i) => i.market.timestamp),
                borderColor: '#FFFAFA',
                fill: false,
                tension: 0.8,

              },

              {
                label: 'Volume negociado nas últimas 24h',
                data: this.arrayTeste.map((i) => i.market.vol),
                borderColor: '#6CC6CB',
                fill: false,
                tension: 0.8,
              },
              {
                label: 'Menor valor negociado nas últimas 24h',
                data: this.arrayTeste.map((i) => i.market.low),
                borderColor: '#ff0000',
                fill: false,
                tension: 0.8,
              },

              {
                label: 'Maior valor negociado nas últimas 24h',
                data: this.arrayTeste.map((i) => i.market.high),
                borderColor: '#FFFF00',
                backgroundColor: '#FFFF00',
                fill: false,
                tension: 0.8

              },
              {
                label: 'Último valor negociado',
                data: this.arrayTeste.map((i) => i.market.last),
                borderColor: '#32F900',
                fill: false,
                tension: 0.8
              },
            ],
          },
          options: {
            // parsing: {
            //   yAxisKey: 'market.buy',
            // },
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
              tooltip: {
                enabled: true,
                position: 'nearest',
                callbacks: {

                  // primeiro
                  beforeTitle: (tooltipItem) => {
                    console.log(tooltipItem)
                    let value = tooltipItem[0].chart.data.datasets.map((i, index) => index === 1 ? tooltipItem[0].chart.data.datasets[1].label + ': ' + i.data[tooltipItem[0].dataIndex] : 0).filter(i => i !== 0);
                    return "" + value;
                  },
                  // segundo
                  title: (tooltipItem) => {

                    let value = tooltipItem[0].chart.data.datasets.map((i, index) => index === 0 ? tooltipItem[0].chart.data.datasets[0].label + ': ' + i.data[tooltipItem[0].dataIndex] : 0).filter(i => i !== 0);
                    return "" + value;
                  },
                  // terceiro
                  afterTitle: (tooltipItem) => {
                    // console.log(tooltipItem)
                    let value = tooltipItem[0].chart.data.datasets.map((i, index) => index === 3 ? tooltipItem[0].chart.data.datasets[3].label + ': ' + i.data[tooltipItem[0].dataIndex] : 0).filter(i => i !== 0);
                    return "" + value;
                  },
                  // quarto
                  beforeBody: (tooltipItem) => {
                    // console.log(tooltipItem)
                    let value = tooltipItem[0].chart.data.datasets.map((i, index) => index === 2 ? tooltipItem[0].chart.data.datasets[2].label + ': ' + i.data[tooltipItem[0].dataIndex] : 0).filter(i => i !== 0);
                    return "" + value;
                  },

                  // penultimo
                  beforeFooter: (tooltipItem) => {
                    console.log(tooltipItem)
                    let value = tooltipItem[0].chart.data.datasets.map((i, index) => index === 7 ? tooltipItem[0].chart.data.datasets[7].label + ': ' + i.data[tooltipItem[0].dataIndex] : 0).filter(i => i !== 0);
                    return "" + value;
                  },
                  // ultimo
                  footer: (tooltipItem) => {
                    console.log(tooltipItem)
                    let value = tooltipItem[0].chart.data.datasets.map((i, index) => index === 8 ? tooltipItem[0].chart.data.datasets[8].label + ': ' + i.data[tooltipItem[0].dataIndex] : 0).filter(i => i !== 0);
                    return "" + value;
                  },

                  // quinto
                  beforeLabel: (tooltipItem) => {
                    // console.log(tooltipItem.dataset.label + ':' + tooltipItem.dataset.data[tooltipItem.dataIndex])
                    let value = tooltipItem.chart.data.datasets.map((i, index) => index === 5 ? tooltipItem.chart.data.datasets[5].label + ': ' + i.data[tooltipItem.dataIndex] : 0).filter(i => i !== 0);
                    // console.log(value)
                    return "" + value;

                  },
                  // sexto/dias e horas dos dados
                  label: (tooltipItem) => {

                    // console.log(tooltipItem)
                    let value = tooltipItem.chart.data.datasets.map((i, index) => index === 4 ? tooltipItem.chart.data.datasets[4].label + ': ' + i.data[tooltipItem.dataIndex] : 0).filter(i => i !== 0).filter(i => i !== 0);
                    return "" + value;

                  },
                  // menor valor negociado ultimas 24h
                  afterBody: (tooltipItem) => {
                    // console.log(tooltipItem.dataset.label + ':' + tooltipItem.dataset.data[tooltipItem.dataIndex])
                    let value = tooltipItem[0].chart.data.datasets.map((i, index) => index === 6 ? tooltipItem[0].chart.data.datasets[6].label + ': ' + i.data[tooltipItem[0].dataIndex] : 0).filter(i => i !== 0);
                    return "" + value;
                  }
                },


              }
            }
          }
        })
      }
    })

  }


  // getInformationForTooltip(indexInformationInGraphic: number, tooltipItem: any) {
  //   let value = tooltipItem.chart.data.datasets.map((i: TooltipModel<"line">, index: number) => index === indexInformationInGraphic ? tooltipItem.chart.data.datasets[indexInformationInGraphic].label  + ': ' + i.data[tooltipItem.dataIndex] : 0 );
  //   // // let value = this.dataPoints.map((dataPoint, index)=> dataPoint.chart.data.datasets.map(i => i.label + ': ' + i.data[tooltipItem.dataIndex]))
  //   return "" + value;

  // }



}
