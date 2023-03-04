import { Component, Input, OnInit } from '@angular/core';
import { CoinService } from 'src/app/services/CoinService.service';

@Component({
  selector: 'app-value-coins',
  templateUrl: './value-coins.component.html',
  styleUrls: ['./value-coins.component.scss']
})
export class ValueCoinsComponent implements OnInit {

  // coins: CoinPrice[] | undefined;
 @Input() coinHighPrice!: string;
 @Input() coinLowPrice!: string;
 @Input() coinCode!: string;

  constructor(private coinService: CoinService) {}

  ngOnInit() {
  //   this.coinService.getCurrencyQuote().subscribe({
  //     next: (data) =>  {this.coins = data},
  //     error: (e) => console.error(e),
  //     complete: () => console.info('Requisição feita com sucesso!') 
  // })}
  }

}
