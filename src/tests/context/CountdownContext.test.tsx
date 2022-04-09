import { act, render, screen } from "@testing-library/react";
import React, { useContext } from "react";
import { fireEvent } from "@testing-library/dom";

import { mocked } from "jest-mock";

import {
  CountdownContext,
  CountdownProvider,
} from "../../contexts/CountdownContext";
import { ChallengeContext } from "../../contexts/ChallengeContext";

jest.mock("js-cookie");
jest.useFakeTimers();
describe("Profile", () => {
  it("If startCountdown function have been called and time decreased", async () => {
    function FakeComponent() {
      const { startCountdown, stopCountdown, minutes, seconds } =
        useContext(CountdownContext);
      return (
        <div>
          <button onClick={() => startCountdown()}>startCountdownTeste</button>

          <button onClick={() => stopCountdown()}>stopCountdownTeste</button>
          {minutes}
          {seconds}
        </div>
      );
    }
    render(
      <ChallengeContext.Provider
        value={{ startNewChallenge: jest.fn() } as any}
      >
        <CountdownProvider>
          <FakeComponent />
        </CountdownProvider>
      </ChallengeContext.Provider>
    );

    act(() => {
      fireEvent.click(screen.getByText("startCountdownTeste"));
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/24/i)).toBeInTheDocument();
    expect(screen.getByText(/59/i)).toBeInTheDocument();
  });

  it("If startCountdown function have been called and time decreased", async () => {
    function FakeComponent() {
      const { startCountdown, stopCountdown, minutes, seconds } =
        useContext(CountdownContext);
      return (
        <div>
          <button onClick={() => startCountdown()}>startCountdownTeste</button>

          <button onClick={() => stopCountdown()}>stopCountdownTeste</button>
          {minutes}
          {seconds}
        </div>
      );
    }
    render(
      <ChallengeContext.Provider
        value={{ startNewChallenge: jest.fn() } as any}
      >
        <CountdownProvider>
          <FakeComponent />
        </CountdownProvider>
      </ChallengeContext.Provider>
    );

    act(() => {
      fireEvent.click(screen.getByText("startCountdownTeste"));
      jest.advanceTimersByTime(1000);
      fireEvent.click(screen.getByText("stopCountdownTeste"));
    });

    expect(screen.getByText(/25/i)).toBeInTheDocument();
    expect(screen.getByText(/0/i)).toBeInTheDocument();
  });

  it("If timer end", async () => {
    function FakeComponent() {
      const { startCountdown, stopCountdown, minutes, seconds, hasFinished } =
        useContext(CountdownContext);
      return (
        <div>
          <button onClick={() => startCountdown()}>startCountdownTeste</button>

          <button onClick={() => stopCountdown()}>stopCountdownTeste</button>
          {minutes}
          {seconds}
          {String(hasFinished)}
        </div>
      );
    }
    render(
      <ChallengeContext.Provider
        value={{ startNewChallenge: jest.fn() } as any}
      >
        <CountdownProvider>
          <FakeComponent />
        </CountdownProvider>
      </ChallengeContext.Provider>
    );

    fireEvent.click(screen.getByText("startCountdownTeste"));

    act(() => {
      jest.advanceTimersByTime(25 * 61000);
    });

    expect(screen.getByText(/true/i)).toBeInTheDocument();
  });
});
