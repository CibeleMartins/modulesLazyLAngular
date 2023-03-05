import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoinService } from 'src/app/services/CoinService.service';

@Component({
  selector: 'app-convert-action',
  templateUrl: './convert-action.component.html',
  styleUrls: ['./convert-action.component.scss']
})
export class ConvertActionComponent {

  conversorIsShowing!: boolean;
  @Input() navigateToCoinsDashboardAction!: boolean;
  @Input() isHide!: boolean;

  constructor(private coinService: CoinService, private router: Router) { }

  ngOnInit() {
    this.coinService.displayDashboardConverter.subscribe((data) => this.conversorIsShowing = data)

    if(this.isHide) {
      this.conversorIsShowing = true
    }
  }

  showConverter() {
    this.coinService.displayDashboardConverter.next(true)

    if(this.navigateToCoinsDashboardAction) {
      this.router.navigate(['home'])
    }
  }
}
