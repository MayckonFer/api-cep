import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './styles.module.scss';

export default function Form() {
    const [result, setResult] = useState([])
    const [erro, setErro] = useState(false);
    const [cep, setCep] = useState('');
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [complement, setComplement] = useState('')

    useEffect(() => {
        if (cep.length === 8) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then(res => {
                    if (res.data.erro === true) {
                        setErro(true)
                    } else {
                        setErro(false)
                    }

                    setState(res.data.uf)
                    setCity(res.data.localidade)
                    setDistrict(res.data.bairro)
                    setStreet(res.data.logradouro)
                })
        }
    }, [cep])

    function handleCep(event) {
        event.preventDefault()
        if (!cep || !state || !city || !district || !street || !number || !complement) return

        const newAddress = {
            id: Math.random(),
            cep,
            state,
            city,
            district,
            street,
            number,
            complement
        }

        setResult(oldState => [...oldState, newAddress])

        setCep('')
        setState('')
        setCity('')
        setDistrict('')
        setStreet('')
        setNumber('')
        setComplement('')
    }

    return (
        <main className={styles.container}>
            <form className={styles.contentCep}>
                <label htmlFor="cep" className={styles.wrapperCep}>
                    CEP:

                    <input
                        className={styles.inputCep}
                        type="text"
                        id="cep"
                        maxLength="8"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        required
                    />

                    {erro === true && (
                        <span className={styles.erroCep}>O CEP e inválido</span>
                    )}
                </label>

                <div className={styles.contentState}>
                    <label htmlFor="state" className={styles.wrapperState}>
                        Estado:

                        <input
                            className={styles.inputState}
                            type="text"
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="city" className={styles.wrapperState}>
                        Cidade:

                        <input
                            className={styles.inputState}
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <label htmlFor="district" className={styles.wrapperDistrict}>
                    Bairro:

                    <input
                        className={styles.inputDistrict}
                        type="text"
                        id="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        required
                    />
                </label>

                <div className={styles.contentState}>
                    <label htmlFor="street" className={styles.wrapperState} >
                        Rua/Avenida:

                        <input
                            className={styles.inputState}
                            type="text"
                            id="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="number" className={styles.wrapperState}>
                        Número:

                        <input
                            className={styles.inputState}
                            type="text"
                            id="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </label>
                </div>

                <label htmlFor="complement" className={styles.wrapperDistrict}>
                    <span>Complemento <small className={styles.optional}>(opcional)</small></span>

                    <input
                        className={styles.inputDistrict}
                        type="text"
                        id="complement"
                        value={complement}
                        onChange={(e) => { setComplement(e.target.value) }}
                    />
                </label>

                <span className={styles.wrapperButton}>
                    <button
                        className={styles.saveButton}
                        type="submit"
                        onClick={handleCep}
                    >Salvar</button>
                </span>
            </form>

            <div className={styles.contentResult}>
                {result.map(result => (
                    <div className={styles.containerResult} key={result.id}>
                        <h1 className={styles.cep}>{result.cep}</h1>
                        <span className={styles.district}>{result.state}, <p>{result.city}</p></span>
                        <span className={styles.district}>{result.district}</span>
                        <span className={styles.street}>{result.street}, <p>{result.number}</p></span>
                        <p className={styles.complement}>{result.complement}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}