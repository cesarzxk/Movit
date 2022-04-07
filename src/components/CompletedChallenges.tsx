import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import style from "../styles/components/CompletedChallenges.module.css";
export default function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengeContext);
  return (
    <div className={style.completedChallenges}>
      <span>Desafios Completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
