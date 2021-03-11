import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { GlobalContext } from '../contexts/GlobalContext';
import styles from '../styles/components/Profile.module.css';

export default function Profile(){
    const{level} =useContext(ChallengeContext);
    const{nameProfiler} =useContext(GlobalContext);
    return(
        <div className={styles.profileContainer}>
            <img src={`https://github.com/${nameProfiler}.png`} alt="Imagem Perfil"/>
            <div>
                <strong>{nameProfiler}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}</p>
            </div>
        </div>
    );
}