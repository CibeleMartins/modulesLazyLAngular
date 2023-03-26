import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { CoinService } from "./CoinService.service";

export interface CryptoInfo {
    symbol: string,
    name: string,
    buyValue: string,
    saleValue: string,
    priceVariationPercentage: number
}

@Injectable({ providedIn: 'root' })
export class CryptoCoinService {


    public cryptosInfos: any[] = [];
    private crypto!: CryptoInfo;

    constructor(private http: HttpClient, private coinService: CoinService) { }

    getCryptoInfos() {
        return this.http.get('https://api1.binance.com/api/v3/ticker/24hr').pipe(map((i) => {
            Object.values(i).filter((i) => i.symbol.includes('BRL') ? i : '').map((i) => {
                this.cryptosInfos.push(this.crypto = { symbol: '', name: i.symbol, buyValue: this.coinService.formatPricesInBRL(i.bidPrice), priceVariationPercentage: parseFloat( parseFloat(i.priceChangePercent).toFixed(2)), saleValue: this.coinService.formatPricesInBRL(i.askPrice)  })
            })
            console.log(this.cryptosInfos)
            return this.cryptosInfos
        }))
    }

    convertCryptos() {
        return this.http.get('https://api.exchangerate.host/convert?from=BRL&to=USD&source=crypto&amount=1').subscribe({
            next: (data)=> {console.log(data)},
            error: (e)=> console.log(e)
        })
    }

}