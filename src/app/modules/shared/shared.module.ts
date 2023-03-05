import { CommonModule } from '@angular/common';
import{ NgModule }from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConversionDashboardComponent } from '../../components/conversion-dashboard/conversion-dashboard.component';
import { ConvertActionComponent } from '../../components/convert-action/convert-action.component';
import { CryptoInfosComponent } from '../../components/crypto-infos/crypto-infos.component';
import { GraphicComponent } from '../../components/graphic/graphic.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ValueCoinsComponent } from '../../components/value-coins/value-coins.component';


@NgModule({
    declarations: [
        ValueCoinsComponent,
        CryptoInfosComponent,
        GraphicComponent,
        ConversionDashboardComponent,
        SpinnerComponent,
        ConvertActionComponent,
    ],
    // os componentes que fazem parte deste módulo

    imports: [
        CommonModule,
        FormsModule
    ],
    // os módulos que importarem o SharedModule, poderão utilizar os recursos destes módulos importados aqui
    exports: [
        ValueCoinsComponent,
        CryptoInfosComponent,
        GraphicComponent,
        ConversionDashboardComponent,
        SpinnerComponent,
        ConvertActionComponent,
        CommonModule,
        FormsModule
    ] 
    // dessa maneira, os módulos que importarem o SharedModule, poderão utilizar estes componentes exportados aqui
})
export class SharedModule {

}