import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversionDashboardComponent } from './components/conversion-dashboard/conversion-dashboard.component';
import { HomeCoinsComponent } from './pages/home-coins/home-coins.component';

const routes: Routes = [
  {path: '', component: HomeCoinsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
