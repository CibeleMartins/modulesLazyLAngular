# Módulos, Lazy Loading e Interceptors em Angular!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

<p align="center">
    <img src='./src/assets/angular_typescript.png' alt="Logo" width="500">
  <p align="center">
     Sumário
      <p align="center">
        <a href="#o-que-são-módulos"> O que são Módulos? </a> |
        <a href="#quando-e-como-podem-ser-utilizados"> Quando e como podem ser utilizados? </a> |
        <a href="#módulos-de-roteamento"> Módulo de Roteamento </a> |
        <a href="#módulo-compartilhado"> Módulo Compartilhado</a> |
         <a href="#como-utilizar-subjects"> Módulo core </a> |
        <a href="#observações-sobre-módulos"> Observações sobre Módulos</a> |
        <a href="#conclusão-módulos"> Conclusão Módulos </a>
        <a href="#o-que-é-lazy-loading"> O que é Lazy Loading? </a> |
        <a href="#quando-e-como-pode-ser-utilizado"> Quando e como pode ser utilizado? </a> |
        <a href="#observações-sobre-lazy-loading"> Observações sobre Lazy Loading </a> |
          <a href="#conclusão-lazy-loading"> Conclusão Lazy Loading</a> |
        <a href="#módulos-e-serviços"> Módulos e Serviços</a> |
          <a href="#conclusão-módulos-e-serviços"> Conclusão Módulos e Serviços</a> |
         <a href="#o-que-são-interceptors"> O que são Interceptors</a> |
        <a href="#quando-e-como-podem-ser-utilizados"> Quando e como podem ser utilizados? </a> |
        <a href="#observações-sobre-módulos"> Observações sobre Interceptors</a> |
        <a href="#conclusão"> Conclusão</a>            
       <br />
        <br />
     <h1 align="center"></h1>
    </p>
</p>

## O que são Módulos?
Os módulos são uma forma de agrupar componentes, diretivas, serviços, pipes/'blocos de construção' de uma aplicação de acordo com a área da aplicação na qual serão utilizados e também, uma forma de organizar e deixar cada parte de código mais enxuta, fácil de fazer manutenção ou de ser encontrada. 

É necessário agrupar tudo isso em um módulo para que o Angular fique ciente sobre as partes que 'montam' a aplicação. Isso, porque o Angular não escaneia automaticamente todos os arquivos da aplicação, e nem todo o código escrito, ele precisa saber quais são os blocos de construção e ele consegue saber disso através dos módulos.

Todo aplicativo Angular tem pelo menos um módulo, o app.module.ts. Uma aplicação angular não pode existir/funcionar sem pelo menos este módulo. O Angular analisa este módulo para entender a aplicação e suas características.

Além disso, não é possível utilizar algum recurso ou bloco de construção sem inclui-lo em um módulo da aplicação. A forma como são incluídos depende de qual característica da aplicação que um 'bloco de construção' representa, se é um componente, um serviço, um outro módulo e assim por diante.

## Quando e como podem ser utilizados?
Dividir a aplicação em módulos é um pré-requisito para que posteriormente, seja possível utilizar alguns recursos de otimização. Mas antes disso, os módulos tornam uma aplicação mais organizada e fácil de encontrar, editar e manter algum componente/funcionalidade, isso pode ser muito útil em grandes aplicações.

Para que fique uma organização mais enxuta e que seja possível utilizar recursos de otimização, também é muito comum a criação de um módulo de rotemaento, onde pode ser definida a configuração de rotas de um módulo X, mas vamos ver isso mais adiante.

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
  ],// Aqui podem ser declarados os componentes utilizados somente neste módulo
  imports: [
    CommonModule,
    FormsModule, 
  ],// Módulos que fornecem alguns recursos que são utilizados por componentes deste módulo
  exports: [
    ValueCoinsComponent,
    CryptoInfosComponent,
    GraphicComponent,
    ConversionDashboardComponent,
    SpinnerComponent,
    ConvertActionComponent,
    HomeCoinsComponent
  ] // Assim, qualquer módulo que importe o módulo HomeCoinsModule pod utilizar estes componentes  
})
export class HomeCoinsModule {}
```
Este módulo é responsável pelos 'blocos de construção' de 'HomeCoinsModule.coment.html'. Visto que no estado inicial dessa aplicação 'HomeCoinsModule.coment.html' foi renderizado em uma das rotas da aplicação definida em AppRoutingModule, conforme abaixo:

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
    HomeCoinsModule, <---------
  ],
    ...
})
export class AppModule { }
```
Tudo em um módulo funciona de maneira autônoma, o que pode ser feito é exportar algo, como fizemos com os componentes em  'HomeCoinsModule.mod.ts' e depois importar esse módulo em outro módulo da mesma maneira que importamos HomeCoinsModule em AppModule. Isso pode ser feito para que diferentes partes de diferentes módulos possam ser utilizados em conjunto.

