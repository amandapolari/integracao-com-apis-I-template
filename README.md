# Integração de APIs I - Template

## Índice

-   [1. Configurações iniciais](#1-configurações-iniciais)
-   [2. Prática 1](#2-prática-1-mudar-a-origem-dos-dados)
-   [3. Prática 2](#3-prática-2-receber-novos-dados)
-   [4. Prática 3](#4-prática-3-adicionar-usuário)
-   [5. Fixação 1](#5-fixação-1-modificar-dados)
-   [6. Fixação 2](#6-fixação-2-deletar-dados)

## 1. Configurações iniciais

-   Para essa prática utilizaremos o `axios` e a `API Labeusers`
    -   Para utilizar o `axios`, rode no terminal:
        ```
        npm install axios
        ```
    -   Após a instalação, importe-o no topo da página que irá utilizar o axios:
        ```
        import axios from 'axios';
        ```
    -   API utilizada: [Labenusers](https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro)
    -   Esta API permite:
        -   Receber listas de usuários cadastrados;
        -   Pesquisar usuários específicos;
        -   Criação de usuário;
        -   Edição de usuário;
        -   Remoção de usuário;

## 2. Prática 1: Mudar a origem dos dados:

### Enunciado:

-   No template, estamos usando dados mockados, vindos de um array que está declarado no próprio arquivo. Modifique o `App.js` para que ele receba o array de usuários da API.

### Minha Resolução:

-   Para isso iremos precisar utilizar o endpoint que retorne a lista de todos os usuários cadastrados no banco de dados: `getAllUsers`

-   Esse endpoint apenas `headers`

    -   Segue a sintaxe do uso da API com axios:
        ```
        axios.metodo('https://minha-api.com', {
            headers: {
              "Authorization": 'nome-sobrenome-turma'
          }
        })
        ```
    -   Segue a sintaxe do uso _para esse caso_, no qual altero:
        -   o método para -> **get**
        -   o authorization para -> **amanda-polari-easley**
        ```
        axios.get('https://minha-api.com', {
            headers: {
              "Authorization": 'amanda-polari-easley'
          }
        })
        ```
    -   Após o código anterioo, ao final dos parênteses, irei aplicar dois métodos:
        -   `.then()` -> para sucesso;
        -   `.cath()` -> para erro;
    -   Segue a sintaxe com a aplicação `then` e `cath`:
        ```
        axios
        .get(
            `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users`,
            {
                headers: {
                    Authorization: 'amanda-polari-easley',
                },
            }
        )
        .then((response) => {
            //resposta em caso de sucesso
            console.log(response);
        })
        .catch((error) => {
            //resposta em caso de erro
            console.log(error.response);
        });
        ```
    -   É importante que em caso de sucesso, eu set as informações recebidas onde desejo, ou seja, farei isso dentro do `then`
    -   Para que eu possa atrelar a chamada desses dados à algum momento, irei `acoplar esse código dentro de uma função` para que eu possa chama-la quando necessário.
    -   E para que essa função seja chamada toda vez a página for montada, posso utilizar o `useEffect`.
    -   Segue o código completo com as alterações descritas anteriomente:

        ```
        const [usuarios, setUsuarios] = useState([]);

        useEffect(() => {
            allUsersApi();
        }, []);

        const allUsersApi = () => {
            axios
                .get(
                    `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users`,
                    {
                        headers: {
                            Authorization: 'amanda-polari-easley',
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    setUsuarios(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        };
        ```

    -   Como resultado eu tenho eu tenho todos os nomes salvos no banco de dados sendo renderizados na tela, por conta da estrutura já disponibilizada no template

---

## 3. Prática 2: Receber novos dados:

### Enunciado:

-   Agora que estamos acessando os dados da API, vamos criar uma função que receba um parâmetro e, com isso, retorne o email do usuário. Para isso, veja os endpoins e escola o endpoint que retorne esse dado.

### Minha Resolução:

-   Para este caso vamos utilizar o endpooint `getUserById`, pois segundo a documentação da API: _"Esta requisição permite visualizar as informações de um usuário (name e email)"_

-   Esse endpoint requer `headers` e `path param`

-   Para o `headers` iremos usar a mesma estrutura da prática 1

-   Para o `path param` as coisas vão mudar um pouquinho

-   Essa alteração será feita em `Usuario.js`, mas para isso precisamos entender as props passadas para esse componente ainda no `App.js`:

    -   No `App.js`, o estado usuarios é renderizado através do map, e assim, ele tem acesso ao id da API e passa por props para dentro do componente `Usuario`, segue o retorno do `App.js`:
        ```
        return (
        <>
            // (...)
            {usuarios.map((usuario) => {
                return <Usuario key={usuario.id} usuario={usuario} />;
            })}
        </>
        ```
    -   Sendo assim no componente Usuario eu posso receber por props o `usuario={usuario}`

    -   Entendendo isso, podemos montar nossa função de requisição de email através do endpoint `getUserById`:

    -   O código ficara montado da seguinte forma:

        ```
        function Usuario(props) {
        const [usuario, setUsuario] = useState(props.usuario);

        useEffect(() => {
            getUserById(props.usuario.id);
        }, []);

        const headers = {
            headers: {
                Authorization: 'amanda-polari-easley',
            },
        };

        const getUserById = (id) => {
            axios
                .get(
                    `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
                    headers
                )
                .then((resp) => {
                    console.log('suceso', resp);
                    setUsuario(resp.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        };
        ```

    -   Se tudo der certo, iremos ter acesso ao e-mail e ele será renderizado na tela conforme o código já está montado para receber essa informação

---

## 4. Prática 3: Adicionar usuário

### Enunciado:

-   Neste passo iremos adicionar um novo usuário. Veja na documentação, quais os dados são solicitados para que seja feito o cadastro de um novo usuário. Crie os elementos e estados necessários e uma função para adicionar o novo usuário.

### Minha Resolução:

-   Para isso iremos precisar utilizar o endpoint: `createUser`;

-   Esse endpoint requer `headers` e `body`

-   Para o `headers` iremos usar a mesma estrutura da prática 1

-   Para o `body` as coisas vão mudar um pouquinho: Os dados virão dos inputs controlados `nome` e `email`

-   O código ficará estruturado da seguinte forma:

    ```
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const addUser = () => {
        const headers = {
            headers: {
                Authorization: 'amanda-polari-easley',
            },
        };

        const body = {
            name: nome,
            email: email,
        };

        axios
            .post(
                `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users`,
                body,
                headers
            )
            .then((resp) => {
                console.log('Sucesso na criação do usuário', resp);
                props.allUsersApi();
                setNome('');
                setEmail('');
            })
            .catch((err) => {
                console.log('Erro na criação do usuário', err.message);
            });
    };
    ```

---

## 5. Fixação 1: Modificar dados

### Enunciado:

-   Agora vamos modificar os dados de um usuário. Procure na documentação qual endpoint adequado para este caso e quais dados precisam ser enviados neste endpoint. Crie um input e função necessária para pegar este valor dado pelo usuário. Crie a função que faz esta requisição com o axios

### Minha Resolução:

-   Para isso iremos precisar utilizar o endpoint: `editUser`

-   Esse endpoint requer `headers`, `path variables` e `body`

-   Para todos eles iremos utilizar as estruturas já utilizadas anteriormente

-   A código ficou estruturado da seguinte maneira:

    -   Requisição:

    ```
    const headers = {
        headers: {
            Authorization: 'amanda-polari-easley',
        },
    };

    const body = {
        name: nome,
        email: email,
    };


    const editUser = (id) => {
        axios
            .put(
                `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
                body,
                headers
            )
            .then((resp) => {
                console.log('sucesso na edição', resp);
                props.allUsersApi();
                setEditar(false);
            })
            .catch((err) => {
                console.log('falha na edição', err);
            });
    };
    ```

    -   No `then` é preciso chamar a `allUsersApi` para renderizar na tela novamente os usuários já modificados. E a `setEditar(false)` é usada para fechar a aba de edição

    -   Importante:
        -   No momento de chamar a função `editUser` é preciso passar o argumento `id` para a função, que no caso é `props.usuario.id`, ficando estruturado da seguinte forma no código:
            ```
            <button
                        onClick={() => {
                            editUser(props.usuario.id);
                        }}
                    >
                        Enviar alterações
            </button>
            ```

---

## 6. Fixação 2: Deletar dados

### Enunciado:

-   Veja na documentação como funciona o endpoint para apagar um usuário. Quais dados são necessários? Como esse endpoint recebe eles? Crie uma função que recebe estes dados (e os elementos necessários) e faça a requisição

### Minha Resolução:

-   Para isso iremos precisar utilizar o endpoint: `deleteUser`

-   Esse endpoint requer `headers` e `path param`

-   Para todos eles iremos utilizar as estruturas já utilizadas anteriormente

-   A código ficou estruturado da seguinte maneira:

    -   Requisição:

        ```
        const deleteUsers = (id) => {
        axios
            .delete(
                `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
                headers
            )
            .then((resp) => {
                // console.log('sucesso na deleção', resp);
                props.allUsersApi();
            })
            .catch((err) => {
                // console.log('falha na deleção', err);
            });
        };

        ```

    -   Importante:
        -   No momento de chamar a função `deleteUsers` é preciso passar o argumento `id` para a função, que no caso é `props.usuario.id`, ficando estruturado da seguinte forma no código:
            ```
            <button
                    onClick={() => {
                        deleteUsers(props.usuario.id);
                    }}
                >
                    Excluir
            </button>
            ```
