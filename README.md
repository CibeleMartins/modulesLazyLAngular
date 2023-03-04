# Angular/RXJS - Operadores e Subjects
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

<p align="center">
    <img src='./src/assets/logoDoc.png' alt="Logo" width="500">
  <p align="center">
     Sumário
      <p align="center">
        <a href="#sobre-operadores"> Sobre Operadores </a> |
        <a href="#como-utilizar-operadores"> Como utilizar Operadores </a> |
        <a href="#observações-de-operadores"> Observações de Operadores </a> |
        <a href="#sobre-subjects"> Sobre Subjects</a> |
         <a href="#como-utilizar-subjects"> Como utilizar Subjects </a> |
        <a href="#observações-de-subjects"> Observações de Subjects </a> |
        <a href="#conclusão"> Conclusão </a>       
       <br />
        <br />
     <h1 align="center"></h1>
    </p>
</p>

## Sobre Operadores
<p>Os operadores são um recurso da biblioteca rxjs e servem para transformar dados observáveis antes de mostra-los na aplicação/antes de informar ao subscribe(). Isso pode ser feito manualmente dentro das funcões do subscribe(), ou até mesmo dentro de um observável caso o tenha criado, mas a medida que a lógica que envolve os dados observáveis vai ficando mais complexa em uma aplicação, os operadores podem ser uma boa opção.</p>

## Como utilizar Operadores
<p> É possível implementá-los a partir do método -> pipe(); todo observável tem um método deste. O pipe pode ser imaginado como uma tubulação para os dados observados. Você deve importar o operador que irá utilizar na sua tubulação de 'rxjs/operators', veja um exemplo abaixo:</p>

```javascript
import { map }  from "rxjs/operators";
```

<p>No exemplo acima, o operador utilizado é o map. Ele deve ser declarado no parâmetro do pipe() e, em seu parâmetro, assume uma função como argumento, veja o exemplo abaixo:</p>

```javascript
getCurrencyQuote() {
    return this.http.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL').pipe(map((data: any) => <-----{<-------} ))
}
```
<p>Essa função recebida como argumento no operador map(), recebe os dados observados que passaram pela tubulação em seu parâmetro:</p>

```javascript
getCurrencyQuote() {
    return this.http.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL').pipe(map((data: any <-----) =>{}))
}
```
<p>Dentro desta função, podemos transformar os dados observados para que em seguida o método subscribe() possa ser chamado mostrando os dados transformados em algum lugar da aplicação: </p>

```javascript
getCurrencyQuote() {
    return this.http.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL').pipe(map((data: any) => {
        return [this.usd = {
            code: data.USDBRL.code,
            highPrice: this.formatPricesInBRL(data.USDBRL.high) ,
            lowPrice: this.formatPricesInBRL(data.USDBRL.low),
            percentageVariation: parseFloat(parseFloat(data.USDBRL.pctChange).toFixed(2)),
            saleValue: this.formatPricesInBRL(data.USDBRL.ask),
            buyValue:this.formatPricesInBRL(data.USDBRL.bid)  }
            ...]}))
}
```