Perceba que com isso, os componentes que fazem parte de 'HomeCoinsModule.mod.ts', não devem mais serem declarados em AppModule, pois estão sendo exportados em 'HomeCoinsModule.mod.ts', de maneira que o AppModule ao importar HomeCoinsModule também pode utilizá-los. E esta é uma regra muito importante, tudo que está disposto no array declarations, não pode estar em mais de um módulo.

```javascript
...
// AppModule
declarations: [
    AppComponent,
    // ValueCoinsComponent,
    // GraphicComponent,
    // ConversionDashboardComponent,
    // CryptoInfosComponent,     
    // SpinnerComponent,
    // ConvertActionComponent,
],
...
// HomeCoinsModule
declarations: [
    ValueCoinsComponent,
    CryptoInfosComponent,
    GraphicComponent,
    ConversionDashboardComponent,     
    SpinnerComponent,
    ConvertActionComponent,
    HomeCoinsComponent
],
...
```
Da mesma forma, se você tiver um componente dentro de outro, estes, devem fazer parte do mesmo módulo.

## Módulo de Roteamento
Como dito anteriormente, é muito comum a criação de módulos de roteamento para definir rotas de um módulo específico. Neste projeto por exemplo, o HomeCoinsModule tem um módulo de roteamento. Com isso, ao invés de dispor HomeCoinsComponent no arquivo de rotas da aplicação AppRoutingModule, isso é feito no módulo de rotas de HomeCoinsModule:

```javascript
import { NgModule } from "@angular/core";
import { HomeCoinsComponent } from "./HomeCoinsModule.coment";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {path: 'home', component: HomeCoinsComponent}
 ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class HomeCoinsRoutingModule {}
```
Com isso já não é mais necessário exportar os componentes que estão dispostos dentro de HomeCoinsComponent através do seu módulo HomeCoinsModule:

```javascript
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeCoinsRoutingModule } from './HomeCoinsModule-roug.module';
import { SharedModule } from '../shared/shared.module';
import { ValueCoinsComponent } from 'src/app/components/value-coins/value-coins.component';
import { CryptoInfosComponent } from 'src/app/components/crypto-infos/crypto-infos.component';
import { GraphicComponent } from 'src/app/components/graphic/graphic.component';
import { ConversionDashboardComponent } from 'src/app/components/conversion-dashboard/conversion-dashboard.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ConvertActionComponent } from 'src/app/components/convert-action/convert-action.component';

@NgModule({
  declarations:[
    ValueCoinsComponent,
    CryptoInfosComponent,
    GraphicComponent,
    ConversionDashboardComponent,     
    SpinnerComponent,
    ConvertActionComponent,
    HomeCoinsComponent
  ], // Aqui poderiam ser declarados os componentes utilizados somente neste módulo
  imports: [
    CommonModule,
    FormsModule,
    HomeCoinsRoutingModule, // O módulo de rotas de rotas de HomeCoinsModule
    SharedModule, // O módulo que compartilha componentes e recursos que são usados em HomeCoinsModule
  ],
  exports:[
    // ValueCoinsComponent,
    // CryptoInfosComponent,
    // GraphicComponent,
    // ConversionDashboardComponent,
    // SpinnerComponent,
    // ConvertActionComponent,
    // HomeCoinsComponent
    ] // Depois de definir o módulo de roteamento de HomeCoinsModule, já não é mais necessário exportar estes //componentes, porque a rota de HomeCoinsComponent que os utiliza está fundindo-se com a rota raiz da aplicação com a utilização do método forChild(), assim, esses componentes antes exportados não são mais utilizados em nenhum outro lugar da aplicação (AppRoutingModule), sem a necessidade de exportá-los então
})
export class HomeCoinsModule {}
```
Na rota do módulo de roteamento principal da aplicação AppRoutingModule deve ficar assim:

