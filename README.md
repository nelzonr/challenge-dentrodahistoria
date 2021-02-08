
## Descrição

#### Dentro da História - Desafio de tecnologia

API Rest para envio de dados do cliente conforme LGPD desenvolvido com:

- [NodeJS][nodejs]
- [Express][express]
- [Typescript][typescript]
- [NestJS][nestjs]

## Solução
A API Rest baseada em NestJS possui um módulo para as requisições nos diferentes Endpoints onde a lógica da solução pode ser vista no arquivo [lgpd.service.ts](https://github.com/nelzonr/challenge-dentrodahistoria/blob/main/src/lgpd/lgpd.service.ts).

Neste arquivo é possível configurar as futuras versões das API externas, o número de tentativas caso o endpoint **Orders Service** dê timeout e também extrai todos os dados do **Search Service** mesmo com a paginação do endpoint externo.


## Endpoints

|                |Link                          |Parametros                         |
|----------------|-------------------------------|-----------------------------|
|**Solicitação dos dados do usuário**| https://challenge-dentrodahistoria.herokuapp.com/lgpd/123 | id_usuario = 123 |
||||
|***Documentação / Playground***| https://challenge-dentrodahistoria.herokuapp.com/documentacao/ ||

[nodejs]: https://nodejs.org/
[express]: https://expressjs.com/
[typescript]: https://www.typescriptlang.org/
[nestjs]: https://nestjs.com/