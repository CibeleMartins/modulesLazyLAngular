import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, Subscription, map } from "rxjs";

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
    private crypto2!: Crypto;
    private cryptosArray!: Crypto[];

    constructor(private http: HttpClient, private coinService: CoinService) { }

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

    getCryptosFormatedValues() {

    }

  
}