```javascript
{path: '', pathMatch: 'full', redirectTo: '/home'},
```
Sem a necessidade de definir a rota para o HomeCoinsComponent, visto que agora, com a utilização do RouterModule e o método .forChild() no módulo de roteamento deste componente, a rota que o renderiza é fundida com a rota raiz da aplicação.

Além disso, criar um módulo de roteamento para um módulo da aplicação é parte do pré-requisito para que seja possível aplicar um dos recursos de otimização.

## Módulo Compartilhado
Nesta aplicação, foram criados dois módulos, o HomeCoinsModule e o CryptoCoinsModule. Ocorre que ambos, utilizam quase que os mesmos recursos e componentes. Quando há mais de um módulo na aplicação que vão utilizar os mesmos recursos e componentes, é possível criar um módulo compartilhado, o qual pode agrupar tudo isso e posteriormente, pode ser importado nos módulos que precisarão de tais recursos e componentes.

Foi criado um módulo compartilhado chamado SharedModule, o qual tem todos os recursos e componentes utilizados em HomeCoinsModule e CryptoCoinsModule:

```javascript
import { CommonModule } from '@angular/common';
import{ NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConversionDashboardComponent } from '../../components/conversion-dashboard/conversion-dashboard component';
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
  ],// Os componentes que fazem parte deste módulo
  imports: [
    CommonModule,
    FormsModule
  ], // Os módulos que importarem o SharedModule, poderão utilizar os recursos destes módulos importados aqui
  exports: [
    ValueCoinsComponent,
    CryptoInfosComponent,
    GraphicComponent,
    ConversionDashboardComponent,
    SpinnerComponent,
    ConvertActionComponent,
    CommonModule,
    FormsModule
  ] // Dessa maneira, os módulos que importarem o SharedModule, poderão utilizar estes componentes exportados aqui
})
export class SharedModule {}
```
A ideia é delcarar e importar neste módulo qualquer coisa que pode ser utilizada por outros módulos, mas como cada módulo funciona de maneira autônoma, para disponibilizar essas coisas em outros módulos, também é preciso exportá-las. Posteriormente, importamos SharedModule em HomeCoinsModule e CryptoCoinsModule:

```javascript
import { NgModule } from '@angular/core';
import { HomeCoinsComponent } from './HomeCoinsModule.coment';
// import { ValueCoinsComponent } from 'src/app/components/value-coins/value-coins.component';
// import { CryptoInfosComponent } from 'src/app/components/crypto-infos/crypto-infos.component';
// import { GraphicComponent } from 'src/app/components/graphic/graphic.component';
// import { ConversionDashboardComponent } from 'src/app/components/conversion-dashboard/conversion-dashboard.component';
// import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
// import { ConvertActionComponent } from 'src/app/components/convert-action/convert-action.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeCoinsRoutingModule } from './HomeCoinsModule-roug.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations:[
    // ValueCoinsComponent,
    // CryptoInfosComponent,
    // GraphicComponent,
    // ConversionDashboardComponent, //Componentes que antes eram utilizados apenas neste módulo e passaram a fazer parte do módulo compartilhado
    // SpinnerComponent,
    // ConvertActionComponent,
    HomeCoinsComponent
    ],// Aqui ainda poderiam ser declarados os componentes utilizados somente neste módulo ainda
  imports: [
    // CommonModule,                
    // FormsModule,
    HomeCoinsRoutingModule, //O módulo de rotas de rotas de HomeCoinsModule
    SharedModule, //O módulo que compartilha componentes e recursos que são usados em HomeCoinsModule

  ],
  ...
})
export class HomeCoinsModule {}
```
```javascript
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
})
export class CryptoCoinsModule {}
```
Dessa maneira, as características que estiveram presentes em mais de um módulo, funcionam de maneira compartilhada, além de ajudar a evitar a repetição de código e ter módulos mais enxutos.

## Módulo Core
Nessa aplicação ainda não foi implementado um módulo core, mas além dos módulos e dos módulos compartilhados, existe este terceiro 'tipo' de módulo. Todos esses módulos são criados da mesma forma, com o decorator @NgModule. O que os difere, é o que colocamos lá e como os usamos.

