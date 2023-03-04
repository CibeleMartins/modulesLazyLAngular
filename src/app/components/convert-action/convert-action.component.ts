import { Component } from '@angular/core';
import { CoinService } from 'src/app/services/CoinService.service';

@Component({
  selector: 'app-convert-action',
  templateUrl: './convert-action.component.html',
  styleUrls: ['./convert-action.component.scss']
})
export class ConvertActionComponent {

  conversorIsShowing!:boolean;
  
  constructor(private coinService: CoinService){}

  ngOnInit() {
    this.coinService.displayDashboardConverter.subscribe((data)=> this.conversorIsShowing = data)
  }

  showConverter() {
    this.coinService.displayDashboardConverter.next(true)
  }
}
