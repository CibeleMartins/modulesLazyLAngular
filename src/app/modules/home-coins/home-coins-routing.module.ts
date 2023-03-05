import { NgModule } from "@angular/core";
import { HomeCoinsComponent } from "./home-coins.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {path: 'home', component: HomeCoinsComponent}
 ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class HomeCoinsRoutingModule {

}