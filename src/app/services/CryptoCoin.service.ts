import { map } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { CoinService } from "./CoinService.service";

export interface CryptoInfo {
    symbol: string,
    name: string,
    buyValue: string,
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
                this.cryptosInfos.push(this.crypto = { symbol: '', name: i.symbol, buyValue: this.coinService.formatPricesInBRL(i.bidPrice), priceVariationPercentage: parseFloat( parseFloat(i.priceChangePercent).toFixed(2)) })
            })
            return this.cryptosInfos
        }))
    }

}