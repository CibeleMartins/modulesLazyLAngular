import { NgModule } from "@angular/core";
import { CryptoCoinsComponent } from "./crypto-coins.component";
import { SharedModule } from "../shared/shared.module";
import { CryptoCoinsRoutingModule } from "./crypto-coins-routing.module";

@NgModule({
    declarations: [
        CryptoCoinsComponent
    ],
    imports: [
        SharedModule,
        CryptoCoinsRoutingModule
    ],
    providers: []
})
export class CryptoCoinsModule {

}