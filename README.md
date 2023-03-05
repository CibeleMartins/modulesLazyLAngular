# Módulos, Lazy Loading e Interceptors em Angular!

## O que são Módulos?
Os módulos são uma forma de agrupar componentes, diretivas, serviços, pipes/blocos de construção de uma aplicação de acordo com a área da aplicação na qual serão utilizados e também, uma forma de organizar e deixar cada parte de código mais fácil de fazer manutenção ou de ser encontrada. 

É necessário agrupar tudo isso em um módulo para que o Angular fique ciente sobre as partes que 'montam' a aplicação. Isso, porque o Angular não escaneia automaticamente todos os arquivos da aplicação, e nem todo o código escrito, ele precisa saber quais são os blocos de construção e ele consegue saber disso através dos módulos.

Todo aplicativo Angular tem pelo menos um módulo, o app.module.ts. Uma aplicação angular não pode existir/funcionar sem pelo menos este módulo. O Angular analisa este módulo para entender a aplicação e suas características.

Além disso, não é possível utilizar algum recurso ou bloco de construção sem inclui-lo em um módulo da aplicação. A forma como são incluídos depende de qual característica da aplicação que este bloco de construção representa, se é um componente, um serviço, um outro módulo e assim por diante.

## Quando e como podem ser utilizados?

Dividir a aplicação em módulos é um pré-requisito para que posteriormente, seja possível utilizar alguns recursos de otimização. Mas antes disso, os módulos tornam uma aplicação mais organizada e fácil de encontrar ou fazer manutenção em algum componente/funcionalidade.

Para que fique uma organização mais enxuta e que seja possível utilizar recursos de otimização, também é muito comum a criação de um módulo para rotemaento, onde será definida a configuração de rotas de um módulo X, mas vamos ver isso mais adiante.




## Observações


## O que é Lazy Loading?


## Quando e como pode ser utilizado?


## Observações


## O que são interceptors?


## Quando e como podem ser utilizados?


## Observações