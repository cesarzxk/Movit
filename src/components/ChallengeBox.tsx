import { useContext, useState } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext} from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengeContext);
    const {stopCountdown} = useContext(CountdownContext);
    function handleChallengeSucceeded(){
        completeChallenge();
        stopCountdown();

    }
    function handleChallengeFailed(){
        resetChallenge();
        stopCountdown();

    }

    return(
        <div className={styles.challengeBoxContainer}>

            {activeChallenge ? (

            <div className={styles.challengeActive}>
                <header>
                    Ganhe {activeChallenge.amount} xp
                </header>
                <main>
                    <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                    <strong>Novo desafio</strong>
                    <p>{activeChallenge.description}</p>
                </main>
                <footer>
                    <button 
                    type='button' 
                    onClick={handleChallengeFailed}
                    className={styles.challengeFailedButton}
                    >Falhei</button>

                    <button 
                    type='button'
                    onClick={handleChallengeSucceeded}
                    className={styles.challengeSucceededButton}
                    >Completei</button>
                </footer>

            </div>
                
            ):(
                <div className={styles.challengeNotActive}>
                <strong>
                Inicie um ciclo para receber desafios a serem completados
                </strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios.
                </p>
            </div>
            )}

        </div>
    );
}