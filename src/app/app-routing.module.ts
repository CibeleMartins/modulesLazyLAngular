import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', loadChildren: ()=> import('./modules/home-coins/home-coins.module').then(m => m.HomeCoinsModule)},
  {path: 'crypto-infos', loadChildren: ()=> import('./modules/crypto-coins/crypto-coins.module').then(m => m.CryptoCoinsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
