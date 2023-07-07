/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const User = styled.div`
    border: black 1px solid;
    margin-top: 8px;
    width: 350px;
    padding: 8px;
`;

function Usuario(props) {
    const [usuario, setUsuario] = useState(props.usuario);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [editar, setEditar] = useState(false);

    useEffect(() => {
        getUserById(props.usuario.id);
    }, []);

    const headers = {
        headers: {
            Authorization: 'amanda-polari-easley',
        },
    };

    const body = {
        name: nome,
        email: email,
    };

    const getUserById = (id) => {
        axios
            .get(
                `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
                headers
            )
            .then((resp) => {
                setUsuario(resp.data);
            })
            .catch((err) => {});
    };

    const editUser = (id) => {
        axios
            .put(
                `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
                body,
                headers
            )
            .then((resp) => {
                // console.log('sucesso na edição', resp);
                props.allUsersApi();
                setEditar(false);
            })
            .catch((err) => {
                // console.log('falha na edição', err);
            });
    };

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
                    <button
                        onClick={() => {
                            editUser(props.usuario.id);
                        }}
                    >
                        Enviar alterações
                    </button>
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
            <button
                onClick={() => {
                    deleteUsers(props.usuario.id);
                }}
            >
                Excluir
            </button>
        </User>
    );
}

export default Usuario;
