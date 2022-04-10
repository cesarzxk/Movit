import { render } from "@testing-library/react";
import React from "react";
import { screen } from "@testing-library/dom";

import { GlobalContext } from "../../contexts/GlobalContext";
import Main, { getServerSideProps } from "../../pages/main";

describe("Main", () => {
  it("If main page have been displayed correctly.", () => {
    render(
      <GlobalContext.Provider
        value={
          {
            changelight: jest.fn(),
          } as any
        }
      >
        <Main
          level={1}
          challengesCompleted={2}
          darkMod="false"
          currentExperience={3}
        />
      </GlobalContext.Provider>
    );

    expect(screen.getByText(/3/i)).toBeInTheDocument();
    expect(screen.getByText(/64/i)).toBeInTheDocument();

    expect(screen.getByText(/Level 1/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/Desafios Completos/i)).toBeInTheDocument();
    expect(screen.getAllByText(/2/i).length).toEqual(2);
    expect(screen.getByText(/5/i)).toBeInTheDocument();
    expect(screen.getByText(/Iniciar um ciclo/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Inicie um ciclo para receber desafios a serem completados/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Avance de level completando desafios./i)
    ).toBeInTheDocument();
  });

  it("If main loaded with darkMod disabled.", () => {
    let lightPush = true;

    render(
      <GlobalContext.Provider
        value={
          {
            changelight: (light) => (lightPush = light),
          } as any
        }
      >
        <Main
          level={1}
          challengesCompleted={2}
          darkMod="false"
          currentExperience={3}
        />
      </GlobalContext.Provider>
    );
    expect(lightPush).toEqual(false);
  });

  it("If main loaded with darkMod enabled.", () => {
    let lightPush = false;

    render(
      <GlobalContext.Provider
        value={
          {
            changelight: (light) => (lightPush = light),
          } as any
        }
      >
        <Main
          level={1}
          challengesCompleted={2}
          darkMod="true"
          currentExperience={3}
        />
      </GlobalContext.Provider>
    );
    expect(lightPush).toEqual(true);
  });

  it("If getServerSideProps have been called.", async () => {
    const req = {
      cookies: {
        level: 1,
        currentExperience: 0,
        challengesCompleted: 0,
        darkMod: "teste",
      },
    };

    const ServerSideProps = await getServerSideProps({
      req: req,
    } as any);

    expect(ServerSideProps).toEqual({
      props: {
        challengesCompleted: 0,
        currentExperience: 0,
        darkMod: "teste",
        level: 1,
      },
    });
  });
});