O CoreModule, pode ser usado, por exemplo, para mover e agrupar serviços que antes, foram importados no array providers de AppModule. Se os serviços foram implementados ​​com @Injetable({providedIn: 'root'}), conforme essa documentação sobre [Serviços](https://github.com/CibeleMartins/angularServices) orienta, um CoreModule apenas para os serviços não seria necessário, mas caso contrário, sim. No caso do uso de Interceptors por exemplo, também poderiam ser movidos para o array providers de um CoreModule deixando o AppModule mais 'clean', o que centralizaria os recursos essenciais da aplicação em um único módulo.

## Observações sobre Módulos
Tem alguns recursos que fazem parte de alguns módulos que são importados no módulo principal de uma aplicação (app.module.ts). Como por exemplo, o ngFor, ngIf que são disponibilizados pelo BrowserModule. Ocorre que este BrowserModule deve ser importado apenas uma vez, porque além de trazer os recursos/diretivas nfIf e ngFor, também faz um trabalho geral na aplicação que deve ser executado uma vez. Para que seja possível ter acesso a recursos deste módulo sem precisar importá-lo mais de uma vez, deve ser utilizado CommonModule em outros módulos da aplicação que precisem de tais recursos.

O FormsModule tem uma matriz de declarations dentro dele, com todas as diretrizes e recursos relacionados a formulários. Para que não seja necessário importar cada recurso relacionado a formulários na matriz declarations do app.module.ts, ou até mesmo o FormsModule na matriz de imports de app.module.ts, importamos o FormsModule na matriz imports dos módulos criados na aplicação.

O HttpClientModule é uma exceção, porque ele só fornece serviços, não diretrizes e componentes. Sendo assim, os recursos desse módulo funcionam de maneira ampla mesmo que importado apenas no módulo principal da aplicação 'app.module.ts'. Os serviços deste módulo funcionam em qualquer outro módulo que não o tenha importado.

É possível importar um módulo em diferentes módulos, tudo bem repetir módulos em diferentes arrays de imports, mas as declarações/declarations (componentes) não podem ser definidas em diferentes módulos. O que pode ser feito, é exportar o componente dentro do módulo dele, e então, importe o módulo dele no módulo que precisa desse componente, ou use um módulo compartilhado que tenha esse componente e o disponibilize em diferentes módulos.

A única exceção são os serviços. Estes devem ser configurados apenas uma vez e então, podem ser usados ​​em toda a aplicação.

## Conclusão Módulos
A separação de áreas e recursos de uma aplicação em múltiplos módulos pode tornar a aplicação mais organizada e os códigos mais enxutos e centralizados, o que também torna a manutenção mais fácil.

Além disso e, novamente, essa é a forma pela qual o Angular consegue saber quais são sa partes e características que constroem a aplicação e esse tipo de prática é quase um pré-requisito para aplicar um recurso muito importante de otimização.

Esse recurso é muito utilizado em aplicações maiores, mas a nível de exemplificação foi aplicado na aplicação desta documentação, segue no próximo tópico.

## O que é Lazy Loading?
É um recurso que utiliza o carregamento lento para ajudar a carregar apenas a seção/módulo necessário, e atrasa o restante, até que seja necessário para o usuário.

Imagine que você tem duas rotas em sua aplicação e em cada uma delas é carregado um  módulo, quando uma delas é visitada o módulo correspondente é carregado. Quando não utilizamos módulos, sempre que visitamos qualquer página, carregamos tudo.

O que faz mais sentido e é feito com Lazy Loading, é carregar o código que pertence a uma determinada área da aplicação, somente quando esta área for acessada.

## Quando e como pode ser utilizado?
Se tratando de aplicações maiores isso pode ajudar muito no desempenho, porque inicialmente é baixado um pacote de código menor e de acordo com a demanda, são 'baixados/disponibilizados' mais módulos/código. Com isso, o tempo de inicialização da aplicação diminui.

Mas é claro que, o Lazy Loading faz muito mais sentido se aplicado em módulos que representam áreas da aplicação nas quais o usuário acessa com menor frequência, pois evitaria o carregamento desses módulos sem necessidade, sem o usuário precisar deles, caso contrário, pode implicar em uma certa desvantagem que veremos mais adiante.

Como dito anteriormente, criar um módulo de roteamento para cada módulo da aplicação é um requisito para implementação do Lazy Loading, o primeiro passo é ir até o módulo de roteamento do módulo o qual será carregado com Lazy Loading e deixar o path/caminho da rota pai, vazio: 

```javascript
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CryptoCoinsComponent } from "./crypto-coins.component";

const routes: Routes = [
    {path: '', component: CryptoCoinsComponent} <--------
 ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CryptoCoinsRoutingModule {

}
```

Após isso, no módulo de roteamento da aplicação deve ser declarada uma nova rota da seguinte maneira:

```javascript
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', loadChildren: ()=> import('./modules/HomeCoinsModule/HominsModule.mod').then(m => m.HomeCoinsModule)},
  {path: 'crypto-infos', loadChildren: ()=> import('./modules/crypto-coins/crypto-coins.module').then(m => m.CryptoCoinsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
Este exemplo acima é todo o arquivo de rotas do módulo principal da aplicação, mas perceba que:

```javascript
 {path: 'crypto-infos', loadChildren: ()=> import('./modules/crypto-coins/crypto-coins.module').then(m => m.CryptoCoinsModule)}
```
1 - O módulo o qual deseja utilizar Lazy Loading não recebe a propriedade 'component';

2 - Ele recebe 'loadChildren', que é uma propriedade especial, e quando inserida o Angular entende como uma 
política que carrega apenas o conteúdo de código/módulo apontado quando o usuário visitar o caminho definido em 'path';

3 - Em versões mais recentes é utilizada uma arrow function e no corpo da função é chamado o import de maneira dinamica e passa o caminho do módulo a ser carregado em seu parâmetro. Essa maneira de importação, conforme a [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) orienta:

""...uma expressão semelhante a uma função que permite carregar um módulo ECMAScript de forma assíncrona e dinâmica... as importações dinâmicas são avaliadas apenas quando necessário e permitem maior flexibilidade sintática.""

Por isso foi o utilizado o then() para lidar com essa importação, pois se trata de uma tarefa assíncrona.

4 - Em versões mais antigas do Angular, o caminho para o módulo que deve ser carregado pode ter uma sintaxe um pouco diferente dessa:

```javascript
{path: 'home', loadChildren:'./modules/crypto-coins/crypto-coins.module#CryptoCoinsModule'} 
```

De ambas as formas, se utilizadas em versões compatíveis do Angular, tudo que existe dentro deste módulo será colocado em um pacote de códigos separado, que será baixado de acordo com a demanda, assim que o usuário visitar essa rota da aplicação.

Mas depois de definir o Lazy Loading é necessário ir até o módulo principal da aplicação, em AppModule, e fazer a seguinte alteração:

```javascript
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeCoinsModule } from './modules/HomeCoinsModule/HominsModule.mod';
import { LoadingInterceptor } from './services/loading.interceptor';
import { SharedModule } from './modules/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    // HomeCoinsModule,  <------------- REMOVER A IMPORTAÇÃO DOS MÓDULOS AGORA CARREGADOS COM LAZY LOADING
    //CryptoCoinsModule  <------------- REMOVER A IMPORTAÇÃO DOS MÓDULOS AGORA CARREGADOS COM LAZY LOADING
    SharedModule
    
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Dessa forma você 'desativa' o carregamento padrão e diz ao Angular para carregar de maneira 'lenta' esses módulos da aplicação. Caso não seja feita essa alteração, provavelmente o Angular emitirá um erro, porque não faz sentido utilizar as duas formas de carregamento ao mesmo tempo.

