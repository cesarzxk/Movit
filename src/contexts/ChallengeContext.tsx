import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import Cookie from "js-cookie";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

type Challenge = {
  type: "body" | "eye";
  description: string;
  amount: number;
};

type ChalllengesContextData = {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelModal: () => void;
};

type ChallengeProviderProps = {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
};

export const ChallengeContext = createContext({} as ChalllengesContextData);

export function ChallengeProvider({
  children,
  ...rest
}: ChallengeProviderProps) {
  const [level, setLevels] = useState(rest.level);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLeveUp, setIsLevelUp] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookie.set("level", String(level));
    Cookie.set("currentExperience", String(currentExperience));
    Cookie.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevels(level + 1);
    setIsLevelUp(true);
  }
  function closeLevelModal() {
    setIsLevelUp(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    setActiveChallenge(challenges[randomChallengeIndex]);

    new Audio("/notification.mp3").play();

    if (Notification.permission == "granted") {
      new Notification("Novo desafio!", {
        body: `Valendo ${challenges[randomChallengeIndex].amount} xp`,
        icon: "favicon.png",
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }
  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    if (finalExperience > experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelModal,
      }}
    >
      {isLeveUp && <LevelUpModal />}
      {children}
    </ChallengeContext.Provider>
  );
}
