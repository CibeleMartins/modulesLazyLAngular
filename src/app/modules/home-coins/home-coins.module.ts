import { NgModule } from '@angular/core';
// import { SharedModule } from 'src/app/shared/shared.module';
import { HomeCoinsComponent } from './home-coins.component';
import { ValueCoinsComponent } from 'src/app/components/value-coins/value-coins.component';
import { CryptoInfosComponent } from 'src/app/components/crypto-infos/crypto-infos.component';
import { GraphicComponent } from 'src/app/components/graphic/graphic.component';
import { ConversionDashboardComponent } from 'src/app/components/conversion-dashboard/conversion-dashboard.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ConvertActionComponent } from 'src/app/components/convert-action/convert-action.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeCoinsRoutingModule } from './home-coins-routing.module';

@NgModule({
    declarations: [
        ValueCoinsComponent,
        CryptoInfosComponent,
        GraphicComponent,
        ConversionDashboardComponent,
        SpinnerComponent,
        ConvertActionComponent,
        HomeCoinsComponent
        // aqui poderiam ser declarados os componentes utilizados somente neste módulo
    ],
    imports: [
        // SharedModule
        CommonModule,
        FormsModule,
        HomeCoinsRoutingModule //o módulo de rotas de home-coins

    ],
    exports: [ValueCoinsComponent,
        CryptoInfosComponent,
        GraphicComponent,
        ConversionDashboardComponent,
        SpinnerComponent,
        ConvertActionComponent,
        HomeCoinsComponent] //assim, qualquer módulo que importe o módulo home-coins poderá utilizar estes componentes
})
export class HomeCoinsModule {

}