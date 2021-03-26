import React from 'react';
import Head from'next/head';
import {GetServerSideProps} from 'next';
import {ChallengeProvider} from '../contexts/ChallengeContext';


import { ExperienceBar } from "../components/ExperienceBar";
import {Changecolor} from "../components/ChangeColor";
import Profile from "../components/Profile";
import styles from "../styles/pages/Home.module.css"
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";

type PropsDate = {
      level:number;
      currentExperience:number; 
      challengesCompleted:number;
}

export default function Main(props:PropsDate) {

  return (
    <ChallengeProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio </title>
        </Head>
        <ExperienceBar/>
        <Changecolor/>
        
        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const {level, currentExperience, challengesCompleted} = ctx.req.cookies;
    console.log(currentExperience);

 return{
    props :{
      level: (Number(level) | 1), 
      currentExperience: (Number(currentExperience) || 0), 
      challengesCompleted:(Number(challengesCompleted) || 0)
    }
  };
}