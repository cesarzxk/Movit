import { useContext } from "react";
import styles from "../styles/components/Countdown.module.css";
import { CountdownContext } from "../contexts/CountdownContext";

export default function Countdown() {
  const {
    hasFinished,
    isActive,
    minutes,
    seconds,
    startCountdown,
    stopCountdown,
  } = useContext(CountdownContext);

  const [minuteL, minuteR] = String(minutes).padStart(2, "0").split("");
  const [secondL, secondR] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countdown}>
        <div>
          <span>{minuteL}</span>
          <span>{minuteR}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondL}</span>
          <span>{secondR}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.start}>
          Ciclo terminou
        </button>
      ) : isActive ? (
        <button
          onClick={stopCountdown}
          type="button"
          className={`${styles.start} ${styles.active}`}
        >
          Abandonar ciclo
        </button>
      ) : (
        <button onClick={startCountdown} type="button" className={styles.start}>
          Iniciar um ciclo
        </button>
      )}
    </div>
  );
}
