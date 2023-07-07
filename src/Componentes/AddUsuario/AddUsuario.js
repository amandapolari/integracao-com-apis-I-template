import axios from 'axios';
import React, { useState } from 'react';

function AddUsuario(props) {
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
                // console.log('Sucesso na criação do usuário', resp);
                props.allUsersApi();
                setNome('');
                setEmail('');
            })
            .catch((err) => {
                // console.log('Erro na criação do usuário', err.message);
            });
    };

    return (
        <>
            <h3>Adicionar novo usuario</h3>
            <input
                placeholder={'nome'}
                value={nome}
                onChange={(e) => {
                    setNome(e.target.value);
                }}
            />
            <input
                type="email"
                placeholder={'email'}
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    addUser();
                }}
            >
                Enviar
            </button>
        </>
    );
}

export default AddUsuario;