Um ponto muito importante que deve ser levado em consideração é que se você tem um módulo que representa uma área da aplicação na qual o usuário acessa com mais frequência, e neste, aplicar o Lazy Loading, isso pode implicar em uma certa desvantagem e pode não valer a pena.

O Lazy Loading faz um 'download extra' de pacote de código, o que mais tarde pode causar uma pequena lentidão na sua aplicação se tratando de áreas que o usuário pode acessar com mais frequência, pois esse código precisa ser baixado após o usuário acessar a rota, ele não é baixado com o carregamento de qualquer outra rota da aplicação, isso é de certa forma 'adiado' com a utilização de carregamento lento. Quanto maior o módulo e mais lenta a conexão com a internet mais longo será o atraso para fazer download de um pacote.

Para contornar isso existem mais estratégias que podem ser aplicadas na rota raiz da aplicação para otimizar ainda mais o carregamento dos módulos, como por exemplo:

```javascript
@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})], <----------
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
Dessa maneira, o roteador AppRoutingModule é configurado com uma estratégia de pré-carregamento. Pré-carregar módulos que utilizam o Lazy Loading, é quase como fazer um pré-carregamento do Lazy Loading para evitar esse atraso em áreas da aplicação que o usuário acessa com mais frequência e que está sendo utilizado o 'carregamento lento'.

Quando o usuário solicita o carregamento de um modulo acessando uma rota, este, já foi pré-carregado. A vantagem é que o download de pacote inicial da aplicação ainda é pequeno, fazendo com que o carregamento inicial seja rápido, mas quando o usuário está navegando entre páginas, carregamos previamente alguns pacotes para diminuir o atraso que pode ser gerado pelo download do pacote. Assim tanto o carregamento inicial, como carregamentos subsequentes ficam mais ágeis.
## Observações sobre Lazy Loading
É possível definir suas prórpias 'regras' de pré-carregamento de módulos.

## Conclusão Lazy Loading
Use Lazy Loading em suas aplicações Angular e seja feliz!!

## Módulos e Serviços
Você deve estar se perguntando porque este tópico não ficou junto com os módulos lá em cima, mas, para entender sobre serviços e módulos, era preciso primeiro entender módulos e Lazy Loading.

É possível fornecer serviços em AppModule, bem como em outros componentes da aplicação, módulos com carregamento padrão, com Lazy Loading e também adicionando a configuração de injetá-los na raiz conforme essa documentação sobre [Serviços](https://github.com/CibeleMartins/angularServices) orienta.

Quando fornecems serviços em AppModule ou com a configuração de injetá-los na raiz da aplicação, eles ficam amplamente disponíveis, ou seja, você trabalha com a mesma instância de um serviço em toda aplicação.

Quando um serviço é injetado apenas a nível de um componente, há uma única instância daquele serviço para aquele componente e, para os seus filhos se houverem. Se utilizar o serviço em uma outra árvore de componentes, então será uma outra instância deste serviço p/ esta árvore de componentes. Nesse caso, o injetor usado é o injetor específico do componente, não o raiz.

O interessante é que se você adicionar um serviço em providers de um módulo com carregamento padrão, ele não estará disponível somente naquele módulo, porque se o carregamento é feito de maneira padrão tudo é carregado quando acessamos a primeira rota da aplicação, então tudo é agrupado e disponibilizado em toda aplicação. Sendo assim, adicionar um serviço ao providers de um módulo com carregamento padrão é o mesmo que faze-lo em providers de AppModule ou como injetar o serviço diretamente na raiz, isso porque aqui o responsável por isso também é o injetor raiz do Angular.

Há uma diferença se você adicionar um serviço ao providers de um módulo carregado com Lazy Loading. Dessa maneira o serviço fica disponível apenas naquele módulo e ele recebe uma única instância desse serviço para utilizar em seus componentes. Nesse caso, um injetor filho é criado pelo Angular.

É claro que se você fornecer uma instância desse serviço em AppModule e em um módulo Lazy Loading, ele ficará disponível em toda aplicação, mas terá uma outra intância dele no módulo carregado com Lazy Loading. As vezes isso pode ser necessário, mas em outros casos pode gerar um comportamento estranho.

## Conclusão Módulos e Serviços
Portanto, serviços devem sempre utilizar o injetor raiz em AppModule ou utilizar a configuração em @Injectable. Claro que nos casos em que houver necessidade de injetar um serviço apenas em uma árvore de componentes isso pode ser feito, mas injetar serviços em módulos com carregamento padrão por exemplo, deve ser evitado, porque é o mesmo que faze-lo em AppModule. Nos casos dos módulos carregados com Lazy Loading, você pode injetar serviços mas faça isso quando tiver certeza que deseja ter uma intância separada desse serviço lá.

## O que são Interceptors?
Em palavras simples, eu diria que é um recurso muito útil do Angular que como o próprio nome indica, nos permite interceptar as requisições feitas na aplicação, ou seja, antes que a requisição termine e um pouco antes da resposta é possível executar algum código e até memso interagir com o objeto da requisição e o seu retorno.

## Como e quando podem ser utilizados?
Podem ser utilizados em cenários nos quais é necessário fazer requisições em uma aplicação, mas tem algumas coisas que precisam ser enviadas nessas requisições e você não quer repetir isso em todas elas. Ou no caso da aplicação de exemplo, que a cada requisição deve ser exibido um componente de loading.

Para criar um interceptor você deve criar um arquivo '.interceptor.ts'o qual deve contar uma classe e essa classe deve implementar a interface 'HttpInterceptor', que pode ser importada de '@angular/common/http', veja um exemplo: 

```javascript
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor() {}
}

