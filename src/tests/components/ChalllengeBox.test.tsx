import { render, screen } from "@testing-library/react";
import { ChallengeBox } from "../../components/ChallengeBox";
import React from "react";
import { ChallengeContext } from "../../contexts/ChallengeContext";
import { CountdownContext } from "../../contexts/CountdownContext";
import { fireEvent } from "@testing-library/dom";

const challenge = {
  type: "body",
  description:
    "Estique seu braço contra o peito e puxe-o utilizando o outro braço por 10 segundos por braço.",
  amount: 60,
};

describe("ChallengeBox", () => {
  it("If don't have a challenge, informations has screen correctly ", () => {
    render(
      <CountdownContext.Provider
        value={
          {
            stopCountdown: jest.fn(),
          } as any
        }
      >
        <ChallengeContext.Provider
          value={
            {
              activeChallenge: undefined,
              resetChallenge: jest.fn(),
              completeChallenge: jest.fn(),
            } as any
          }
        >
          <ChallengeBox />
        </ChallengeContext.Provider>
      </CountdownContext.Provider>
    );
    expect(
      screen.getByText(
        /Inicie um ciclo para receber desafios a serem completados/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Avance de level completando desafios./i)
    ).toBeInTheDocument();
  });

  it("If have a challenge, informations has screen correctly", () => {
    render(
      <CountdownContext.Provider
        value={
          {
            stopCountdown: jest.fn(),
          } as any
        }
      >
        <ChallengeContext.Provider
          value={
            {
              activeChallenge: challenge,
              resetChallenge: jest.fn(),
              completeChallenge: jest.fn(),
            } as any
          }
        >
          <ChallengeBox />
        </ChallengeContext.Provider>
      </CountdownContext.Provider>
    );
    expect(screen.getByText(challenge.description)).toBeInTheDocument();
    expect(screen.getByText(/Completei/i)).toBeInTheDocument();
    expect(screen.getByText(/Falhei/i)).toBeInTheDocument();
    expect(screen.getByText(/Novo desafio/i)).toBeInTheDocument();
    expect(screen.getByText(/60/i)).toBeInTheDocument();
  });

  it("If challenge completed, handleChallengeSucceeded has been called?", () => {
    const completeChallengeMocked = jest.fn();
    const stopCountdownMocked = jest.fn();

    render(
      <CountdownContext.Provider
        value={
          {
            stopCountdown: stopCountdownMocked,
          } as any
        }
      >
        <ChallengeContext.Provider
          value={
            {
              activeChallenge: challenge,
              resetChallenge: jest.fn(),
              completeChallenge: completeChallengeMocked,
            } as any
          }
        >
          <ChallengeBox />
        </ChallengeContext.Provider>
      </CountdownContext.Provider>
    );

    fireEvent.click(screen.getByText(/Completei/i));

    expect(completeChallengeMocked).toHaveBeenCalled();
    expect(stopCountdownMocked).toHaveBeenCalled();
  });

  it("If challenge not completed, handleChallengeFailed has been called?", () => {
    const resetChallengeMocked = jest.fn();
    const stopCountdownMocked = jest.fn();

    render(
      <CountdownContext.Provider
        value={
          {
            stopCountdown: stopCountdownMocked,
          } as any
        }
      >
        <ChallengeContext.Provider
          value={
            {
              activeChallenge: challenge,
              resetChallenge: resetChallengeMocked,
              completeChallenge: jest.fn(),
            } as any
          }
        >
          <ChallengeBox />
        </ChallengeContext.Provider>
      </CountdownContext.Provider>
    );

    fireEvent.click(screen.getByText(/Falhei/i));

    expect(resetChallengeMocked).toHaveBeenCalled();
    expect(stopCountdownMocked).toHaveBeenCalled();
  });
});
