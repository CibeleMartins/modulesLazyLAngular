import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, Subscription, map } from "rxjs";
import { Chart, Colors, registerables } from 'chart.js';

import { CoinService } from "./CoinService.service";

export interface CryptoInfo {
    symbol: string,
    name: string,
    buyValue: string,
    saleValue: string,
    priceVariationPercentage: number
}

export interface Crypto {
    market: {
        market: number,
        high: number,
        low: number,
        varHighLow: string,
        vol: number,
        last: number,
        timestamp: string,
        avg: number,
        buy: number,
        sell: number,
    }
}
// high: maior valor negociado nas últimas 24h.
// low: menor valor negociado nas últimas 24h.
// var: variação entre o menor e maior valor (em porcentagem).
// vol: Volume negociado nas últimas 24h.
// last: Último valor negociado.
// timestamp: dia e horas que foram gerados estes valores.
// avg- Preço médio nas últimas 24 horas;
// var- Relação % entre o nosso preço mais alto e o nosso preço mais baixo nas últimas 24 horas;
// buy- Preço de compra atual;
// sell- Preço de venda atual;

@Injectable({ providedIn: 'root' })
export class CryptoCoinService {

    public cryptosInfos: any[] = [];
    private crypto!: CryptoInfo;
    crypto2!: Crypto;
    arrayTeste!: any[];
    graphicCryptos: any = [];


    constructor(private http: HttpClient, private coinService: CoinService) {
        Chart.register(...registerables, Colors);
        Chart.defaults.color = '#FFFF'
    }

    getCryptoInfos() {
        return this.http.get('https://api1.binance.com/api/v3/ticker/24hr').pipe(map((i) => {
            Object.values(i).filter((i) => i.symbol.includes('BRL') ? i : '').map((i) => {
                this.cryptosInfos.push(this.crypto = { symbol: '', name: i.symbol, buyValue: this.coinService.formatPricesInBRL(i.bidPrice), priceVariationPercentage: parseFloat(parseFloat(i.priceChangePercent).toFixed(2)), saleValue: this.coinService.formatPricesInBRL(i.askPrice) })
            })
            // console.log(this.cryptosInfos)
            return this.cryptosInfos
        }))
    }

    getCryptosAPI() {
        return this.http.get('https://api.bitpreco.com/all-brl/ticker')
    }

    getGraphicCrytos() {
        this.getCryptosAPI().subscribe({
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
            },
            error: (e) => { console.log(e) },
            complete: () => {
                return this.graphicCryptos = new Chart('canvas-cryptos', {
                    type: 'line',
                    data: {
                        labels: this.arrayTeste.map((i) => i.market.market),
                        datasets: [
                            {
                                label: 'Valor de compra atual',
                                data: this.arrayTeste.map((i) => this.coinService.formatPricesInBRL(i.market.buy)),
                                borderColor: '#32F900',
                                tension: 0.8,
                            },

                            {
                                label: 'Valor de venda atual',
                                data: this.arrayTeste.map((i) => this.coinService.formatPricesInBRL(i.market.sell)),
                                // borderColor: '#6CC6CB',
                                // backgroundColor: '#6CC6CB',
                                tension: 0.8,
                            },
                            {
                                label: 'Relação % entre o preço mais alto e o preço mais baixo nas últimas 24 horas',
                                data: this.arrayTeste.map((i) => parseFloat(i.market.varHighLow).toFixed(2)),
                                borderColor: '#f0f',
                                backgroundColor: '#f0f',
                                tension: 0.8,
                            },

                            {
                                label: 'Preço médio nas últimas 24 horas',
                                data: this.arrayTeste.map((i) => this.coinService.formatPricesInBRL(i.market.avg)),
                                // borderColor: '#808000',
                                // backgroundColor: '#808000',
                                tension: 0.8,
                            },
                            {
                                label: 'Dia e horas que foram gerados estes valores',
                                data: this.arrayTeste.map((i) => i.market.timestamp),
                                borderColor: '#f0f',
                                backgroundColor: '#f0f',
                                tension: 0.8,


                            },

                            {
                                label: 'Volume negociado nas últimas 24h',
                                data: this.arrayTeste.map((i) => this.coinService.formatPricesInBRL(i.market.vol)),
                                // borderColor: '#6CC6CB',
                                // backgroundColor: '#6CC6CB',
                                tension: 0.8,
                            },
                            {
                                label: 'Menor valor negociado nas últimas 24h',
                                data: this.arrayTeste.map((i) => this.coinService.formatPricesInBRL(i.market.low)),
                                // borderColor: '#ff0000',
                                // backgroundColor: '#ff0000',
                                tension: 0.8,
                            },

                            {
                                label: 'Maior valor negociado nas últimas 24h',
                                data: this.arrayTeste.map((i) => this.coinService.formatPricesInBRL(i.market.high)),
                                // borderColor: '#FFFF00',
                                // backgroundColor: '#FFFF00',
                                tension: 0.8

                            },
                            {
                                label: 'Último valor negociado',
                                data: this.arrayTeste.map((i) => this.coinService.formatPricesInBRL(i.market.last)),
                                // borderColor: '#32F900',
                                tension: 0.8
                            },
                        ],
                    },
                    options: {
                        scales: {

                            y: {
                                grid: {
                                    display: false
                                },
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
                                        // console.log(tooltipItem)
                                        let value = tooltipItem[0].chart.data.datasets.map((i, index) => index === 1 ? tooltipItem[0].chart.data.datasets[1].label + ': ' + i.data[tooltipItem[0].dataIndex] : 0).filter(i => i !== 0);
                                        return "" + value;
                                    },
                                    // segundo
                                    title: (tooltipItem) => {
                                        console.log(tooltipItem)
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
                                        // console.log(tooltipItem)
                                        let value = tooltipItem[0].chart.data.datasets.map((i, index) => index === 7 ? tooltipItem[0].chart.data.datasets[7].label + ': ' + i.data[tooltipItem[0].dataIndex] : 0).filter(i => i !== 0);
                                        return "" + value;
                                    },
                                    // ultimo
                                    footer: (tooltipItem) => {
                                        // console.log(tooltipItem)
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
}