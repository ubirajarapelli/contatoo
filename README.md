# Contatoo

Contatoo é um projeto que visa listar e adicionar informacões pessoais e de contato, como:

+ Nome
+ CPF
+ Telefone
+ E-mail

## Tecnologias utilizadas

Projeto desenvolvido marjoritariamente com Javascript ES6, faxendo o uso de classes e seguindo com base o modelo [MVC](https://pt.wikipedia.org/wiki/MVC).

Por se tratar de um projeto pequeno e de uso não profissional, optei por não utilzar ferramentas para Build, sendo necesssário apenas subir um _server_ para rodar a aplicação

As views foram desenvolvidas utilzando apenas javascript, sem uso de marcacão HTML.
A estilização foi realizada apenas com CSS uiliando media queries apenas para telas pequenas (Mobile) e telas grandes (Notebook/ Destop) seguindo o principio de [Mobile First](https://tableless.com.br/mobile-first-a-arte-de-pensar-com-foco/), seguindo principios de [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)

Foi realizado escrita de testes unitários, para a camada de View, onde utilizei [Jest](https://jestjs.io/) e [Testing Library](https://testing-library.com/)

## Instalação

Um passo a passo extremamente simples para fazer a confiruracão e rodar a aplicação.

### Pré requisitos

+ **NodeJS** na versão mínima `12.16.2`

### Clone o repositório

No terminal, ou alguma ferramenta de de interface grafica para versionamento, clone o repositório:

```SH
https://github.com/ubirajarapelli/contatoo.git
```

> _Não se esqueça de acessar o diretório. `cd contatoo`

### Instalando as dependências
Já no diretório do projeto:

No terminal, utilizando o gerenciador de pacote da sua preferência, rode o comando `install`.

exemplo com `npm`

```SH
npm install
```

## Rodando a aplicação
Já no diretório do projeto:

No terminal, utilizando o gerenciador de pacote da sua preferência, rode o comando `start`.

exemplo com `npm`

```SH
npm start
```

Após o comando irá subir um servidor local no endereço: `http://localhost:8080`

> Caso a porta 8080 já estiver em uso, o terminal vai pedir para você efetuar a troca da porta.


## Rodando os testes
Já no diretório do projeto:

No terminal, utilizando o gerenciador de pacote da sua preferência, rode o comando `test`.

exemplo com `npm`

```SH
npm test
```

### Pontos para melhoria

+ Escrever testes unitários para as outras camadas;
+ Escrever testes de integração e testes End to End;
+ Serializar e deserializar os dados antes de enviar/ receber do storage;
+ Melhorar a navegação e rotas;
+ Fazer a edição dos dados dos contatos;
+ Adicionar animções para transições;
+ Adicionar feeedback quando adicionar um novo contato;
+ Adicionar media queries e estilização para telas intermediarias.