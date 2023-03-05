import { NgModule } from "@angular/core";
import { CryptoCoinsComponent } from "./crypto-coins.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        CryptoCoinsComponent
    ],
    imports: [
        SharedModule
    ],
})
export class CryptoCoinsModule {

}