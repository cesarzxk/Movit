import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { IoMoon, IoSunny } from "react-icons/io5";
import styles from "../styles/components/ChangeColor.module.css";

export function Changecolor() {
  const { changelight, lightState } = useContext(GlobalContext);
  return (
    <div className={styles.container}>
      <span
        data-testid="LightModeButtom"
        onClick={() => {
          changelight(!lightState);
        }}
      >
        {lightState ? (
          <IoSunny data-testid="SunnyIcon" className={styles.icon} />
        ) : (
          <IoMoon data-testid="MoonIcon" className={styles.icon} />
        )}
      </span>
    </div>
  );
}
