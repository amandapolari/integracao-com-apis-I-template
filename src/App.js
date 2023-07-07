import React, { useEffect, useState } from 'react';
import AddUsuario from './Componentes/AddUsuario/AddUsuario';
import Usuario from './Componentes/Usuario/Usuario';
import axios from 'axios';

// const usuariosLocal = [
//     {
//         id: 1,
//         name: 'Muri',
//     },
//     {
//         id: 2,
//         name: 'Paulinha',
//     },
//     {
//         id: 3,
//         name: 'Marcelo',
//     },
//     {
//         id: 4,
//         name: 'Rodrigo',
//     },
// ];

function App() {
    // const [usuarios, setUsuarios] = useState(usuariosLocal);
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
                //resposta em caso de sucesso
                // console.log(response);
                // Em caso de sucesso eu quero que esses dados sejam passados para um estado para que eles possam ser renderizados na tela no map abaixo, e para isso irei setar esse estado com os dados que chegam da API:
                setUsuarios(response.data);
            })
            .catch((error) => {
                //resposta em caso de erro
                // console.log(error.response);
            });
    };

    return (
        <>
            <p>
                Para esta aula usaremos a{' '}
                <a
                    href="https://documenter.getpostman.com/view/7549981/SzfCT5G2#intro"
                    target="_blank"
                    rel="noreferrer"
                >
                    API Labenusers
                </a>
            </p>
            <AddUsuario allUsersApi={allUsersApi} />
            <hr />
            {usuarios.map((usuario) => {
                return (
                    <Usuario
                        key={usuario.id}
                        usuario={usuario}
                        allUsersApi={allUsersApi}
                    />
                );
            })}
        </>
    );
}

export default App;
