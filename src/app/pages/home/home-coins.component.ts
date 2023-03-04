import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home-coins.component.html',
  styleUrls: ['./home-coins.component.scss']
})
export class HomeCoinsComponent implements OnInit {

  flexDirectionColumn: boolean = false
  isLargeOrMedium: boolean = false
  isSmallorXsmall: boolean = false
  isLoading: boolean = false

  storeSubscription!: Subscription;

  constructor(private breakpointService: BreakpointObserver) {

  }

  ngOnInit() {
    // this.breakpointService.observe(Breakpoints.Small).subscribe((result)=> {

    //   this.flexDirection = ''
    //   if(result.matches){
    //     this.flexDirection = 'column'
    //   }
    // })

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
  }

}
