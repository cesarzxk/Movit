import { useContext, useEffect, useState } from "react";
import { Changecolor } from "../components/ChangeColor";
import { ActiveLink } from "../components/Routes";
import { GlobalContext } from "../contexts/GlobalContext";
import styles from "../styles/pages/Login.module.css";
import { GetServerSideProps } from "next";

type PropsDate = {
  darkMod: string;
};

export default function Login(props: PropsDate) {
  const [signed, setSigned] = useState(true);
  const [usetext, setUseText] = useState("");
  const { setNameProfiler, changelight } = useContext(GlobalContext);

  useEffect(() => {
    if (usetext != "") {
      setSigned(false);
      setNameProfiler(usetext);
    } else {
      setSigned(true);
    }
  }, [usetext]);

  useEffect(() => {
    if (props.darkMod == "true") {
      changelight(true);
    } else {
      changelight(false);
    }
  }, []);

  return (
    <div className={styles.loginContainer}>
      <Changecolor />
      <section>
        <div className={styles.loginImage}>
          <img src="logo.svg" alt="Icon" />
        </div>
        <div className={styles.camposLogin}>
          <img src="logo-full.svg" alt="Logo" />
          <strong>Bem-vindo</strong>
          <div className={styles.git}>
            <img src="gitlogo.png" alt="github" />{" "}
            <p>Faça login com github para começar.</p>
          </div>
          <div className={styles.inputLogin}>
            <input
              type="text"
              data-testid="inputUsername"
              placeholder={"Digite seu username "}
              onChange={(text) => setUseText(text.target.value)}
            />
            <ActiveLink href="/main">
              <button data-testid="mainButtonLogin" disabled={signed}>
                {"->"}
              </button>
            </ActiveLink>
          </div>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { darkMod } = ctx.req.cookies;

  return {
    props: {
      darkMod: darkMod,
    },
  };
};
