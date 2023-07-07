# Integração de APIs I - Template

## Índice

-   [1. Configurações iniciais](#1-configurações-iniciais)
-   [2. Prática 1](#2-prática-1-mudar-a-origem-dos-dados)

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

-   No template, estamos usando dados mockados, vindos de um array que está declarado no próprio arquivo. Modifique o `App.js` para que ele receba o array de usuários da API. Para isso iremos precisar utilizar o endpoint que retorne a lista de todos os usuários cadastrados no banco de dados: `getAllUsers`

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
