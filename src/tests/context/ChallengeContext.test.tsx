import { render, screen } from "@testing-library/react";
import React, { useContext } from "react";
import { fireEvent } from "@testing-library/dom";

import {
  ChallengeContext,
  ChallengeProvider,
} from "../../contexts/ChallengeContext";

jest.mock("js-cookie");

global.Audio = jest.fn().mockReturnValue({
  pause: jest.fn(),
  play: jest.fn(),
});

describe("ChallengContext", () => {
  it("If levelUp function have been called", async () => {
    function FakeComponent() {
      const { levelUp } = useContext(ChallengeContext);

      return (
        <div>
          <button onClick={() => levelUp()}>testButton</button>
        </div>
      );
    }

    render(
      <ChallengeProvider
        level={1}
        challengesCompleted={0}
        currentExperience={3}
      >
        <FakeComponent />
      </ChallengeProvider>
    );

    fireEvent.click(screen.getByText("testButton"));

    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Você alcançou um novo level./i)
    ).toBeInTheDocument();
  });

  it("If closeLevelModal have been called", async () => {
    function FakeComponent() {
      const { level, levelUp } = useContext(ChallengeContext);
      return (
        <div>
          <button onClick={() => levelUp()}>testButton</button>
        </div>
      );
    }

    render(
      <ChallengeProvider
        level={1}
        challengesCompleted={0}
        currentExperience={3}
      >
        <FakeComponent />
      </ChallengeProvider>
    );

    fireEvent.click(screen.getByText("testButton"));
    expect(
      screen.getByText(/Você alcançou um novo level./i)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("closeModal"));
    expect(screen.getByText(/testButton/i)).toBeInTheDocument();
  });

  it("If levelUp function have been called", async () => {
    const mNotification = jest.fn();

    Object.defineProperty(global, "Notification", {
      value: mNotification,
    });

    const staticMembers = {
      requestPermission: jest.fn().mockImplementation(() => {
        return "denied";
      }),
      permission: "denied",
    };

    Object.assign(global.Notification, staticMembers);

    let ObjectMock;

    function FakeComponent() {
      const { startNewChallenge, activeChallenge } =
        useContext(ChallengeContext);

      ObjectMock = activeChallenge;

      return (
        <div>
          <button onClick={() => startNewChallenge()}>testButton</button>
        </div>
      );
    }

    render(
      <ChallengeProvider
        level={1}
        challengesCompleted={0}
        currentExperience={3}
      >
        <FakeComponent />
      </ChallengeProvider>
    );

    fireEvent.click(screen.getByText("testButton"));

    expect(ObjectMock).not.toEqual(null);
  });

  it("If resetChallenge function have been called", async () => {
    const mNotification = jest.fn();

    Object.defineProperty(global, "Notification", {
      value: mNotification,
    });

    const staticMembers = {
      requestPermission: jest.fn().mockImplementation(() => {
        return "denied";
      }),
      permission: "denied",
    };

    Object.assign(global.Notification, staticMembers);

    let ObjectMock;

    function FakeComponent() {
      const { startNewChallenge, activeChallenge, resetChallenge } =
        useContext(ChallengeContext);

      ObjectMock = activeChallenge;

      return (
        <div>
          <button onClick={() => startNewChallenge()}>testButton</button>

          <button onClick={() => resetChallenge()}>testButtonReset</button>
        </div>
      );
    }

    render(
      <ChallengeProvider
        level={1}
        challengesCompleted={0}
        currentExperience={3}
      >
        <FakeComponent />
      </ChallengeProvider>
    );

    fireEvent.click(screen.getByText("testButton"));
    expect(ObjectMock).not.toEqual(null);

    fireEvent.click(screen.getByText("testButtonReset"));
    expect(ObjectMock).toEqual(null);
  });

  it("If completeChallenge function have been called", async () => {
    const mNotification = jest.fn();

    Object.defineProperty(global, "Notification", {
      value: mNotification,
    });

    const staticMembers = {
      requestPermission: jest.fn().mockImplementation(() => {
        return "denied";
      }),
      permission: "denied",
    };

    Object.assign(global.Notification, staticMembers);

    let ObjectMock;

    function FakeComponent() {
      const { challengesCompleted, completeChallenge, startNewChallenge } =
        useContext(ChallengeContext);

      ObjectMock = challengesCompleted;

      return (
        <div>
          <button onClick={() => startNewChallenge()}>testButton</button>

          <button onClick={() => completeChallenge()}>
            testButtonComplete
          </button>
        </div>
      );
    }

    render(
      <ChallengeProvider
        level={1}
        challengesCompleted={0}
        currentExperience={3}
      >
        <FakeComponent />
      </ChallengeProvider>
    );

    fireEvent.click(screen.getByText("testButton"));
    expect(ObjectMock).toEqual(0);

    fireEvent.click(screen.getByText("testButtonComplete"));
    expect(ObjectMock).toEqual(1);
  });

  it("If completeChallenge function have been called with don't have a challenge", async () => {
    const mNotification = jest.fn();

    Object.defineProperty(global, "Notification", {
      value: mNotification,
    });

    const staticMembers = {
      requestPermission: jest.fn().mockImplementation(() => {
        return "denied";
      }),
      permission: "denied",
    };

    Object.assign(global.Notification, staticMembers);

    let ObjectMock;

    function FakeComponent() {
      const { challengesCompleted, completeChallenge } =
        useContext(ChallengeContext);

      ObjectMock = challengesCompleted;

      return (
        <div>
          <button onClick={() => completeChallenge()}>
            testButtonComplete
          </button>
        </div>
      );
    }

    render(
      <ChallengeProvider
        level={1}
        challengesCompleted={0}
        currentExperience={3}
      >
        <FakeComponent />
      </ChallengeProvider>
    );

    fireEvent.click(screen.getByText("testButtonComplete"));
    expect(ObjectMock).toEqual(0);
  });
});
