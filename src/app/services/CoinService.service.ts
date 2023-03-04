import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";


export interface CoinPrice {
    code: string,
    highPrice: string,
    lowPrice: string,
    percentageVariation: number,
    saleValue: string,
    buyValue: string
}

@Injectable({ providedIn: 'root' })
export class CoinService {

    displayDashboardConverter = new Subject<boolean>()

    private usd!: CoinPrice;
    private eur!: CoinPrice;
    private btc!: CoinPrice;

    constructor(private http: HttpClient,) { }


    formatPricesInBRL(price: any) {

        const numberTwoDecimal = parseFloat(parseFloat(price).toFixed(2))
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numberTwoDecimal) 
    }

    getCurrencyQuote() {
        return this.http.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL').pipe(map((data: any) => {
            return [this.usd = {
                code: data.USDBRL.code,
                highPrice: this.formatPricesInBRL(data.USDBRL.high) ,
                lowPrice: this.formatPricesInBRL(data.USDBRL.low),
                percentageVariation: parseFloat(parseFloat(data.USDBRL.pctChange).toFixed(2)),
                saleValue: this.formatPricesInBRL(data.USDBRL.ask),
                buyValue:this.formatPricesInBRL(data.USDBRL.bid)            },

            this.eur = {
                code: data.EURBRL.code,
                highPrice: this.formatPricesInBRL(data.EURBRL.high),
                lowPrice: this.formatPricesInBRL(data.EURBRL.low),
                percentageVariation: parseFloat(parseFloat(data.EURBRL.pctChange).toFixed(2)),
                saleValue: this.formatPricesInBRL(data.EURBRL.ask),
                buyValue:this.formatPricesInBRL(data.EURBRL.bid)           },

            this.btc = {
                code: data.BTCBRL.code,
                highPrice: this.formatPricesInBRL(data.BTCBRL.high),
                lowPrice: this.formatPricesInBRL(data.BTCBRL.low),
                percentageVariation: parseFloat(parseFloat(data.BTCBRL.pctChange).toFixed(2)),
                saleValue: this.formatPricesInBRL(data.BTCBRL.ask),
                buyValue: this.formatPricesInBRL(data.BTCBRL.bid)          }
        ]
        }))
    }
    getLegendCoins() {
        return this.http.get('https://api.frankfurter.app/currencies').pipe(map((data) => {
            return Object.entries(data).map((i) => i[0])
        }))
    }

    convertCoins(valueCoin: number, coinBase: string, coinConversion: string) {
        return this.http.get(`https://api.frankfurter.app/latest?amount=${valueCoin}&from=${coinBase}&to=${coinConversion}`).pipe(map(data => {
            let result = Object.values(data)[3]
            return parseFloat(Object.values(result).toString()).toFixed(2)
        }))
    }
}