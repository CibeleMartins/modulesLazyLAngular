import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CryptoCoinsComponent } from "./crypto-coins.component";

const routes: Routes = [
    {path: '', component: CryptoCoinsComponent}
 ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CryptoCoinsRoutingModule {

}