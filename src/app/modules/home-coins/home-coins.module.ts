import { NgModule } from '@angular/core';

import { HomeCoinsComponent } from './home-coins.component';
// import { ValueCoinsComponent } from 'src/app/components/value-coins/value-coins.component';
// import { CryptoInfosComponent } from 'src/app/components/crypto-infos/crypto-infos.component';
// import { GraphicComponent } from 'src/app/components/graphic/graphic.component';
// import { ConversionDashboardComponent } from 'src/app/components/conversion-dashboard/conversion-dashboard.component';
// import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
// import { ConvertActionComponent } from 'src/app/components/convert-action/convert-action.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeCoinsRoutingModule } from './home-coins-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        // ValueCoinsComponent,
        // CryptoInfosComponent,
        // GraphicComponent,
        // ConversionDashboardComponent,      {componentes que antes eram utilizados apenas neste módulo e 
                                                //  passaram a fazer parte do módulo compartilhado}
        // SpinnerComponent,
        // ConvertActionComponent,
        HomeCoinsComponent
        // aqui poderiam ser declarados os componentes utilizados somente neste módulo
    ],
    imports: [
        // CommonModule,
        // FormsModule,
        HomeCoinsRoutingModule, //o módulo de rotas de rotas de home-coins
        SharedModule, // o módulo que compartilha componentes e recursos que são usados em HomeCoinsModule

    ],
    exports: 
    [
        // ValueCoinsComponent,
        // CryptoInfosComponent,
        // GraphicComponent,
        // ConversionDashboardComponent,
        // SpinnerComponent,
        // ConvertActionComponent,
        // HomeCoinsComponent
    ] //assim, qualquer módulo que importe o módulo home-coins poderá utilizar estes componentes

    // depois de definir o módulo de roteamento de home-coins-module, já não é mais necessário exportar estes componentes,
    // porque a rota de HomeCoinsComponent que os utiliza está fundindo-se com a rota raiz da aplicação
    // com a utilização do método forChild(), assim, esses componentes antes exportados não são mais utilizados 
    // em nenhum outro lugar da aplicação (rota app-routing), sem a necessidade de exportá-los então
   
})
export class HomeCoinsModule {

}