```

Essa interface faz com que seja necessário implementar um método de interceptação, o qual recebe dois parâmetros:

```javascript
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  
  }
}
```

1 - É um objeto de requisição, que lógicamente deve ser tipado com HttpRequest que é um tipo genérico, então entre '<>' você pode dizer o que é esperado para este objeto. No caso do código de exemplo, utilizamos 'any' porque desejamos usar o tipo genérico mesmo.

2 - Esse parametro é do tipo HttpHandler, geralmente chamado de 'next', é uma função que encaminhará o pedido porque o interceptor basicamente executará o código antes que a requisição termine e logo antes que resposta seja recebida. Ou seja, a requisição entra nesse fluxo do interceptor e depois esse parametro next permite que a requisição 'continue sua viagem' após interceptada.

Agora esse método 'intercept()', pode executar um código antes que a requisição termine e um pouco antes da resposta. 

Em seguida, é necessário retornar o resultado da requisição para que ela não fique infinitamente interceptada rsss, e isso pode ser feito com o parâmetro 'next', que tem um método muito importante que permite deixar a requisição continuar e retornar algo quando interceptada. Esse método é o 'handle()' e ele deve receber em seu parâmetro o objeto da requisição, o qual é o primeiro parâmetro do método 'intercept()', veja um exemplo abaixo:

```javascript
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './Loader.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(
    private loadingService: LoaderService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.totalRequests++;
    this.loadingService.setLoading(true);
  
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
```

Bom, o que ta acontecendo ai é o seguinte: 

1 - Quando uma requisição é feita nessa aplicação ela é interceptada por este interceptor.

2 - Antes que a requisição termine e um pouco antes de sua resposta, a propriedade 'this.totalRequests' é incrementada.

3 - Através do serviço de loading, setamos a propriedade 'loading' como 'true', o que faz com que este componente seja renderizado na tela, veja:

```javascript
<div *ngIf="this.loader.getLoading()" class="cssload-container">
    <div class="cssload-speeding-wheel">
    </div>
