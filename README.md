# Módulos, Lazy Loading e Interceptors em Angular!

## O que são Módulos?
Os módulos são uma forma de agrupar componentes, diretivas, serviços, pipes/blocos de construção de uma aplicação de acordo com a área da aplicação na qual serão utilizados e também, uma forma de organizar e deixar cada parte de código mais enxuta, fácil de fazer manutenção ou de ser encontrada. 

É necessário agrupar tudo isso em um módulo para que o Angular fique ciente sobre as partes que 'montam' a aplicação. Isso, porque o Angular não escaneia automaticamente todos os arquivos da aplicação, e nem todo o código escrito, ele precisa saber quais são os blocos de construção e ele consegue saber disso através dos módulos.

Todo aplicativo Angular tem pelo menos um módulo, o app.module.ts. Uma aplicação angular não pode existir/funcionar sem pelo menos este módulo. O Angular analisa este módulo para entender a aplicação e suas características.

Além disso, não é possível utilizar algum recurso ou bloco de construção sem inclui-lo em um módulo da aplicação. A forma como são incluídos depende de qual característica da aplicação que este bloco de construção representa, se é um componente, um serviço, um outro módulo e assim por diante.

## Quando e como podem ser utilizados?

Dividir a aplicação em módulos é um pré-requisito para que posteriormente, seja possível utilizar alguns recursos de otimização. Mas antes disso, os módulos tornam uma aplicação mais organizada e fácil de encontrar, editar e manter algum componente/funcionalidade, isso pode ser muito útil em grandes aplicações.

Para que fique uma organização mais enxuta e que seja possível utilizar recursos de otimização, também é muito comum a criação de um módulo para rotemaento, onde será definida a configuração de rotas de um módulo X, mas vamos ver isso mais adiante.


Para entendermos como os módulos podem ser utilizados, primeiro vamos analisar o AppModule quando no estado inicial desta aplicação:

```javascript
@NgModule({
  declarations: [
    AppComponent,
    ValueCoinsComponent,
    GraphicComponent,
    ConversionDashboardComponent,
    CryptoInfosComponent,
    SpinnerComponent,
    ConvertActionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],  
  providers: [ {
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
```
O decorator @NgModule importado de @angular/core é o que define um módulo, recebendo um objeto em seu parâmetro para configurá-lo.Dentro de um módulo podem existir algumas propriedades que são matrizes/arrays; sendo eles: 

1 - Declarations: Onde é possível declarar os componentes, diretivas ou pipes personalizados utilizados em um módulo.

2 - Imports: Onde é possível importar outros módulos e de certa forma 'herdar' suas características, recursos e componentes.

3 - Exports: Onde é possível definir o que vai ser exportado de um módulo X para outro módulo Y que o importá-lo.

4 - Providers: Onde é possível definir serviços e interceptors.

5 - Bootstrap: É importante para iniciar a aplicação, ele define qual componente está disponível no index.html na raiz do projeto. Geralmente só existe o AppComponent, mas também é possível ter mais componentes, por isso, bootstrap também é um array. Mas isso não é muito comum, porque criaria diferentes arvores de componentes raiz em uma aplicação, e isso torna o trabalho entre componentes mais dificil. Geralmente, existe um único componente raiz e ele é adicionado ao bootstrap dentro do modulo principal da aplicação.

6 - entryComponents: Também existe essa propriedade, que serve para componentes criados de maneira dinâmica.

Da mesma forma, foram criados alguns outros módulos nesta aplicação:

```javascript
@NgModule({
    declarations: [
        ValueCoinsComponent,
        CryptoInfosComponent,
        GraphicComponent,
        ConversionDashboardComponent,     
        SpinnerComponent,
        ConvertActionComponent,
        HomeCoinsComponent
        // aqui podem ser declarados os componentes utilizados somente neste módulo
    ],
    imports: [
        CommonModule,
        FormsModule, // módulos que fornecem alguns recursos que são utilizados por componentes deste módulo
    ],
    exports: 
    [
        ValueCoinsComponent,
        CryptoInfosComponent,
        GraphicComponent,
        ConversionDashboardComponent,
        SpinnerComponent,
        ConvertActionComponent,
        HomeCoinsComponent
    ] //assim, qualquer módulo que importe o módulo home-coins poderá utilizar estes componentes  
})
export class HomeCoinsModule {

}
```

Este módulo é responsável pelos 'blocos de construção' de 'home-coins.component.html'. Visto que 'home-coins.component.html' foi renderizado em uma das rotas da aplicação definida em AppRoutingModule no estado inicial dessa aplicação:

```javascript
  {path: '', component: HomeCoinsComponent}
```

O módulo correspondente a este componente, o qual agrupa os componentes utilizados dentro dele, deve ser importado em AppModule:

```javascript

@NgModule({
  declarations: [
    AppComponent,
    // ValueCoinsComponent,
    // GraphicComponent,
    // ConversionDashboardComponent,
    // CryptoInfosComponent,     
    // SpinnerComponent,
    // ConvertActionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HomeCoinsModule, <---------------------------------------------------
    SharedModule
    
  ],
    ...
})
export class AppModule { }
```
Tudo em um módulo funciona de maneira autônoma, o que pode ser feito é exportar algo, como fizemos com os componentes em  'home-coins.module.ts' e depois importar esse módulo em outro módulo da mesma maneira que importamos HomeCoinsModule em AppModule, para que diferentes partes de diferentes módulos possam ser utilizados em conjunto.

Perceba que com isso, os componentes que fazem parte de 'home-coins.module.ts', não devem mais serem declarados em AppModule, pois estão sendo exportados em 'home-coins.module.ts', de maneira que o AppModule ao importar HomeCoinsModule também pode utilizá-los. E esta é uma regra muito importante, tudo que está disposto no array declarations, não pode estar em mais de um módulo.

Da mesma forma, se você tiver um componente dentro de outro, estes, devem fazer parte do mesmo módulo.

Nesta aplicação, foram criados dois módulos, o HomeCoinsModule e o CryptoCoinsModule. Ocorre que ambos, utilizam quase que os mesmos recursos e componentes. Quando há mais de um módulo na aplicação que vão utilizar os mesmos recursos e componentes, é possível criar um módulo compartilhado, o qual pode agrupar tudo isso e posteriormente, pode ser importado nos módulos que precisarão de tais recursos e componentes.

Foi criado um módulo compartilhado chamado SharedModule, o qual tem todos os recursos e componentes utilizados em HomeCoinsModule e CryptoCoinsModule:

```javascript
import { CommonModule } from '@angular/common';
import{ NgModule } from '@angular/core';
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
```




## Observações

1 - Os exemplos de código nos quais foram utilizados código de app.module.ts no início do tópico 'Quando e como podem ser utilizados?' representam o estado inicial de AppModule, antes de algumas mudanças serem feitas na aplicação.


## O que é Lazy Loading?


## Quando e como pode ser utilizado?


## Observações


## O que são interceptors?


## Quando e como podem ser utilizados?


## Observações