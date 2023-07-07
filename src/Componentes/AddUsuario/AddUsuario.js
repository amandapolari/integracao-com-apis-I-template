import React, { useState } from 'react';

function AddUsuario(props) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

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
            <button>Enviar</button>
        </>
    );
}

export default AddUsuario;
