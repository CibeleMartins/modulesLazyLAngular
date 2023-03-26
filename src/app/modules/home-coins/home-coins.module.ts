import { NgModule } from '@angular/core';

import { HomeCoinsComponent } from './home-coins.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeCoinsRoutingModule } from './home-coins-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [

        HomeCoinsComponent
        // aqui poderiam ser declarados os componentes utilizados somente neste módulo
    ],
    imports: [
    
        HomeCoinsRoutingModule, //o módulo de rotas de rotas de home-coins
        SharedModule, // o módulo que compartilha componentes e recursos que são usados em HomeCoinsModule
    ],
    exports: 
    [
       
    ] //assim, qualquer módulo que importe o módulo home-coins poderá utilizar estes componentes
})
export class HomeCoinsModule {

}