</div>
```

4 - Dentro do interceptor também pode interagir com o retorno da requisição, o que foi feito nessa aplicação, foi utilizar um pipe e o operador 'finalize()' que conforme a documentação de [RXJS](https://www.learnrxjs.io/learn-rxjs/operators/utility/finalize) sugere: 'Execute a função de retorno de chamada quando o observável for concluído', ou seja, após o observável da requisição ser concluído, retorna alguma coisa.

5 - Então, descrementamos a propriedade 'this.totalRequests' e quando ela está vazia, sabemos que a reuisição foi concluída.

6 - E finalmente setamos a propriedade que é condição para renderizar o componente de loading para 'false'.

Depois disso é necessário fornecer esse serviço para aplicação, e isso, deve ser feito de um jeito digamos que 'especial'. Ele deve ser declarado em 'array providers' de AppModule, mas com uma sintaxe um pouco diferente:

```javascript
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
```
Assim, o Angular entende que qualquer classe utilizada com esse identificador 'HTTP_INTERCEPTORS' deve ser tratada como um interceptador, portanto, deve executar o método intercept sempre que houver uma requisição.

A segunda chave desse objeto é 'useClass', aqui é necessário dizer ao Angular qual classe que ele deve utilizar como um interceptador.

Também é possível inserir uma terceira chave, a 'multi'. Essa chave serve para que nos casos em que houver mais de um interceptor na aplicação, o Angular não substitua nenhum por esse declarado.

## Observações sobre Interceptors

Também é possível interagir com o objeto da requisição, não somente com o retorno assim como foi feito no código de exemplo.

E também é possível ter múltiplos interceptors em uma aplicação Angular, mas a ordem na qual você fornece os interceptors na aplicação é muito importante, porque essa será a ordem na qual eles serão executados, mas a sintaxe de injeção é a mesma.

## Conclusão
Essa documentação está sujeita a atualizações, caso tenha dúvidas ou quiser interagir pode enviar um pull request ai ou me chamar no linkedin [Cibele Martins](www.linkedin.com/in/cibelemartinssss), bons estudos!!