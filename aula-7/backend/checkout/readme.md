# Ports and Adapters (Hexagonal Architecture)

Nessa aplicação, antes de refatorarmos, temos o exemplo de uma aplicação na qual a **regra de negócio** está totalmente acoplada ao **driver** (HTTP Server, CLI, Fila...), totalmente aplicada ao **acesso aos dados** (banco de dados, fila...).
<br/>
De modo que :
- Qualquer novo driver, teríamos que "repetir" todo o código;
- Dificulta muito o teste, o único jeito seria pela própria interface gráfica ou testes e2e, teste de unidade e integração são praticamente impossíveis;

<br/>

> Allow an application to equally be driven by users, programs, automated test or batch scripts, and to be developed and tested in isolation from its eventual run-time devices and databases. - **Alistair Cokburn**

## Driver, Applicatoin e Driven

### Driver
- Atores primários nos quais consomem alguma regra de negócio, seria uma API, uma fila, uma aplicação WEB, testes...

### Application:
  - As regras de negócios reusáveis, devem estar aqui na application, separado de qualquer **driver** possível como API's, Message Queue ou recurso.

### Driven Actors
- Recursos de banco de dados, servidores SMTP, impressoras, nos quais, a aplicação pode interagir