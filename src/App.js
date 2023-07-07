import React, { useState } from 'react';
import AddUsuario from './Componentes/AddUsuario/AddUsuario';
import Usuario from './Componentes/Usuario/Usuario';

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
    const [usuarios, setUsuarios] = useState(usuariosLocal);
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
            <AddUsuario />
            <hr />
            {usuarios.map((usuario) => {
                return <Usuario key={usuario.id} usuario={usuario} />;
            })}
        </>
    );
}

export default App;
