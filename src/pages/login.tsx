import {useContext, useEffect, useState } from 'react';
import { ActiveLink } from '../components/Routes';
import { GlobalContext } from '../contexts/GlobalContext';
import styles from '../styles/pages/Login.module.css';

export default function Login(){
    const [signed,setSigned] = useState(true);
    const [usetext, setUseText] = useState('');
    const {setNameProfiler} = useContext(GlobalContext);
    useEffect(()=>{
        console.log(usetext);
        if (usetext != ''){
            setSigned(false);
            setNameProfiler(usetext);
        }else{
            setSigned(true)
        }

    }, [usetext]);


    return(
    <div className={styles.loginContainer}>
        <section>
        <div className={styles.loginImage}>
            <img src="logo.svg" alt="Icon"/>
        </div>
        <div className={styles.camposLogin}>
            <img src="logo-full.svg" alt="Logo"/>
            <strong>Bem-vindo</strong>
            <div className={styles.git}>
                <img src="gitlogo.png" alt="github"/> <p>Faça login com github para começar.</p>
            </div>
            <div className={styles.inputLogin}>
                <input type="text" placeholder={'Digite seu username '} onChange={text => setUseText(text.target.value)}/>
                <ActiveLink href="/main"><button disabled={signed}>{'->'}</button></ActiveLink>
            </div>
        </div>
        </section>
    </div>
    )
}