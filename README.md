
# Teste de Frontend - Prosperità

O intuito deste teste é testar as habilidades do candidato e a capacidade de identificar e resolve problemas do cotidiano.


## Rodando localmente

Clone o projeto

```bash
  git clone <url>
```

Entre no diretório do projeto

```bash
  cd <projeto>
```

Instale as dependências

```bash
  yarn
```

Inicie o servidor

```bash
  yarn start
```


## Funcionalidades
O candidato deve manter e atualizar as funcionalidades do sistema, aplicando as melhores técnicas e resolvendo os respectivos problemas


- Login
- Cadastro
- Adição de TODO
- Listagem de TODO
- Atualização de TODO
- Remoção de TODO


## Melhorias

Há pontos de melhoria no código que devem ser detectadas e corrigidas de acordo com sua experiência, fique livre para trabalhar nelas do seu jeito.

Algumas melhorias serão solicitadas no código, outras deverão ser detectadas, tanto em layout quanto em código.


## Documentação da API
Link da API

https://634eb5f1f34e1ed8269421dd.mockapi.io/api/v1/

#### Retorna todos os usuários

```http
  GET /users
```

#### Cria um usuário

```http
  POST /users
```

#### Retorna todos os TODO's de um usuário

```http
  GET /users/${user_id}/todo
```

#### Cria um novo TODO

```http
  POST /users/${user_id}/todo
```

#### Deleta um TODO

```http
  DELETE /users/${user_id}/todo/${todo_id}
```

#### Atualiza um TODO

```http
  PUT /users/${user_id}/todo/${todo_id}
```

#### Objeto do usuário
| Parâmetro   | Tipo       | 
| :---------- | :--------- |
| `id`      | `string` | 
| `username`      | `string` | 
| `email`      | `string` | 
| `birthdate`      | `string` | 
| `gender`      | `string` | 

#### Objeto do TODO
| Parâmetro   | Tipo       | 
| :---------- | :--------- |
| `id`      | `string` | 
| `userId`      | `string` | 
| `title`      | `string` | 
| `deadline`      | `string` | 
| `completed`      | `boolean` | 

## Documentações úteis

- [ReactJS](https://reactjs.org/docs/getting-started.html) - Biblioteca Frontend
- [Mock Api](https://mockapi.io/docs) - API
- [Reactstrap](https://reactstrap.github.io/) - Frontend toolkit
- [Sweetalert2](https://sweetalert2.github.io/) - Biblioteca de Alertas
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction) - Biblioteca de Toastify
- [Axios](https://axios-http.com/docs/intro) - Biblioteca de Requisições HTTP
- [Formik](https://formik.org/) - Biblioteca para Formulários
- [Yup](https://github.com/jquense/yup) - Biblioteca de Validação


## Como irá funcionar?

- Você terá no máximo 4 horas para concluir o teste
- Não é necessário fazer todas as tarefas, faça as que você conseguir
- Será levado em conta, o tempo de execução e qualidade de código
- Ao finalizar, suba o código em seu github em um repositório publico
- Envie o link para **jhon.santana@prosperitainova.com.br** com o titulo **Teste - Frontend**
- Aguarde o retorno via e-mail
  
## Feedback

Se você tiver algum feedback, por favor nos deixe saber por meio de jhon.santana@prosperitainova.com.br

## Autores

- [@jhonnatthan](https://github.com/jhonnatthan)

