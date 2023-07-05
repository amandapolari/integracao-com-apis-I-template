import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const User = styled.div`
    border: black 1px solid;
    margin-top: 8px;
    width: 350px;
    padding: 8px;
`;
function Usuario(props) {
    // verificando o que vem em usuaio
    // console.log(props.usuario);

    const [usuario, setUsuario] = useState(props.usuario);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        getUserById(props.usuario.id);
    }, [props.usuario]);

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
            .then((response) => {
                // console.log('Caso de sucesso: ', response);
                console.log('caso de sucesso', response.data);
                setUsuario(response.data);
                // console.log('Caso de sucesso: ', response.data);
                // passando as infos recebidas pela api para o estado 'usuarios'
                // setUsuarios(response.data);
            })
            .catch((err) => {
                // todo erro:
                console.log('Caso de erro: ', err);
                // mensagem de erro para o usuário:
                // console.log('Caso de erro: ', err.message);
                // mensagem de erro que o back escreveu para o front:
                // console.log('Caso de erro: ', err.response.data);
            });
    };

    return (
        <User>
            {editar ? (
                <div>
                    <p>Nome: {usuario.name}</p>
                    <p>E-mail: {usuario.email}</p>
                    <input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button>Enviar alterações</button>
                </div>
            ) : (
                <>
                    <p>
                        <strong>Nome:</strong> {usuario.name}
                    </p>
                    <p>
                        <strong>E-mail:</strong> {usuario.email}
                    </p>
                </>
            )}
            <button onClick={() => setEditar(!editar)}>Editar</button>
            <button>Excluir</button>
        </User>
    );
}

export default Usuario;
