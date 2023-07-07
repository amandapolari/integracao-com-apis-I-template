# Integração de APIs I - Template

## Índice

-   [1. Configurações iniciais](#1-configurações-iniciais)
-   [2. Prática 1](#2-prática-1-mudar-a-origem-dos-dados)
-   [3. Prática 2](#3-prática-2-receber-novos-dados)

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

-   Esse endpoint requer `headers` e `Path Param`

-   Para o `headers` iremos usar a mesma estrutura da prática 1

-   Para o `Path Param` as coisas vão mudar um pouquinho

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

