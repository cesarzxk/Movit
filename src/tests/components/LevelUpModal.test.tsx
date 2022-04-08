import { render, screen } from "@testing-library/react";
import { LevelUpModal } from "../../components/LevelUpModal";
import React from "react";
import { fireEvent } from "@testing-library/dom";

import { ChallengeContext } from "../../contexts/ChallengeContext";

describe("LevelUpModal", () => {
  it("If LevelUpModal informations has displayed correctly ", () => {
    render(
      <ChallengeContext.Provider
        value={
          {
            level: 2,
            closeLevelModal: jest.fn(),
          } as any
        }
      >
        <LevelUpModal />
      </ChallengeContext.Provider>
    );

    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/Parabéns/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Você alcançou um novo level./i)
    ).toBeInTheDocument();
  });

  it("If closeLevelModal have been called correctly ", () => {
    const closeModalMocked = jest.fn();
    render(
      <ChallengeContext.Provider
        value={
          {
            level: 2,
            closeLevelModal: closeModalMocked,
          } as any
        }
      >
        <LevelUpModal />
      </ChallengeContext.Provider>
    );

    fireEvent.click(screen.getByTestId("closeModal"));
    expect(closeModalMocked).toBeCalled();
  });
});
