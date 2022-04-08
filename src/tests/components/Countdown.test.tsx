import { render, screen } from "@testing-library/react";
import Countdown from "../../components/Countdown";
import React from "react";
import { fireEvent, getByText } from "@testing-library/dom";

import { ChallengeContext } from "../../contexts/ChallengeContext";
import { CountdownContext } from "../../contexts/CountdownContext";

describe("Countdown", () => {
  it("If countdown isn't active, informations has displayed correctly ", () => {
    render(
      <CountdownContext.Provider
        value={
          {
            hasFinished: false,
            isActive: false,
            minutes: 0,
            seconds: 0,
            startCountdown: jest.fn(),
            stopCountdown: jest.fn(),
          } as any
        }
      >
        <Countdown />
      </CountdownContext.Provider>
    );

    expect(screen.getByText(/Iniciar um ciclo/i)).toBeInTheDocument();
  });

  it("If 'Iniciar um ciclo' has called", () => {
    const startCountdownmocked = jest.fn();
    render(
      <CountdownContext.Provider
        value={
          {
            hasFinished: false,
            isActive: false,
            minutes: 0,
            seconds: 0,
            startCountdown: startCountdownmocked,
            stopCountdown: jest.fn(),
          } as any
        }
      >
        <Countdown />
      </CountdownContext.Provider>
    );

    fireEvent.click(screen.getByText("Iniciar um ciclo"));
    expect(startCountdownmocked).toBeCalled();
  });

  it("If countdown is active, informations has displayed correctly ", () => {
    render(
      <CountdownContext.Provider
        value={
          {
            hasFinished: false,
            isActive: true,
            minutes: 12,
            seconds: 34,
            startCountdown: jest.fn(),
            stopCountdown: jest.fn(),
          } as any
        }
      >
        <Countdown />
      </CountdownContext.Provider>
    );
    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
    expect(screen.getByText(/4/i)).toBeInTheDocument();
    expect(screen.getByText(/Abandonar ciclo/i)).toBeInTheDocument();
  });

  it("If 'Abandonar ciclo' has called", () => {
    const stopCountdownmocked = jest.fn();
    render(
      <CountdownContext.Provider
        value={
          {
            hasFinished: false,
            isActive: true,
            minutes: 12,
            seconds: 34,
            startCountdown: jest.fn(),
            stopCountdown: stopCountdownmocked,
          } as any
        }
      >
        <Countdown />
      </CountdownContext.Provider>
    );

    fireEvent.click(screen.getByText("Abandonar ciclo"));
    expect(stopCountdownmocked).toBeCalled();
  });

  it("If countdown has finished, informations has displayed correctly ", () => {
    render(
      <CountdownContext.Provider
        value={
          {
            hasFinished: true,
            isActive: false,
            minutes: 0,
            seconds: 0,
            startCountdown: jest.fn(),
            stopCountdown: jest.fn(),
          } as any
        }
      >
        <Countdown />
      </CountdownContext.Provider>
    );

    expect(screen.getByText(/Ciclo terminou/i)).toBeInTheDocument();
  });
});
