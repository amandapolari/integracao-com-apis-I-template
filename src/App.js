import React, { useEffect, useState } from 'react';
import AddUsuario from './Componentes/AddUsuario/AddUsuario';
import Usuario from './Componentes/Usuario/Usuario';
import axios from 'axios';

const usuariosLocal = [
    {
        id: 1,
        name: 'Muri',
    },
    {
        id: 2,
        name: 'Paulinha',
    },
    {
        id: 3,
        name: 'Marcelo',
    },
    {
        id: 4,
        name: 'Rodrigo',
    },
];

function App() {
    // const [usuarios, setUsuarios] = useState(usuariosLocal);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        allUsersApi();
    }, []);

    const allUsersApi = () => {
        axios
            .get(
                'https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users',
                {
                    headers: {
                        Authorization: 'amanda-polari-easley',
                    },
                }
            )
            .then((response) => {
                // console.log('Caso de sucesso: ', response);
                // console.log('Caso de sucesso: ', response.data);
                // passando as infos recebidas pela api para o estado 'usuarios'
                setUsuarios(response.data);
            })
            .catch((err) => {
                // todo erro:
                // console.log('Caso de erro: ', err);
                // mensagem de erro para o usuário:
                // console.log('Caso de erro: ', err.message);
                // mensagem de erro que o back escreveu para o front:
                // console.log('Caso de erro: ', err.response.data);
            });
    };

    // allUsersApi();

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
                return <Usuario key={usuario.id} usuario={usuario} />;
            })}
        </>
    );
}

export default App;