Neste exemplo de código o operador map() foi utilizado para mapear os dados do observável retornado pelo método get(), conforme demonstrado na documentação [Angular](https://angular.io/guide/http), e para cada dado retornado foram criados três objetos, os quais seguem o padrão da interface CoinPrice, e retornado um array com esses objetos.

### Observações de Operadores

1 - O pipe() pode receber um ou mais operadores em seu parâmetro. Eles são executados um após o outro fazendo diferentes transformações nos dados observados.

2 - Imagine que o operador map() é semelhante a função map() utilizada para percorrer arrays. Para cada um dos dados que passar pelo  pipe() e chegar no parâmetro da função assumida como argumento do operador map(), essa função vai fazer alguma transformação. Em sentido contínuo, também existe o operador filter(), que filtra os dados com base em uma condição.

## Sobre Subjects
<p>Os subjects são parecidos com EventEmitter/emissão de eventos em Angular. Mas só devem ser utilizados para comunicação entre componentes através de serviços. Nos casos em que houver um '@Output()' a melhor opção ainda é EventEmitter. Os Subjects são muito úteis para implementar comunicação entre componentes cruzados e também é uma forma mais recomendada porque são mais eficientes do que as emissões de evento nos bastidores.</p>

## Como utilizar Subjects
Eles devem ser importados do pacote 'rxjs', conforme abaixo:

```javascript
import { Subject } from "rxjs";
```

<p>Após isso, dentro do serviço o qual irá ser definido o Subject, basta criar uma propriedade na qual você possa atribuir uma instancia dele:</p>

```javascript
displayDashboardConverter = new Subject<>()
```

<p>E definir no tipo genérico os dados que serão emitidos por ele:</p>

```javascript
displayDashboardConverter = new Subject<boolean>()
```

<p>Neste exemplo, o Subject foi criado no serviço de moedas -> CoinService, pois irá emitir um dado do tipo booleano, após o clique em um botão, que será uma condição para renderizar o conversor de moedas.</p>

No componente que você deseja emitir um dado, nesse caso, no botão; após injetar a classe do serviço na função construtora do componente conforme essa documentação sobre [Serviços](https://github.com/CibeleMartins/angularServices) sugere, você pode chamar esse Subject, acessar o método next() e passar esse dado para o próximo componente, o qual pode ser qualquer outro componente da aplicação, acima ou abaixo na árvore de componentes:

```html
<button id="show-converter-action" *ngIf="!conversorIsShowing" (click)="showConverter()">
    <span class="material-symbols-outlined"> currency_exchange </span>
</button>
```

```javascript
showConverter() {
    this.coinService.displayDashboardConverter.next(true)
}
```

<p>No exemplo de código acima, ao clicar no -> convert-action.component.html, é acionada uma função em seu arquivo .ts, a qual acessa o Subject instanciado no serviço de moedas e emite um dado booleano para qualquer outro componente da aplicação.</p>

<p>Já no componente que você deseja pegar/acessar esse dado emitido, você deve injetar o serviço no qual foi criado o Subject na construção do componente, e através do Subject acionar o subscribe():</p>

```javascript
constructor(private coinService: CoinService) { }

this.subjectSubscription = this.coinService.displayDashboardConverter.subscribe((data)=> {this.displayConverter = data})
```

<p>Neste exemplo de código, na função inicializadora do -> conversion-dashboard.comoponent.ts, pegamos o valor booleano que o -> convert-action.component.ts passou/emitiu para o próximo componente na aplicação quando clicado, utilizanto o método next() do Subject; foi alterada uma propriedade do -> conversion-dashboard.comoponent.ts a qual é responsável por renderizar este elemento quando seu valor for true, que neste caso, corresponde ao valor emitido por -> convert-action.component.ts   utilizando Subject.</p>

```javascript
constructor(private coinService: CoinService) { }

this.subjectSubscription = this.coinService.displayDashboardConverter.subscribe((data)=> {this.displayConverter '<--- propriedade responsável por renderizar o elemento' = data '<--- valor emitido do convert-action.component.ts utilizando Subject'})
```

## Observações de Subjects
<p>1 - Foram feitas mais comunicações entre os componentes supracitados com a utilização do mesmo Subject, mas a nível de exemplificação, as que foram mostradas acima são suficientes.</p>

<p>2 - Subject é um tipo especial de observável. Nos observáveis também chamamos o método next(), mas de dentro deles quando o criamos ou quando comunicamos essa 'fase' do dado observado ao subscribe(). Já o Subject é mais ativo porque chamamos o next() passando um dado para o próximo componente que assinar/inscrever o dado observado e emitido por ele.</p>

<p>3 - Assim como os observáveis criados  manualmente, é necessário cancelar o método subscribe()/o que ele está retornando, e isso deve ser feito dentro do método ngOnDestroy, que é executado no momento/ciclo de vida da destruição do componente.</p>

Para isso, conforme essa documentação sobre [Observáveis](https://github.com/CibeleMartins/angularObservables) sugere, você deve armazenar a chamada do subscribe() em uma propriedade do tipo Subscription, importada do pacote rxjs:


```javascript
import {Subscription } from 'rxjs';
subjectSubscription!: Subscription;
```

<p>E no ciclo de vida de destruição do componente, dentro de ngOnDestroy(), cancelar o subscribe() a partir desta propriedade chamando unsubscribe():</p>

```javascript
ngOnDestroy() {
    this.subjectSubscription.unsubscribe()
}
```
<p>Isso evita vazamentos de memória ou qualquer coisa do tipo, evitando que qualquer dado observável ou execução de código derivada de observáveis fiquem em execução ao deixar o componente/rota, o que melhora o desempenho da aplicação.</p>

## API's utilizadas
- [AwesomeAPI](https://docs.awesomeapi.com.br/api-de-moedas)
- [Frankfurter](https://www.frankfurter.app/docs/#latest)
- [Binance API](https://www.binance.com/en/binance-api)

## Tecnologias 
- [Chart.js](https://www.chartjs.org/)
- [Rxjs](https://rxjs.dev/)
- [Angular CDK Layout](https://material.angular.io/cdk/layout/overview)

## Conclusão
Sinta-se a vontade para explorar todo seu conhecimento utilizando este projeto, qualquer dúvida ou sugestão me procure no  [Linkedin](www.linkedin.com/in/cibelemartinssss).